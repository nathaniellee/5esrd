import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from 'react-router-dom';
import {
  Divider,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import './App.css';
import { Class } from './classes/class';
import { Classes } from './classes/classes';
import { classes } from './constants';
import { Equipment } from './equipment/equipment';
import { Monsters } from './monsters/monsters';
import { Spells } from './spells/spells';

const useStyles = makeStyles({
  divider: {
    "::before": {
      ...shorthands.borderColor(tokens.colorPaletteRedBackground2),
    },
    "::after": {
      ...shorthands.borderColor(tokens.colorPaletteRedBackground2),
    },
  },
  header: {
    alignItems: 'center',
    backgroundColor: tokens.colorPaletteRedForeground2,
    color: tokens.colorNeutralForegroundInverted,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalS,
  },
  headerLink: {
    color: tokens.colorNeutralForegroundInverted,
    fontWeight: tokens.fontWeightMedium,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  navigation: {
    columnGap: tokens.spacingHorizontalS,
    display: 'flex',
  },
  pageTitle: {
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
  },
});

const classIds = Object.keys(classes);

const App = () => {
  const styles = useStyles();
  return (
    <Router>
      <div className="App">
        <header className={styles.header}>
          <span className={styles.pageTitle}>5eSRD</span>
          <nav className={styles.navigation}>
            <Link className={styles.headerLink} to="/classes">Classes</Link>
            <Divider className={styles.divider} vertical />
            <Link className={styles.headerLink} to="/">Spells</Link>
            <Divider className={styles.divider} vertical />
            <Link className={styles.headerLink} to="/monsters">Monsters</Link>
            <Divider className={styles.divider} vertical />
            <Link className={styles.headerLink} to="/equipment">Equipment</Link>
          </nav>
        </header>
        <div className="App-main">
          <Routes>
            <Route path="/" element={<Spells />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/monsters" element={<Monsters />} />
            <Route path="/equipment" element={<Equipment />} />
            {classIds.map(classId => (
              <Route key={classId} path={`/classes/${classId}`} element={<Class id={classId} />} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
