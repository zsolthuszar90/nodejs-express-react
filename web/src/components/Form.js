import React, { useEffect, useState } from 'react';
import { InputStyles } from '../styles/InputStyles';
import { SelectStyles } from '../styles/SelectStyles';
import { ErrorValidation, FormStyles } from '../styles/ComponentStyles';
import { useFetch } from '../hooks/useFetch';
import { BASE_URL, FETCH_STATUS } from '../utils/constants';

export default function Form({setSpendings}) {
  const { data, status, error, fetchFn, resetErrors } = useFetch()

  const isError = status === FETCH_STATUS.ERROR

  const [newEntry, setNewEntry] = useState({
    description: '',
    amount: 0,
    currency: 'USD',
  });

  useEffect(() => {
    setSpendings(data)
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewEntry({
      ...newEntry,
      [name]: value,
    });

    resetErrors()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetchFn(BASE_URL, { 
      method: 'POST', 
      body: JSON.stringify(newEntry),  
      headers: { 
        "Content-Type": "application/json"
      }
    })

    setNewEntry({
      ...newEntry,
      amount: 0,
      description: ''
    })
  }


  return (
    <>
      <FormStyles>
        <InputStyles
          type='text'
          placeholder='description'
          name='description'
          value={newEntry.description}
          onChange={handleChange}
        />
        <InputStyles
          type='number'
          placeholder='amount'
          name='amount'
          value={newEntry.amount || ''}
          onChange={handleChange}
        />
        <SelectStyles
          name='currency'
          value={newEntry.currency}
          onChange={handleChange}
        >
          <option value='HUF'>HUF</option>
          <option value='USD'>USD</option>
        </SelectStyles>
        <InputStyles type='submit' value='Save' onClick={handleSubmit}/>
      {isError && <div>{error.map(e => <ErrorValidation key={e}>{e}</ErrorValidation>)}</div>}
      </FormStyles>
    </>
  );
}
