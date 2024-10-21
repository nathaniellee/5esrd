import React, { useCallback, useEffect, useState } from 'react';
import {
  fetchSpells,
  fetchTotalSpellCount,
  transformSpell,
} from './api/fetchSpells';
import { SpellsTable } from './spells/spells-table';
import './App.css';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PER_PAGE = 20;

const App = () => {
  const [spells, setSpells] = useState([]);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [totalSpellCount, setTotalSpellCount] = useState(0);

  const perPage = DEFAULT_PER_PAGE;

  const onNextPage = useCallback(() => {
    setPageNumber(pageNumber + 1);
  }, [pageNumber]);

  const onPrevPage = useCallback(() => {
    setPageNumber(pageNumber - 1);
  }, [pageNumber]);

  useEffect(() => {
    fetchTotalSpellCount().then((count) => {
      setTotalSpellCount(count);
      fetchSpells({
        pageNumber,
        perPage,
      }).then((spells) => {
        setSpells(spells.map(transformSpell));
      });
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        5eSRD
      </header>
      <div className="App-main">
        <SpellsTable
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
          pageNumber={pageNumber}
          perPage={perPage}
          spells={spells}
          totalSpellCount={totalSpellCount}
        />
      </div>
    </div>
  );
};

export default App;
