import PropTypes from 'prop-types';
import React from 'react';
import { Text } from '@fluentui/react-components';
import {
  areas,
  areaStrings,
} from '../constants';

export const AreaOfEffect = ({ size, type }) => {
  const sizeString = `${size}-foot`;
  const areaString = areaStrings[type];
  const finalString = `${sizeString} ${areaString}`;

  return <Text>{finalString}</Text>;
};

AreaOfEffect.propTypes = {
  size: PropTypes.number.isRequired,
  type: PropTypes.oneOf([
    areas.cone,
    areas.cube,
    areas.cylinder,
    areas.line,
    areas.sphere,
  ]).isRequired,
};
