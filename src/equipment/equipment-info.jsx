import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { Description } from '../common/description';
import { equipmentCategories } from '../constants';
import {
  getCostString,
  getWeightString,
} from './utils';

const useStyles = makeStyles({
  label: {
    marginRight: tokens.spacingHorizontalSNudge,
  },
  subheader: {
    marginBottom: tokens.spacingVerticalM,
  },
});

export const EquipmentInfo = ({
  cost,
  equipmentCategory,
  description,
  weight,
}) => {
  const styles = useStyles();
  const subheader = equipmentCategories[equipmentCategory];

  return (
    <>
      <div className={styles.subheader}>
        <Text italic>{subheader}</Text>
      </div>
      <div>
        <Text className={styles.label} weight="bold">Cost:</Text>
        <Text>{getCostString(cost.quantity, cost.unit)}</Text>
      </div>
      <div>
        <Text className={styles.label} weight="bold">Weight:</Text>
        <Text>{getWeightString(weight)}</Text>
      </div>
      <Description description={description} />
    </>
  );
};

EquipmentInfo.propTypes = {
  cost: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  equipmentCategory: PropTypes.string.isRequired,
  weight: PropTypes.number,
};
