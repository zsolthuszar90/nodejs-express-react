import { FILTER as CURRENCY } from "./constants"

export const usdToHuf = (value) => {
  if (value.currency === CURRENCY.HUF) {
    return value
  } else {
    return {...value, currency: 'HUF', amount: value.amount * 365}
  }
}