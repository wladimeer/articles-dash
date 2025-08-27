import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ThemeStore } from '../interfaces/theme-store.interface'
import { STORAGE_KEY } from '../constants/storage'

const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      darkMode: false,
      toggleTheme: () => set({ darkMode: !get().darkMode }),
      setDarkMode: (value: boolean) => set({ darkMode: value })
    }),
    {
      name: STORAGE_KEY.THEME,
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export { useThemeStore }
