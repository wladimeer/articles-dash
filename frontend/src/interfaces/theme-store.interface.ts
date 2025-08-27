interface ThemeStore {
  darkMode: boolean
  toggleTheme: () => void
  setDarkMode: (value: boolean) => void
}

export type { ThemeStore }
