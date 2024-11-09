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
  getHitPointsString,
  getSpeedString,
} from './utils';

const useStyles = makeStyles({
  subheader: {
    marginBottom: tokens.spacingVerticalM,
  },
});

export const MonsterInfo = ({
  armorClass,
  challengeRating,
  hitPoints,
  hitPointsFormula,
  size,
  speed,
  type,
  xp,
}) => {
  const styles = useStyles();
  const subheader = `${creatureSizes[size]} ${creatureTypes[type]}`;

  return (
    <>
      <div className={styles.subheader}>
        <Text italic>{subheader}</Text>
      </div>
      <Field label="AC" value={armorClass} />
      <Field label="HP" value={getHitPointsString({
        hitPoints,
        hitPointsFormula,
      })} />
      <Field label="CR" value={getCRString({ challengeRating, xp })} />
      <Field label="Speed" value={getSpeedString(speed)} />
    </>
  );
};

MonsterInfo.propTypes = {
  armorClass: PropTypes.number.isRequired,
  challengeRating: PropTypes.number.isRequired,
  hitPoints: PropTypes.number.isRequired,
  hitPointsFormula: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(creatureSizes)).isRequired,
  speed: PropTypes.shape({
    burrow: PropTypes.string,
    climb: PropTypes.string,
    fly: PropTypes.string,
    hover: PropTypes.bool,
    swim: PropTypes.string,
    walk: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.oneOf(Object.keys(creatureTypes)).isRequired,
  xp: PropTypes.number.isRequired,
};
