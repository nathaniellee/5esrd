import PropTypes from 'prop-types';
import React from 'react';
import { Text } from '@fluentui/react-components';

export const Duration = ({
  duration,
  requiresConcentration = false,
}) => {
  if (!requiresConcentration) {
    return (
      <Text>{duration}</Text>
    );
  }

  const durationString = `Concentration, ${duration.toLowerCase()}`;

  return (
    <Text>{durationString}</Text>
  );
};

Duration.propTypes = {
  duration: PropTypes.string.isRequired,
  requiresConcentration: PropTypes.bool,
};
