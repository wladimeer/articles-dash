import { STATES } from '../constants/response'

interface ApiResponse<T> {
  status: (typeof STATES)[keyof typeof STATES]
  message: string
  data: T
}

export type { ApiResponse }
