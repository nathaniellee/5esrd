import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  label: {
    marginRight: tokens.spacingHorizontalSNudge,
  },
});

export const FieldLabel = ({ label }) => {
  const styles = useStyles();
  return (
    <Text className={styles.label} weight="bold">{`${label}:`}</Text>
  );
};

FieldLabel.propTypes = {
  label: PropTypes.string.isRequired,
};
