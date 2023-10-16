import React, { useState } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';
import { SORTING, FILTER } from './utils/constants';
import { usdToHuf } from './utils/currencyConverter';

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [selectedSorting, setSelectedSorting] = useState(SORTING.DESC_DATE)
  const [selectedFilter, setSelectedFilter] = useState(FILTER.ALL)

  const sortingFn = {
    [SORTING.DESC_DATE]: (a,b) => new Date(b.spent_at) - new Date(a.spent_at),
    [SORTING.ASC_DATE]: (a,b) => new Date(a.spent_at) - new Date(b.spent_at),
    [SORTING.DESC_AMOUNT]: (a,b) => usdToHuf(b).amount - usdToHuf(a).amount,
    [SORTING.ASC_AMOUNT]: (a,b) => usdToHuf(a).amount - usdToHuf(b).amount,
  }[selectedSorting]

  const organizedSpendings = [...spendings]
    .filter(item => selectedFilter === FILTER.ALL || item.currency === selectedFilter)
    .sort((a,b) => sortingFn(a,b))

  return (
    <>
      <Layout>
        <Form 
          setSpendings={setSpendings}/>
        <FiltersAndOrderings 
          setSorting={setSelectedSorting}
          setFilter={setSelectedFilter}
          filter={selectedFilter}
          allSpendings={spendings}
        />
        <SpendingList
          allSpendings={spendings}
          organizedSpendings={organizedSpendings}
          setSpendings={setSpendings}
        />
      </Layout>
    </>
  );
}
