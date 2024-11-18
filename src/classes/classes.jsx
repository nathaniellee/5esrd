import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  Subtitle1,
  Text,
  Title1,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  fetchClasses,
  transformClasses,
} from '../api/fetchClasses';
import { classMetadata } from './constants';
import {
  getArmorString,
  getHitDieString,
  getSavingThrowString,
  getWeaponsString,
} from './utils';

const gapSize = 24;

const useStyles = makeStyles({
  card: {
    width: `calc(33.33% - ${gapSize * 2 / 3}px)`,
  },
  container: {
    columnGap: `${gapSize}px`,
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: `${gapSize}px`,
    rowGap: `${gapSize}px`,
  },
  trait: {
    display: 'flex',
    columnGap: tokens.spacingHorizontalXS,
  },
  traitLabel: {
    whiteSpace: 'nowrap',
  },
  traits: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const Trait = ({ label, value }) => {
  const styles = useStyles();
  return (
    <span className={styles.trait}>
      <Text className={styles.traitLabel} weight='semibold'>{`${label}:`}</Text>
      <Text>{value}</Text>
    </span>
  );
};

Trait.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const ClassCard = ({
  hitDie,
  id,
  name,
  proficiencies,
  savingThrows,
}) => {
  const styles = useStyles();
  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <Subtitle1 weight="semibold">{name}</Subtitle1>
        }
        description={
          <Text italic>{classMetadata[id].tagline}</Text>
        }
      />
      <Text>{classMetadata[id].summary}</Text>
      <div className={styles.traits}>
        <Trait
          label="Hit Die"
          value={getHitDieString(hitDie)}
        />
        <Trait
          label="Saves"
          value={getSavingThrowString(savingThrows)}
        />
        <Trait
          label="Weapon Training"
          value={getWeaponsString(proficiencies.weapons)}
        />
        <Trait
          label="Armor Training"
          value={getArmorString(proficiencies.armor)}
        />
      </div>
    </Card>
  );
};

ClassCard.propTypes = {
  hitDie: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  proficiencies: PropTypes.shape({
    armor: PropTypes.arrayOf(PropTypes.string).isRequired,
    skills: PropTypes.string.isRequired,
    tools: PropTypes.arrayOf(PropTypes.string).isRequired,
    weapons: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  savingThrows: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export const Classes = () => {
  const [classes, setClasses] = useState([]);
  const styles = useStyles();

  useEffect(() => {
    fetchClasses().then((classes) => {
      setClasses(classes.map(transformClasses));
    })
  }, []);

  return (
    <div className="Classes">
      <Title1>Classes</Title1>
      {classes.length && (
        <div className={styles.container}>
          {classes.map(klass => (
            <ClassCard key={klass.id} {...klass} />
          ))}
        </div>
      )}
    </div>
  );
};
