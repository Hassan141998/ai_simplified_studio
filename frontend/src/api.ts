const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export interface Project {
    id: number;
    title: string;
    script_text: string;
    status: string;
    created_at: string;
    assets: Asset[];
}

export interface Asset {
    id: number;
    asset_type: string;
    file_path: string;
    created_at: string;
}

export const api = {
    getProjects: async (): Promise<Project[]> => {
        const response = await fetch(`${API_URL}/projects/`);
        if (!response.ok) throw new Error("Failed to fetch projects");
        return response.json();
    },

    getProject: async (id: number): Promise<Project> => {
        const response = await fetch(`${API_URL}/projects/${id}`);
        if (!response.ok) throw new Error("Failed to fetch project");
        return response.json();
    },

    createProject: async (title: string, script_text: string): Promise<Project> => {
        const response = await fetch(`${API_URL}/projects/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, script_text }),
        });
        if (!response.ok) throw new Error("Failed to create project");
        return response.json();
    },

    updateProject: async (id: number, data: { title?: string, script_text?: string }): Promise<Project> => {
        const response = await fetch(`${API_URL}/projects/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to update project");
        return response.json();
    },

    generateProject: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/projects/${id}/generate`, {
            method: "POST",
        });
        if (!response.ok) throw new Error("Failed to start generation");
    },
    getDownloadUrl: (id: number) => `${API_URL}/projects/${id}/download`
};
