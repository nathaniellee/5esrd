import PropTypes from 'prop-types';
import React from 'react';
import { Text } from '@fluentui/react-components';

const rx = /^\*{3}[\w\W]*?\*{3}/;

export const isCallout = string => rx.test(string);

export const Callout = ({ string }) => {
  const [, label, content] = string.split('***');
  return (
    <p>
      <Text weight="bold">{label}</Text> <Text>{content}</Text>
    </p>
  );
};

Callout.propTypes = {
  string: PropTypes.string.isRequired,
};
