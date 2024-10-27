import PropTypes from 'prop-types';
import React from 'react';
import { Text } from '@fluentui/react-components';

export const Components = ({
  components,
  material,
}) => {
  const componentsString = components.join(', ');
  
  if (!material) {
    return (
      <Text>
        {componentsString}
      </Text>
    );
  }

  const materialString = material.toLowerCase().replace('.', '');
  const finalString = `${componentsString} (${materialString})`;

  return (
    <Text>
      {finalString}
    </Text>
  );
};

Components.propTypes = {
  components: PropTypes.arrayOf(PropTypes.string).isRequired,
  material: PropTypes.string,
};
