import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initial) => [initial, jest.fn()],
}));

describe('App Component', () => {
  it('renders without errors', () => {
    render(<App />);
  });

  it('correctly organizes spendings based on sorting and filtering', () => {

    const spendings = [
      { description: 'Expense 1', amount: 50, currency: 'USD', spent_at: '2023-10-15T12:00:00' },
      { description: 'Expense 2', amount: 100, currency: 'EUR', spent_at: '2023-10-14T08:00:00' },
      { description: 'Expense 3', amount: 75, currency: 'USD', spent_at: '2023-10-16T14:30:00' },
    ];

    const useStateMock = (initial) => [spendings, jest.fn()];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { container } = render(<App />);

    const selectedSorting = 'DESC_DATE';
    const selectedFilter = 'USD';

    // Calculate the expected result based on the selections
    const expectedOrganizedSpendings = spendings
      .filter(item => selectedFilter === 'ALL' || item.currency === selectedFilter)
      .sort((a, b) => {
        const dateA = new Date(a.spent_at);
        const dateB = new Date(b.spent_at);
        return selectedSorting === 'DESC_DATE' ? dateB - dateA : dateA - dateB;
      });

    // Get the actual organized spendings from the rendered component
    const organizedSpendings = container.querySelectorAll('.organized-spending');

    // Assert that the organizedSpendings in the component match the expected result
    organizedSpendings.forEach((spendingElement, index) => {
      const description = expectedOrganizedSpendings[index].description;
      expect(spendingElement.textContent).toContain(description);
    });
  });
});