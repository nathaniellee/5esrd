import { apolloClient, gql } from './apollo';
import {
  SORT_DIRECTION,
  SORT_FIELDS,
} from './constants';

const coreFields = gql`
  fragment CoreFields on Class {
    hit_die
    index
    name
  }
`;

const savingThrowsFields = gql`
  fragment SavingThrowsFields on Class {
    saving_throws {
      name
      full_name
      index
    }
  }
`;

const generateClassQuery = gql`
  ${coreFields}
  ${savingThrowsFields}
  query Class($index: String) {
    class(index: $index) {
      ...CoreFields
      ...SavingThrowsFields
      proficiencies {
        name
        index
        type
      }
      proficiency_choices {
        desc
      }
      spellcasting {
        level
        spellcasting_ability {
          name
          full_name
          index
        }
      }
      starting_equipment {
        equipment {
          name
          index
        }
        quantity
      }
      starting_equipment_options {
        desc
      }
    }
  }
`;

const generateClassesQuery = gql`
  ${coreFields}
  ${savingThrowsFields}
  query Classes($order: ClassOrder) {
    classes(order: $order) {
      ...CoreFields
      ...SavingThrowsFields
    }
  }
`;

const getEquipment = (klass) => {
  const granted = klass.starting_equipment.map(({ equipment, quantity }) => {
    if (quantity === 1) {
      return equipment.name;
    }
    return `${quantity} ${equipment.name}s`;
  });
  const options = klass.starting_equipment_options.map(({ desc }) => desc);

  return {
    granted,
    options,
  };
};

const proficiencyTypeMapping = {
  ARMOR: 'armor',
  OTHER: 'tools',
  WEAPONS: 'weapons',
};

const getProficiencies = klass => klass.proficiencies.reduce((acc, { name, type }) => {
  if (type === 'SAVING_THROWS') {
    return acc;
  }
  // Account for the API storing "Light crossbows" as "Crossbows, light".
  acc[proficiencyTypeMapping[type]].push(name === 'Crossbows, light' ? 'Light crossbows' : name);
  return acc;
}, {
  armor: [],
  skills: klass.proficiency_choices[0].desc,
  tools: [],
  weapons: [],
});

const getSavingThrows = savingThrows => savingThrows.map((save) => save.full_name);

const getSpellcastingAbility = spellcasting => spellcasting
  ? spellcasting.spellcasting_ability.full_name
  : null;

export const transformCoreClass = klass => ({
  hitDie: klass.hit_die,
  id: klass.index,
  name: klass.name,
  savingThrows: getSavingThrows(klass.saving_throws),
});

export const transformFullClass = (klass) => {
  const core = transformCoreClass(klass);
  return {
    ...core,
    proficiencies: getProficiencies(klass),
    spellcastingAbility: getSpellcastingAbility(klass.spellcasting),
    startingEquipment: getEquipment(klass),
  };
};

export const fetchClass = async (index) => {
  const { data } = await apolloClient.query({
    query: generateClassQuery,
    variables: {
      index,
    },
  });
  return data?.class ?? null;
};

export const fetchClasses = async () => {
  const { data } = await apolloClient.query({
    query: generateClassesQuery,
    variables: {
      order: {
        by: SORT_FIELDS.name,
        direction: SORT_DIRECTION.ascending,
      },
    },
  });
  return data?.classes ?? [];
};
