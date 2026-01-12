import { useState, useEffect } from 'react';
import { Plus, Clock, MoreVertical, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { api, type Project } from '../api';

const Dashboard = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await api.getProjects();
            setProjects(data);
        } catch (e) {
            console.error("Failed to load projects", e);
        }
    };

    const handleCreateNew = async () => {
        setIsCreating(true);
        try {
            // Create a default project "Untitled" and redirect
            const newProject = await api.createProject("Untitled Project", "");
            navigate(`/project/${newProject.id}`);
        } catch (e) {
            console.error("Failed to create", e);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div>
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
                        Your Studio
                    </h2>
                    <p className="text-gray-400">Manage and create your AI videos</p>
                </div>

                <button
                    onClick={handleCreateNew}
                    disabled={isCreating}
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-brand-primary/20"
                >
                    <Plus size={20} />
                    {isCreating ? 'Creating...' : 'New Project'}
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Create New Card (Visual) */}
                <motion.div
                    whileHover={{ y: -5 }}
                    onClick={handleCreateNew}
                    className="cursor-pointer border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-gray-400 hover:border-brand-primary/50 hover:bg-white/5 transition-all group min-h-[200px]"
                >
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                        <Plus size={24} className="group-hover:text-brand-primary" />
                    </div>
                    <span className="font-medium">Create New Video</span>
                </motion.div>

                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        className="bg-background-elevated rounded-2xl overflow-hidden border border-white/5 hover:border-brand-primary/30 transition-all shadow-xl"
                    >
                        {/* Thumbnail Placeholder */}
                        <div className="h-40 bg-zinc-900 relative group cursor-pointer" onClick={() => navigate(`/project/${project.id}`)}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="text-white/20 w-12 h-12 group-hover:text-brand-primary group-hover:scale-110 transition-all" />
                            </div>
                            {project.status === 'completed' && (
                                <div className="absolute top-2 right-2 bg-status-success text-black text-xs font-bold px-2 py-1 rounded-md">
                                    READY
                                </div>
                            )}
                        </div>

                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <Link to={`/project/${project.id}`} className="font-semibold text-lg hover:text-brand-primary transition-colors">
                                    {project.title}
                                </Link>
                                <button className="text-gray-500 hover:text-white">
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
                                <Clock size={12} />
                                <span>{new Date(project.created_at).toLocaleDateString()}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-700" />
                                <span className="uppercase">{project.status}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
