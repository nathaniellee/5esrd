import React, { useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_ORDER,
  fetchSpells,
  fetchTotalSpellCount,
  transformSpell,
} from './api/fetchSpells';
import {
  fetchSpell,
  transformSpell as transformDialogSpell,
} from './api/fetchSpell';
import { SpellsTable } from './spells/spells-table';
import './App.css';
import { SpellsLoadingContext } from './contexts';
import { SpellDialog } from './spells/spell-dialog';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PER_PAGE = 20;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [spell, setSpell] = useState();
  const [spells, setSpells] = useState([]);
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [totalSpellCount, setTotalSpellCount] = useState(0);
  const [showSpellDialog, setShowSpellDialog] = useState(false);

  const perPage = DEFAULT_PER_PAGE;

  const onChangeSort = useCallback(({ columnKey, sortDirection }) => {
    const newOrder = [{
      by: columnKey,
      direction: sortDirection,
    }];

    if (columnKey !== 'name') {
      newOrder.push({
        by: 'name',
        direction: sortDirection,
      });
    }
    setOrder(newOrder);
    setPageNumber(DEFAULT_PAGE_NUMBER);
    fetchSpells({
      order: newOrder,
      pageNumber: DEFAULT_PAGE_NUMBER,
      perPage,
    }).then(onDoneFetchSpells);
  });

  const onDoneFetchSpells = useCallback((spells) => {
    setSpells(spells.map(transformSpell));
    setIsLoading(false);
  }, []);

  const onNextPage = useCallback(() => {
    const newPageNumber = pageNumber + 1;
    setPageNumber(newPageNumber);
    setIsLoading(true);
    fetchSpells({
      order,
      pageNumber: newPageNumber,
      perPage,
    }).then(onDoneFetchSpells);
  }, [order, pageNumber, perPage]);

  const onPrevPage = useCallback(() => {
    const newPageNumber = pageNumber - 1;
    setPageNumber(newPageNumber);
    setIsLoading(true);
    fetchSpells({
      order,
      pageNumber: newPageNumber,
      perPage,
    }).then(onDoneFetchSpells);
  }, [order, pageNumber, perPage]);

  const onSelectSpell = useCallback((id) => {
    fetchSpell(id).then((spell) => {
      setSpell(transformDialogSpell(spell));
      setShowSpellDialog(true);
    });
  }, []);

  const onCloseSpellDialog = useCallback(() => {
    setShowSpellDialog(false);
  }, []);

  useEffect(() => {
    fetchTotalSpellCount().then((count) => {
      setTotalSpellCount(count);
      fetchSpells({
        pageNumber,
        perPage,
      }).then(onDoneFetchSpells);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        5eSRD
      </header>
      <div className="App-main">
        <SpellsLoadingContext.Provider value={isLoading}>
          <SpellsTable
            onChangeSort={onChangeSort}
            onNextPage={onNextPage}
            onPrevPage={onPrevPage}
            onSelectSpell={onSelectSpell}
            pageNumber={pageNumber}
            perPage={perPage}
            spells={spells}
            totalSpellCount={totalSpellCount}
          />
        </SpellsLoadingContext.Provider>
      </div>
      <SpellDialog
        isOpen={showSpellDialog}
        onClose={onCloseSpellDialog}
        spell={spell}
      />
    </div>
  );
};

export default App;
