import React, { useEffect } from "react";
import { FiDollarSign } from "react-icons/fi";
import { DateTime } from "luxon";
import Loader from "./Loader";
import {
  ErrorMessage,
  Spending,
  IconWrapper,
  TextWrapper,
  Amount,
  AmountWrapper,
  DeletingWrapper,
} from "../styles/ComponentStyles";
import { useFetch } from "../hooks/useFetch";
import { BASE_URL, FETCH_STATUS, FILTER as CURRENCY} from "../utils/constants";

export default function SpendingList({ organizedSpendings, setSpendings }) {
  const { data, status, error, fetchFn } = useFetch()
  
  const isLoading = status === FETCH_STATUS.LOADING
  const isError = status === FETCH_STATUS.ERROR
  const isSuccess = status === FETCH_STATUS.SUCCESS

  useEffect(() => {
    fetchFn(BASE_URL, { 
      method: 'GET'
    })
  }, [])

  useEffect(() => {
    setSpendings(data)
  }, [data])

  const handleDelete = async (id) => {
    fetchFn(`${BASE_URL}/${id}`, { 
      method: 'DELETE'
    })
  }

  if (isLoading) return <Loader />;

  return (
    <>
      {isError && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}
      
      {!organizedSpendings.length && isSuccess ? (
        <h1 style={{ textAlign: "center", marginTop: "4rem" }}>
          Yay! 🎉 No spendings!
        </h1>
      ) : null}

      {organizedSpendings.length > 0 && isSuccess ?
        organizedSpendings.map((spending) => (
          <Spending key={spending.id}>
            <DeletingWrapper onClick={() => handleDelete(spending.id)}>
              ❌
            </DeletingWrapper>
            <IconWrapper>
              <FiDollarSign color="var(--color-blue)" />
            </IconWrapper>
            <TextWrapper>
              <h3>{spending.description}</h3>
              <p>
                {DateTime.fromISO(spending.spent_at).toFormat(
                  "t - MMMM dd, yyyy"
                )}
              </p>
            </TextWrapper>
            <AmountWrapper>
              <Amount currency={spending.currency}>
                {spending.amount.toFixed(spending.currency === CURRENCY.USD ? 2 : 0)}
              </Amount>
            </AmountWrapper>
          </Spending>
        )) : null}
    </>
  );
}
