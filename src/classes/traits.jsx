import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  getArmorString,
  getHitDieString,
  getSavingThrowString,
  getWeaponsString,
} from './utils';

const useStyles = makeStyles({
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

export const Traits = ({
  hitDie,
  name,
  proficiencies,
  savingThrows,
}) => {
  const styles = useStyles();
  return (
    <div className={styles.traits}>
      <Trait
        label="Hit Die"
        value={getHitDieString(hitDie, name)}
      />
      <Trait
        label="Saves"
        value={getSavingThrowString(savingThrows)}
      />
      <Trait
        label="Skills"
        value={proficiencies.skills}
      />
      {proficiencies.tools.length > 0 && (
        <Trait
          label="Tool Proficiencies"
          value={proficiencies.tools}
        />
      )}
      <Trait
        label="Weapon Training"
        value={getWeaponsString(proficiencies.weapons)}
      />
      <Trait
        label="Armor Training"
        value={getArmorString(proficiencies.armor)}
      />
    </div>
  );
};

Traits.propTypes = {
  hitDie: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  proficiencies: PropTypes.shape({
    armor: PropTypes.arrayOf(PropTypes.string).isRequired,
    skills: PropTypes.string.isRequired,
    tools: PropTypes.arrayOf(PropTypes.string).isRequired,
    weapons: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  savingThrows: PropTypes.arrayOf(PropTypes.string).isRequired,
};
