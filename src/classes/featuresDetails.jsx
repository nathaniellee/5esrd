import PropTypes from 'prop-types';
import React from 'react';
import {
  Subtitle1,
  Text,
  Title2,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  feature: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalM,
  },
  featureTitle: {
    marginBottom: tokens.spacingVerticalS,
  },
  marginTop: {
    marginTop: tokens.spacingVerticalL,
  },
});

const orderedLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const FeatureDetails = ({
  description,
  level,
  name,
}) => {
  const styles = useStyles();
  const title = `Level ${level}: ${name}`;

  return (
    <div className={styles.feature}>
      <Subtitle1 className={styles.featureTitle}>{title}</Subtitle1>
      <Text>{description}</Text>
    </div>
  );
};

FeatureDetails.propTypes = {
  description: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export const FeaturesDetails = ({
  classLevels,
  className,
}) => {
  const styles = useStyles();
  const title = `${className} Class Features`;

  return (
    <div className={`FeaturesDetails ${styles.marginTop}`}>
      <Title2>{title}</Title2>
      {orderedLevels.map((lvl) => {
        const { features, level } = classLevels[lvl];
        return features.map(({ description, name }) => (
          <FeatureDetails
            description={description}
            key={`${level}-${name}`}
            level={level}
            name={name}
          />
        ));
      })}
    </div>
  );
};

FeaturesDetails.propTypes = {
  classLevels: PropTypes.objectOf(PropTypes.shape({
    features: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    level: PropTypes.number.isRequired,
    proficiencyBonus: PropTypes.number.isRequired,
  })).isRequired,
  className: PropTypes.string.isRequired,
};
