import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    marginBlockEnd: '0px',
    marginBlockStart: '0px',
    paddingInlineStart: tokens.spacingHorizontalM,
  },
});

export const StartingEquipment = ({ granted, options }) => {
  const styles = useStyles();
  return (
    <ul className={styles.root}>
      {options.map((equipmentOption, i) => (
        <li key={i}>{equipmentOption}</li>
      ))}
      <li>{granted.join(', ')}</li>
    </ul>
  );
};

StartingEquipment.propTypes = {
  granted: PropTypes.arrayOf(PropTypes.string).isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};
