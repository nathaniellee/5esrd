import React, { useEffect, useState } from 'react';
import { fetchSpells } from './api/fetchSpells';
import './App.css';

const App = () => {
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    fetchSpells().then((spells) => {
      setSpells(spells);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        5eSRD
      </header>
      <div className="App-main">
        {spells.length === 0 ? (
          <p>Hello, world!</p>
        ) : (
          <table>
            <tbody>
              {spells.map(spell => (
                <tr key={spell.index}>
                  <td>{spell.level}</td>
                  <td>{spell.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default App;
