import { create } from 'zustand';

interface DashboardStoreState {
  activeProjectId: string | null;
  setActiveProjectId: (projectId: string) => void;
}

export const useDashboardStore = create<DashboardStoreState>((set) => ({
  activeProjectId: null,
  setActiveProjectId: (projectId) => set({ activeProjectId: projectId }),
}));
