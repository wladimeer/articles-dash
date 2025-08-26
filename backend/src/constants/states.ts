const SUCCESS_STATUS = 1 as const
const ERROR_STATUS = 2 as const
const EXCEPTION_STATUS = 0 as const

const INVALID_STATUS = 0 as const
const VALID_STATUS = 1 as const
const PENDING_STATUS = 2 as const

const STATES = {
  SUCCESS: SUCCESS_STATUS,
  ERROR: ERROR_STATUS,
  EXCEPTION: EXCEPTION_STATUS
} as const

const ARTICLE_STATUS = {
  INVALID: INVALID_STATUS,
  VALID: VALID_STATUS,
  PENDING: PENDING_STATUS
} as const

const statusText: Record<(typeof ARTICLE_STATUS)[keyof typeof ARTICLE_STATUS], string> = {
  [ARTICLE_STATUS.INVALID]: 'Inválido',
  [ARTICLE_STATUS.VALID]: 'Válido',
  [ARTICLE_STATUS.PENDING]: 'Pendiente'
}

export { SUCCESS_STATUS, ERROR_STATUS, EXCEPTION_STATUS, STATES, ARTICLE_STATUS, statusText }
