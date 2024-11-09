import PropTypes from 'prop-types';
import React from 'react';
import { Text } from '@fluentui/react-components';

export const DamageAdjustments = ({
  damageImmunities,
  damageResistances,
  damageVulnerabilities,
}) => {
  const immunities = damageImmunities.length === 0 ? null : damageImmunities.join(', ');
  const resistances = damageResistances.length === 0 ? null : damageResistances.join(', ');
  const vulnerabilities = damageVulnerabilities.length === 0 ? null : damageVulnerabilities.join(', ');

  if (!immunities && !resistances && !vulnerabilities) {
    return (
      <Text>None</Text>
    );
  }

  return (
    <>
      {resistances && (
        <Text>
          <Text weight="bold">Resistances: </Text>
          <Text>{resistances}</Text>
        </Text>
      )}
      {immunities && (
        <Text>
          <Text weight="bold">Immunities: </Text>
          <Text>{immunities}</Text>
        </Text>
      )}
      {vulnerabilities && (
        <Text>
          <Text weight="bold">Vulnerabilities: </Text>
          <Text>{vulnerabilities}</Text>
        </Text>
      )}
    </>
  );
};

DamageAdjustments.propTypes = {
  damageImmunities: PropTypes.arrayOf(PropTypes.string).isRequired,
  damageResistances: PropTypes.arrayOf(PropTypes.string).isRequired,
  damageVulnerabilities: PropTypes.arrayOf(PropTypes.string).isRequired,
};
