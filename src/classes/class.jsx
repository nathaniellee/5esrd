import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Subtitle1,
  Title1,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  fetchClass,
  transformFullClass,
} from '../api/fetchClasses';
import { classes } from '../constants';
import { FeaturesTable } from './featuresTable';
import { Traits } from './traits';

const useStyles = makeStyles({
  marginTop: {
    marginTop: tokens.spacingVerticalL,
  },
});

export const Class = ({
  id,
}) => {
  const styles = useStyles();
  const className = classes[id].name;
  const [characterClass, setCharacterClass] = useState(null);
  const traitsTitle = `${className} Traits`;
  const featuresTableTitle = `${className} Class Features`;

  useEffect(() => {
    fetchClass(id).then((klass) => {
      setCharacterClass(transformFullClass(klass));
    });
  }, [id]);

  return (
    <div>
      <Title1>{className}</Title1>
      {characterClass && (
        <div className={styles.marginTop}>
          <Subtitle1>{traitsTitle}</Subtitle1>
          <Traits
            hitDie={characterClass.hitDie}
            name={characterClass.name}
            proficiencies={characterClass.proficiencies}
            savingThrows={characterClass.savingThrows}
            startingEquipment={characterClass.startingEquipment}
          />
          <div className={styles.marginTop}>
            <Subtitle1>{featuresTableTitle}</Subtitle1>
            <FeaturesTable classLevels={characterClass.classLevels} />
          </div>
        </div>
      )}
    </div>
  );
};

Class.propTypes = {
  id: PropTypes.string.isRequired,
};
