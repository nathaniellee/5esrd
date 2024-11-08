import React, { useCallback, useEffect, useState } from 'react';
import { Title1 } from '@fluentui/react-components';
import {
  DEFAULT_ORDER,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PER_PAGE,
} from '../api/constants';
import {
  fetchMonsters,
  fetchTotalMonsterCount,
  transformMonster,
} from '../api/fetchMonsters';
import { MonstersTable } from './monsters-table';

export const Monsters = () => {
  const [monsters, setMonsters] = useState([]);
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [totalMonsterCount, setTotalMonsterCount] = useState(0);

  const perPage = DEFAULT_PER_PAGE;

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
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        pageNumber={pageNumber}
        perPage={perPage}
        totalMonsterCount={totalMonsterCount}
      />
    </div>
  );
};
