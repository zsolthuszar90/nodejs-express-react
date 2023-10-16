export const FETCH_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success'
}

export const VALIDATION_ERROR = 'ValidationError'
export const SERVER_ERROR_MSG = "The server is probably down. Please try again later."
export const VALIDATION_ERROR_MSG = "Description or amount is invalid."

export const BASE_URL = "http://localhost:4000/api/spendings"

export const SORTING = {
  DESC_DATE: '-date',
  ASC_DATE: 'date',
  DESC_AMOUNT: '-amount_in_huf',
  ASC_AMOUNT: 'amount_in_huf'
}

export const FILTER = {
  ALL: 'ALL',
  HUF: 'HUF',
  USD: 'USD'
}