import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Text,
  Title1,
} from '@fluentui/react-components';
import {
  fetchClass,
  transformFullClass,
} from '../api/fetchClasses';
import { classes } from '../constants';
import { classMetadata } from './constants';
import { Traits } from './traits';

export const Class = ({
  id,
}) => {
  const className = classes[id].name;
  const { summary, tagline } = classMetadata[id];
  const [characterClass, setCharacterClass] = useState(null);

  useEffect(() => {
    fetchClass(id).then((klass) => {
      setCharacterClass(transformFullClass(klass));
    });
  }, []);

  return (
    <div>
      <Title1>{className}</Title1>
      <p><Text italic>{tagline}</Text></p>
      <p><Text>{summary}</Text></p>
      {characterClass && (
        <Traits
          hitDie={characterClass.hitDie}
          name={characterClass.name}
          proficiencies={characterClass.proficiencies}
          savingThrows={characterClass.savingThrows}
        />
      )}
    </div>
  );
};

Class.propTypes = {
  id: PropTypes.string.isRequired,
};
