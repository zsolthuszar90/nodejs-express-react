import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';
import { useFetch } from '../hooks/useFetch';

jest.mock('../hooks/useFetch');

describe('Form Component', () => {
  const sampleData = [{ description: 'Sample Expense', amount: 50, currency: 'USD' }];

  const setSpendingsMock = jest.fn();

  beforeEach(() => {
    useFetch.mockReturnValue({
      data: sampleData,
      status: 'SUCCESS',
      error: null,
      fetchFn: jest.fn(),
      resetErrors: jest.fn(),
    });
  });

  it('should handle form submission', () => {
    render(<Form setSpendings={setSpendingsMock}/>);
    
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(setSpendingsMock).toHaveBeenCalledWith(sampleData);
  });
})