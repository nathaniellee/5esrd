import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { Description } from '../common/description';
import { Field } from '../common/field';
import {
  armorCategories,
  equipmentCategories,
  toolCategories,
} from '../constants';
import { ArmorInfo } from './armor-info';
import {
  getCostString,
  getWeightString,
} from './utils';
import { WeaponInfo } from './weapon-info';

const useStyles = makeStyles({
  label: {
    marginRight: tokens.spacingHorizontalSNudge,
  },
  subheader: {
    marginBottom: tokens.spacingVerticalM,
  },
});

const getSubheader = ({ armorCategory, equipmentCategory, gearCategory, toolCategory }) => {
  let subheader = equipmentCategories[equipmentCategory];

  if (equipmentCategory === 'armor') {
    subheader = armorCategories[armorCategory];
  } else if (equipmentCategory === 'tools') {
    subheader = toolCategories[toolCategory];
  } else if (equipmentCategory === 'adventuring-gear' && gearCategory === 'ammunition') {
    subheader = 'Ammunition';
  }

  return subheader;
};

export const EquipmentInfo = ({
  armorCategory,
  cost,
  description,
  equipmentCategory,
  gearCategory,
  quantity,
  toolCategory,
  weight,
  ...restProps
}) => {
  const styles = useStyles();
  const subheader = getSubheader({ armorCategory, equipmentCategory, gearCategory, toolCategory });

  return (
    <>
      <div className={styles.subheader}>
        <Text italic>{subheader}</Text>
      </div>
      {gearCategory === 'ammunition' && (
        <Field label="Quantity" value={quantity} />
      )}
      <Field label="Cost" value={getCostString(cost.quantity, cost.unit)} />
      <Field label="Weight" value={getWeightString(weight)} />
      {equipmentCategory === 'armor' && (
        <ArmorInfo {...restProps} />
      )}
      {equipmentCategory === 'weapon' && (
        <WeaponInfo {...restProps} />
      )}
      <Description description={description} />
    </>
  );
};

EquipmentInfo.propTypes = {
  armorCategory: PropTypes.string,
  cost: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  equipmentCategory: PropTypes.string.isRequired,
  gearCategory: PropTypes.string,
  quantity: PropTypes.number,
  toolCategory: PropTypes.string,
  weight: PropTypes.number,
};
