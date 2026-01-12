import { ReactNode } from 'react';
import { Home, Video, Settings, Folder } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Dashboard', path: '/' },
        { icon: Folder, label: 'Projects', path: '/' }, // Reuse dashboard for now
        { icon: Video, label: 'Studio', path: '/studio-placeholder' }, // Just visual
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <div className="min-h-screen flex bg-background-primary text-white font-sans">
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-64 border-r border-white/10 p-6 flex flex-col"
            >
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                        <Video className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">AI Simplified</h1>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-brand-primary/10 text-brand-primary"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon size={20} className={clsx(isActive ? "text-brand-primary" : "text-gray-500 group-hover:text-white")} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 rounded-xl bg-background-elevated border border-white/5">
                    <div className="text-sm text-gray-400 mb-2">Usage</div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[40%] bg-brand-secondary rounded-full" />
                    </div>
                    <div className="flex justify-start mt-2 text-xs text-brand-secondary">
                        40% used
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
