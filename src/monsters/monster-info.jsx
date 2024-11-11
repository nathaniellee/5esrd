import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { Field } from '../common/field';
import {
  creatureSizes,
  creatureTypes,
} from '../constants';
import {
  getCRString,
  getDamageAdjustmentString,
  getHitPointsString,
  getSpeedString,
} from './utils';
import { AbilityScores } from './ability-scores';

const useStyles = makeStyles({
  sectionSpacing: {
    marginBottom: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalM,
  },
  subheader: {
    marginBottom: tokens.spacingVerticalM,
  },
});

export const MonsterInfo = ({
  armorClass,
  challengeRating,
  charisma,
  constitution,
  damageImmunities,
  damageResistances,
  damageVulnerabilities,
  dexterity,
  hitPoints,
  hitPointsFormula,
  intelligence,
  languages,
  proficiencies,
  proficiencyBonus,
  size,
  speed,
  strength,
  type,
  wisdom,
  xp,
}) => {
  const styles = useStyles();
  const subheader = `${creatureSizes[size]} ${creatureTypes[type]}`;

  return (
    <>
      <div className={styles.subheader}>
        <Text italic>{subheader}</Text>
      </div>
      <Field label="AC" value={`${armorClass}`} />
      <Field label="HP" value={getHitPointsString({
        hitPoints,
        hitPointsFormula,
      })} />
      <Field label="Speed" value={getSpeedString(speed)} />
      <div className={styles.sectionSpacing}>
        <AbilityScores
          charisma={charisma}
          constitution={constitution}
          dexterity={dexterity}
          intelligence={intelligence}
          proficiencyBonus={proficiencyBonus}
          savingThrowProficiencies={proficiencies.savingThrows}
          strength={strength}
          wisdom={wisdom}
        />
      </div>
      {damageVulnerabilities.length > 0 && (
        <Field label="Vulnerabilities" value={getDamageAdjustmentString(damageVulnerabilities)} />
      )}
      {damageResistances.length > 0 && (
        <Field label="Resistances" value={getDamageAdjustmentString(damageResistances)} />
      )}
      {damageImmunities.length > 0 && (
        <Field label="Immunities" value={getDamageAdjustmentString(damageImmunities)} />
      )}
      <Field label="Languages" value={languages ? languages : 'None'} />
      <Field label="CR" value={getCRString({ challengeRating, proficiencyBonus, xp })} />
    </>
  );
};

MonsterInfo.propTypes = {
  armorClass: PropTypes.number.isRequired,
  challengeRating: PropTypes.number.isRequired,
  charisma: PropTypes.number.isRequired,
  constitution: PropTypes.number.isRequired,
  damageImmunities: PropTypes.arrayOf(PropTypes.string).isRequired,
  damageResistances: PropTypes.arrayOf(PropTypes.string).isRequired,
  damageVulnerabilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  dexterity: PropTypes.number.isRequired,
  hitPoints: PropTypes.number.isRequired,
  hitPointsFormula: PropTypes.string.isRequired,
  intelligence: PropTypes.number.isRequired,
  languages: PropTypes.string.isRequired,
  proficiencies: PropTypes.shape({
    savingThrows: PropTypes.arrayOf(PropTypes.string).isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  proficiencyBonus: PropTypes.number.isRequired,
  size: PropTypes.oneOf(Object.keys(creatureSizes)).isRequired,
  speed: PropTypes.shape({
    burrow: PropTypes.string,
    climb: PropTypes.string,
    fly: PropTypes.string,
    hover: PropTypes.bool,
    swim: PropTypes.string,
    walk: PropTypes.string.isRequired,
  }).isRequired,
  strength: PropTypes.number.isRequired,
  type: PropTypes.oneOf(Object.keys(creatureTypes)).isRequired,
  wisdom: PropTypes.number.isRequired,
  xp: PropTypes.number.isRequired,
};
