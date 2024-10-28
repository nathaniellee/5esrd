import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { AreaOfEffect } from './area-of-effect';
import { Components } from './components';
import { areas } from '../constants';
import { Description } from './description';
import { Duration } from './duration';
import { HigherLevel } from './higher-level';

const useStyles = makeStyles({
  bold: {
    fontWeight: tokens.fontWeightBold,
  },
  label: {
    marginRight: tokens.spacingHorizontalSNudge,
  },
  subheader: {
    marginBottom: tokens.spacingVerticalM,
  },
});

export const SpellInfo = ({
  areaOfEffect,
  castingTime,
  classes,
  components,
  description,
  duration,
  higherLevel,
  level,
  material,
  range,
  requiresConcentration = false,
  school,
}) => {
  const styles = useStyles();
  const classesList = classes.map(({ name }) => name).join(', ');
  const subheader = `Level ${level} ${school} (${classesList})`;

  return (
    <>
      <div className={styles.subheader}>
        <Text italic>{subheader}</Text>
      </div>
      <div>
        <Text className={styles.label} weight="bold">Casting Time:</Text>
        <Text>{castingTime}</Text>
      </div>
      <div>
        <Text className={styles.label} weight="bold">Range:</Text>
        <Text>{range}</Text>
      </div>
      {areaOfEffect && (
        <div>
          <Text className={styles.label} weight="bold">Area of Effect:</Text>
          <AreaOfEffect {...areaOfEffect} />
        </div>
      )}
      <div>
        <Text className={styles.label} weight="bold">Components:</Text>
        <Text>
          <Components
            components={components}
            material={material}
          />
        </Text>
      </div>
      <div>
        <Text className={styles.label} weight="bold">Duration:</Text>
        <Duration
          duration={duration}
          requiresConcentration={requiresConcentration}
        />
      </div>
      <Description description={description} />
      {higherLevel?.length && (
        <HigherLevel text={higherLevel[0]} />
      )}
    </>
  );
};

SpellInfo.propTypes = {
  areaOfEffect: PropTypes.shape({
    size: PropTypes.number.isRequired,
    type: PropTypes.oneOf([
      areas.cone,
      areas.cube,
      areas.cylinder,
      areas.line,
      areas.sphere,
    ]).isRequired,
  }),
  castingTime: PropTypes.string.isRequired,
  classes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  components: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  duration: PropTypes.string.isRequired,
  higherLevel: PropTypes.arrayOf(PropTypes.string),
  level: PropTypes.number.isRequired,
  material: PropTypes.string,
  range: PropTypes.string.isRequired,
  requiresConcentration: PropTypes.bool,
  school: PropTypes.string.isRequired,
};
