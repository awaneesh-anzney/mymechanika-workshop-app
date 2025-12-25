import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UIState {
    sidebarCollapsed: boolean;
    mobileOpen: boolean;
}

interface UIActions {
    setSidebarCollapsed: (collapsed: boolean) => void;
    setMobileOpen: (open: boolean) => void;
    toggleSidebar: () => void;
    toggleMobileMenu: () => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>()(
    persist(
        (set) => ({
            sidebarCollapsed: false,
            mobileOpen: false,
            setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
            setMobileOpen: (open) => set({ mobileOpen: open }),
            toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
            toggleMobileMenu: () => set((state) => ({ mobileOpen: !state.mobileOpen })),
        }),
        {
            name: "mymechanika-ui-storage",
            storage: createJSONStorage(() => localStorage),
            // Only persist sidebarCollapsed, mobileOpen is session-state
            partialize: (state) => ({
                sidebarCollapsed: state.sidebarCollapsed,
            }),
        }
    )
);
