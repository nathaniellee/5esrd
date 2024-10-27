import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { Components } from './components';
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
      <>
        {description.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </>
      {higherLevel?.length && (
        <HigherLevel text={higherLevel[0]} />
      )}
    </>
  );
};

SpellInfo.propTypes = {
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
