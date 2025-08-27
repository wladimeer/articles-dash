interface User {
  id: string
  username: string
}

interface UserStore {
  currentUser: User | null
  isUserValid: () => boolean
  setUser: (user: User) => void
  removeUser: () => void
}

export type { User, UserStore }
