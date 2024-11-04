import PropTypes from 'prop-types';
import React from 'react';
import { Text } from '@fluentui/react-components';
import { FieldLabel } from './field-label';

export const Field = ({ label, value }) => (
  <div>
    <FieldLabel label={label} />
    <Text>{value}</Text>
  </div>
);

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
