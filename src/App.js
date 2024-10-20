import React, { useEffect, useState } from 'react';
import { fetchSpells, transformSpell } from './api/fetchSpells';
import { SpellsTable } from './spells/spells-table';
import './App.css';

const App = () => {
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    fetchSpells().then((spells) => {
      setSpells(spells.map(transformSpell));
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        5eSRD
      </header>
      <div className="App-main">
        <SpellsTable spells={spells} />
      </div>
    </div>
  );
};

export default App;
