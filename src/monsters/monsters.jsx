import React, { useEffect } from 'react';
import { Title1 } from '@fluentui/react-components';
import {
  fetchMonsters,
  fetchTotalMonsterCount,
} from '../api/fetchMonsters';

export const Monsters = () => {
  useEffect(() => {
    fetchTotalMonsterCount().then((count) => {
      console.log(`${count} monsters`);
      fetchMonsters().then((monsters) => {
        console.log(monsters);
      });
    });
  }, []);

  return (
    <div className="Monsters">
      <Title1>Monsters</Title1>
    </div>
  );
};
