import React, { useCallback, useEffect, useState } from 'react';
import { Title1 } from '@fluentui/react-components';
import {
  DEFAULT_ORDER,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PER_PAGE,
} from '../api/constants';
import {
  fetchMonster,
  transformMonster as transformDialogMonster,
} from '../api/fetchMonster';
import {
  fetchMonsters,
  fetchTotalMonsterCount,
  transformMonster,
} from '../api/fetchMonsters';
import { MonsterDialog } from './monster-dialog';
import { MonstersTable } from './monsters-table';

export const Monsters = () => {
  const [monster, setMonster] = useState();
  const [monsters, setMonsters] = useState([]);
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [showMonsterDialog, setShowMonsterDialog] = useState(false);
  const [totalMonsterCount, setTotalMonsterCount] = useState(0);

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
    fetchMonsters({
      order: newOrder,
      pageNumber: DEFAULT_PAGE_NUMBER,
      perPage,
    }).then(onDoneFetchMonsters);
  });

  const onDoneFetchMonsters = useCallback((monsters) => {
    setMonsters(monsters.map(monster => transformMonster(monster)));
  }, []);

  const onNextPage = useCallback(() => {
    const newPageNumber = pageNumber + 1;
    setPageNumber(newPageNumber);
    fetchMonsters({
      order,
      pageNumber: newPageNumber,
      perPage,
    }).then(onDoneFetchMonsters);
  }, [order, pageNumber, perPage]);

  const onPrevPage = useCallback(() => {
    const newPageNumber = pageNumber - 1;
    setPageNumber(newPageNumber);
    fetchMonsters({
      order,
      pageNumber: newPageNumber,
      perPage,
    }).then(onDoneFetchMonsters);
  }, [order, pageNumber, perPage]);

  const onSelectMonster = useCallback((id) => {
    fetchMonster(id).then((monster) => {
      setMonster(transformDialogMonster(monster));
      setShowMonsterDialog(true);
    });
  }, []);

  const onCloseMonsterDialog = useCallback(() => {
    setShowMonsterDialog(false);
  }, []);

  useEffect(() => {
    fetchTotalMonsterCount().then((count) => {
      setTotalMonsterCount(count);
      fetchMonsters().then(onDoneFetchMonsters);
    });
  }, []);

  return (
    <div className="Monsters">
      <Title1>Monsters</Title1>
      <MonstersTable
        monsters={monsters}
        onChangeSort={onChangeSort}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        onSelectMonster={onSelectMonster}
        pageNumber={pageNumber}
        perPage={perPage}
        totalMonsterCount={totalMonsterCount}
      />
      <MonsterDialog
        isOpen={showMonsterDialog}
        onClose={onCloseMonsterDialog}
        monster={monster}
      />
    </div>
  );
};
