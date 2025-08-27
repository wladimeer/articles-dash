import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User, UserStore } from '../interfaces/user.interfaces'
import { STORAGE_KEY } from '../constants/storage'

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isUserValid: () => get().currentUser !== null,
      setUser: (user: User) => set({ currentUser: user }),
      removeUser: () => set({ currentUser: null })
    }),
    {
      name: STORAGE_KEY.USER,
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export { useUserStore }
