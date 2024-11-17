import { apolloClient, gql } from './apollo';

const generateClassesQuery = gql`
  query Classes {
    classes {
      hit_die
      index
      name
      proficiencies {
        name
        index
        type
      }
      proficiency_choices {
        desc
      }
      saving_throws {
        name
        full_name
        index
      }
      spellcasting {
        level
        spellcasting_ability {
          name
          full_name
          index
        }
      }
    }
  }
`;

const proficiencyTypeMapping = {
  ARMOR: 'armor',
  OTHER: 'tools',
  WEAPONS: 'weapons',
};

const getProficiencies = klass => klass.proficiencies.reduce((acc, { name, type }) => {
  if (type === 'SAVING_THROWS') {
    return acc;
  }
  acc[proficiencyTypeMapping[type]].push(name);
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

export const transformClasses = klass => ({
  hitDie: klass.hit_die,
  id: klass.index,
  name: klass.name,
  proficiencies: getProficiencies(klass),
  savingThrows: getSavingThrows(klass.saving_throws),
  spellcastingAbility: getSpellcastingAbility(klass.spellcasting),
});

export const fetchClasses = async () => {
  const { data } = await apolloClient.query({
    query: generateClassesQuery,
  });
  return data?.classes ?? [];
};
