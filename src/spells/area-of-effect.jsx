import PropTypes from 'prop-types';
import React from 'react';
import {
  areas,
  areaStrings,
} from '../constants';

export const AreaOfEffect = ({ size, type }) => `${size}-foot ${areaStrings[type]}`;

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
