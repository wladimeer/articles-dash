import type { StorageKey, StorageValue } from '../types/storage.types'

const STORAGE_KEY: Record<StorageKey, StorageValue> = {
  USER: 'user-storage',
  THEME: 'app-theme'
}

export { STORAGE_KEY }
