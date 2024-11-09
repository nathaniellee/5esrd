import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  creatureSizes,
  creatureTypes,
} from '../constants';

const useStyles = makeStyles({
  subheader: {
    marginBottom: tokens.spacingVerticalM,
  },
});

export const MonsterInfo = ({
  size,
  type,
}) => {
  const styles = useStyles();
  const subheader = `${creatureSizes[size]} ${creatureTypes[type]}`;

  return (
    <>
      <div className={styles.subheader}>
        <Text italic>{subheader}</Text>
      </div>
    </>
  );
};

MonsterInfo.propTypes = {
  size: PropTypes.oneOf(Object.keys(creatureSizes)).isRequired,
  type: PropTypes.oneOf(Object.keys(creatureTypes)).isRequired,
};
