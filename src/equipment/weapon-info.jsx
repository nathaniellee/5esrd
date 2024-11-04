import PropTypes from 'prop-types';
import React from 'react';
import { Field } from '../common/field';

export const WeaponInfo = ({ damage }) => {
  const damageString = `${damage.damageDice} ${damage.damageType}`;
  return (
    <Field
      label="Damage"
      value={damageString}
    />
  );
};

WeaponInfo.propTypes = {
  damage: PropTypes.shape({
    damageDice: PropTypes.string.isRequired,
    damageType: PropTypes.string.isRequired,
  }).isRequired,
};
