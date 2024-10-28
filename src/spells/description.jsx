import PropTypes from 'prop-types';
import React from 'react';
import { Callout, isCallout } from '../common/callout';

export const Description = ({ description }) => (
  <>
    {description.map(
      (paragraph, i) => isCallout(paragraph)
        ? <Callout key={i} string={paragraph} />
        : <p key={i}>{paragraph}</p>
    )}
  </>
);

Description.propTypes = {
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
};
