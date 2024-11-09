import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { abilityScores } from '../constants';

const paddingStyles = {
  paddingBottom: tokens.spacingVerticalXS,
  paddingLeft: tokens.spacingHorizontalS,
  paddingRight: tokens.spacingHorizontalS,
  paddingTop: tokens.spacingVerticalXS,
};

const useStyles = makeStyles({
  abilityScoreLabel: {
    display: 'inline-block',
    width: '40px',
  },
  abilityScoreModifier: {
    display: 'inline-block',
    textAlign: 'center',
    width: '20px',
  },
  abilityScoreValue: {
    display: 'inline-block',
    textAlign: 'right',
    width: '20px',
  },
  mentalAbilityModifier: {
    backgroundColor: 'rgb(208,202,202)',
    ...paddingStyles,
  },
  mentalAbilityScore: {
    backgroundColor: 'rgb(216,218,209)',
    ...paddingStyles,
  },
  physicalAbilityModifier: {
    backgroundColor: 'rgb(222,212,204)',
    ...paddingStyles,
  },
  physicalAbilityScore: {
    backgroundColor: 'rgb(237,230,217)',
    display: 'flex',
    ...paddingStyles,
  },
  root: {
    display: 'flex',
    columnGap: tokens.spacingHorizontalS,
  },
  row: {
    display: 'flex',
  },
});

const modifiers = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const getModifierString = (score, bonus = 0) => {
  const modifier = modifiers[Math.floor(score / 2)] + bonus;
  return modifier < 0 ? `${modifier}` : `+${modifier}`;
};

const AbilityScore = ({
  isProficient = false,
  label,
  proficiencyBonus,
  score,
  type,
}) => {
  const styles = useStyles();
  const modifierClassName = type === 'physical' ? styles.physicalAbilityModifier : styles.mentalAbilityModifier;
  const scoreClassName = type === 'physical' ? styles.physicalAbilityScore : styles.mentalAbilityScore;

  return (
    <div className={styles.row}>
      <div className={scoreClassName}>
        <Text className={styles.abilityScoreLabel} weight="bold">{label}</Text>
        <Text className={styles.abilityScoreValue}>{score}</Text>
      </div>
      <div className={modifierClassName}>
        <Text className={styles.abilityScoreModifier}>
          {getModifierString(score)}
        </Text>
      </div>
      <div className={modifierClassName}>
        <Text className={styles.abilityScoreModifier}>
          {getModifierString(score, isProficient ? proficiencyBonus : 0)}
        </Text>
      </div>
    </div>
  );
};

AbilityScore.propTypes = {
  isProficient: PropTypes.bool,
  label: PropTypes.string.isRequired,
  proficiencyBonus: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['mental', 'physical']).isRequired,
};

export const AbilityScores = ({
  charisma,
  constitution,
  dexterity,
  intelligence,
  proficiencyBonus,
  savingThrowProficiencies,
  strength,
  wisdom,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <AbilityScore
          isProficient={savingThrowProficiencies.includes('STR')}
          label={abilityScores.strength}
          proficiencyBonus={proficiencyBonus}
          score={strength}
          type="physical"
        />
        <AbilityScore
          isProficient={savingThrowProficiencies.includes('INT')}
          label={abilityScores.intelligence}
          proficiencyBonus={proficiencyBonus}
          score={intelligence}
          type="mental"
        />
      </div>
      <div>
        <AbilityScore
          isProficient={savingThrowProficiencies.includes('DEX')}
          label={abilityScores.dexterity}
          proficiencyBonus={proficiencyBonus}
          score={dexterity}
          type="physical"
        />
        <AbilityScore
          isProficient={savingThrowProficiencies.includes('WIS')}
          label={abilityScores.wisdom}
          proficiencyBonus={proficiencyBonus}
          score={wisdom}
          type="mental"
        />
      </div>
      <div>
        <AbilityScore
          isProficient={savingThrowProficiencies.includes('CON')}
          label={abilityScores.constitution}
          proficiencyBonus={proficiencyBonus}
          score={constitution}
          type="physical"
        />
        <AbilityScore
          isProficient={savingThrowProficiencies.includes('CHA')}
          label={abilityScores.charisma}
          proficiencyBonus={proficiencyBonus}
          score={charisma}
          type="mental"
        />
      </div>
    </div>
  );
};

AbilityScores.propTypes = {
  charisma: PropTypes.number.isRequired,
  constitution: PropTypes.number.isRequired,
  dexterity: PropTypes.number.isRequired,
  intelligence: PropTypes.number.isRequired,
  proficiencyBonus: PropTypes.number.isRequired,
  savingThrowProficiencies: PropTypes.array.isRequired,
  strength: PropTypes.number.isRequired,
  wisdom: PropTypes.number.isRequired,
};
