import PropTypes from 'prop-types';
import React from 'react';
import { Text } from '@fluentui/react-components';

export const HigherLevel = ({ text }) => (
  <>
    <Text italic weight="bold">Using a Higher-Level Spell Slot.</Text> <Text>{text}</Text>
  </>
);

HigherLevel.propTypes = {
  text: PropTypes.string.isRequired,
};
