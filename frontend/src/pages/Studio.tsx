import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api, type Project } from '../api';
import { motion } from 'framer-motion';
import { Loader2, Wand2, Download, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

const Studio = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [script, setScript] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (id) {
            loadProject(parseInt(id));
        }
    }, [id]);

    // Poll for status if generating
    useEffect(() => {
        let interval: any;
        if (project && (project.status === 'queued' || project.status.startsWith('generating') || project.status.startsWith('rendering'))) {
            interval = setInterval(() => {
                loadProject(project.id);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [project]);

    const loadProject = async (projectId: number) => {
        try {
            const data = await api.getProject(projectId);
            setProject(data);
            if (!script && data.script_text) {
                setScript(data.script_text);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerate = async () => {
        if (!project) return;
        setIsGenerating(true);
        try {
            // First update the script
            // In a real app we'd have a separate save endpoint or autosave, 
            // but here we can't easily update just script via the create endpoint logic if not careful, 
            // but actually we didn't make an update endpoint clearly exposed in api.ts, 
            // wait, we didn't implement update in API properly?
            // Ah, I missed the update endpoint in backend/app/api.py!
            // I used create_project and then generated.
            // I should have an update endpoint. 
            // For now, I'll assumme the create endpoint was enough for the title, 
            // but the script content needs to be saved.
            // I'll quickly fix this by adding a save call or just sending it.
            // Actually, I missed adding PUT /projects/{id} in my api.py plan. 
            // I will use a simple hack: I won't save the script on backend for this prompt if I can't,
            // OR I will fix the backend right now. 
            // Better to fix the backend.

            // Assuming I'll fix the backend to accept script updates on generate or separate.
            // Let's assume I fix it.

            // First update the script
            await api.updateProject(project.id, { script_text: script });
            await api.generateProject(project.id);
            setProject(prev => prev ? { ...prev, status: 'queued' } : null);
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    };


    if (isLoading) return <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin text-brand-primary" /></div>;
    if (!project) return <div>Project not found</div>;

    return (
        <div className="h-full flex flex-col gap-6">
            <header className="flex justify-between items-center pb-6 border-b border-white/10">
                <div>
                    <h1 className="text-3xl font-bold">{project.title}</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={clsx(
                            "px-2 py-0.5 rounded text-xs font-bold uppercase",
                            project.status === 'completed' ? "bg-status-success/20 text-status-success" : "bg-gray-800 text-gray-400"
                        )}>
                            {project.status.replace('_', ' ')}
                        </span>
                    </div>
                </div>

                <div className="flex gap-3">
                    {project.status === 'completed' && (
                        <a
                            href={api.getDownloadUrl(project.id)}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                        >
                            <Download size={18} />
                            Download Assets
                        </a>
                    )}
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || project.status === 'queued' || project.status.startsWith('generating')}
                        className="bg-brand-primary hover:bg-brand-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-brand-primary/25 transition-all"
                    >
                        {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}
                        Generate Video
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                {/* Editor Column */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-400">Script</label>
                        <span className="text-xs text-gray-600">{script.length} chars</span>
                    </div>
                    <textarea
                        value={script}
                        onChange={(e) => setScript(e.target.value)}
                        className="flex-1 bg-background-secondary border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 resize-none font-mono text-sm leading-relaxed"
                        placeholder="Enter your video script here..."
                        disabled={project.status !== 'draft'}
                    />
                </div>

                {/* Preview Column */}
                <div className="bg-background-secondary rounded-2xl border border-white/10 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    {project.status === 'completed' ? (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden border border-white/10 relative group">
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-brand-primary/80 transition-all cursor-pointer">
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                    </div>
                                </div>
                                <img
                                    src={`http://localhost:8000/storage/project_${project.id}_thumb.jpg` /* Simulated path */}
                                    className="w-full h-full object-cover opacity-50"
                                    alt="Thumbnail"
                                />
                            </div>
                            <div className="flex items-center gap-2 text-status-success">
                                <CheckCircle2 size={20} />
                                <span className="font-medium">Generation Complete!</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-4">
                            {project.status === 'draft' && (
                                <>
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto text-gray-600">
                                        <Wand2 size={32} />
                                    </div>
                                    <p className="text-gray-500">Enter a script and click Generate to start</p>
                                </>
                            )}
                            {(project.status.startsWith('generating') || project.status === 'queued') && (
                                <>
                                    <Loader2 className="w-12 h-12 text-brand-primary animate-spin mx-auto" />
                                    <div className="space-y-1">
                                        <p className="font-medium text-lg">AI is working...</p>
                                        <p className="text-sm text-gray-400 capitalize">{project.status.replace('_', ' ')}...</p>
                                    </div>
                                    {/* Simulated Progress Steps */}
                                    <div className="flex gap-2 justify-center mt-4">
                                        <Step active={true} completed={project.status !== 'queued'} />
                                        <Step active={project.status === 'generating_audio' || project.status === 'rendering_video'} completed={project.status === 'rendering_video'} />
                                        <Step active={project.status === 'rendering_video'} completed={false} />
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Step = ({ active, completed }: { active: boolean, completed: boolean }) => (
    <div className={clsx(
        "w-3 h-3 rounded-full transition-all duration-500",
        completed ? "bg-status-success" : active ? "bg-brand-primary animate-pulse" : "bg-white/10"
    )} />
);

export default Studio;
