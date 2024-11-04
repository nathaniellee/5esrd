import PropTypes from 'prop-types';
import React from 'react';
import { Field } from '../common/field';

export const ArmorInfo = ({
  armorClass,
  stealthDisadvantage,
  strengthMinimum,
}) => {
  const {
    base,
    dexBonus,
    maxBonus,
  } = armorClass;
  let armorClassString = base;

  if (dexBonus) {
    armorClassString += ' + Dexterity modifier';

    if (maxBonus) {
      armorClassString += ` (max ${maxBonus})`;
    }
  }

  return (
    <>
      <Field label="Armor Class" value={armorClassString} />
      {strengthMinimum > 0 && (
        <Field label="Minimum Strength" value={strengthMinimum} />
      )}
      <Field label="Disadvantage on Stealth" value={stealthDisadvantage ? 'Yes' : 'No'} />
    </>
  );
};

ArmorInfo.propTypes = {
  armorClass: PropTypes.shape({
    base: PropTypes.number.isRequired,
    dexBonus: PropTypes.bool.isRequired,
    maxBonus: PropTypes.number,
  }).isRequired,
  stealthDisadvantage: PropTypes.bool.isRequired,
  strengthMinimum: PropTypes.number.isRequired,
};
