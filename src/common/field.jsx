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

export const Field = ({ label, value }) => {
  const styles = useStyles();
  return (
    <div>
      <Text className={styles.label} weight="bold">{`${label}:`}</Text>
      <Text>{value}</Text>
    </div>
  );
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
