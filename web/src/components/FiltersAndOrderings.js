import React, { useEffect, useState } from 'react';

import { FiltersWrapper, Orderings, CurrencyFilters, CurrencyButton, CountIndicator } from '../styles/ComponentStyles';
import { SORTING, FILTER } from '../utils/constants';

export default function CurrencyFilter({setSorting, setFilter, filter, allSpendings}) {

  const handleSorting = (event) => {
    setSorting(event.target.value)
  }

  const handleFilter = (filt) => {
    setFilter(filt)
  }

  const getFilteredCount = (curr) => curr === FILTER.ALL 
    ? allSpendings.length 
    : allSpendings.filter(e => e.currency === curr).length

  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select onChange={handleSorting}>
            <option value={SORTING.DESC_DATE}>Sort by Date descending (default)</option>
            <option value={SORTING.ASC_DATE}>Sort by Date ascending</option>
            <option value={SORTING.DESC_AMOUNT}>Sort by Amount descending</option>
            <option value={SORTING.ASC_AMOUNT}>Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters>
          {Object.keys(FILTER).map(key => 
          <li key={key}>
            <CurrencyButton
              currencyFilter={filter}
              name={FILTER[key]}
              onClick={() => handleFilter(FILTER[key])}
            >
              {FILTER[key]}
            <CountIndicator>{getFilteredCount(FILTER[key])} items</CountIndicator>
            </CurrencyButton>
          </li>
          )}
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
}
