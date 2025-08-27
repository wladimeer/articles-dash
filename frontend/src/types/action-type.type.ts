type ActionType =
  | { type: 'SET_VISIBLE'; payload: boolean }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_MESSAGE'; payload: string }
  | { type: 'SET_LOADING'; payload?: boolean }
  | { type: 'SET_RESET' }

export type { ActionType }
