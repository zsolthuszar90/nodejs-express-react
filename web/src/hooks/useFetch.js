import { useState } from "react";
import { FETCH_STATUS, SERVER_ERROR_MSG, VALIDATION_ERROR } from "../utils/constants";
import { validationMsg } from "../utils/validationMsg";

export const useFetch = () => {
  const [status, setStatus] = useState(FETCH_STATUS.IDLE)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  const fetchFn = async (url, options = {}) => {
    try {
      setStatus(FETCH_STATUS.LOADING)

      const response = await fetch(url, {...options})
      const responseData = await response.json()
      if( response.status === 200 ) {
        setData(responseData)
        setStatus(FETCH_STATUS.SUCCESS)
      } else {
        setError(
          responseData?.type === VALIDATION_ERROR ? 
          validationMsg(responseData.details) : [SERVER_ERROR_MSG]
        )
        setStatus(FETCH_STATUS.ERROR)
      }
    } catch(error) {
      setError([SERVER_ERROR_MSG])
      setStatus(FETCH_STATUS.ERROR)
    }
  }

  const resetErrors = () => {
    setError(null)
    setStatus(FETCH_STATUS.IDLE)
  }

  return { data, error, status, fetchFn, resetErrors}
}