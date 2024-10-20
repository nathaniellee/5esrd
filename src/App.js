import React, { useEffect, useState } from 'react';
import { fetchSpells, transformSpell } from './api/fetchSpells';
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
        {spells.length === 0 ? (
          <p>Hello, world!</p>
        ) : (
          <table>
            <thead>
              <tr>
                {Object.keys(spells[0]).map(key => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {spells.map(spell => (
                <tr key={spell.index}>
                  {Object.entries(spell).map(([key, value]) => {
                    if (key === 'index') {
                      return null;
                    }
                    return <td key={key}>{typeof value === 'object' ? '[object]' : value}</td>;
                  })}
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
