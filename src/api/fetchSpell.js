import { apolloClient, gql } from "./apollo";

const generateSpellQuery = gql`
  query Spell($index: String) {
    spell(index: $index) {
      area_of_effect {
        size
        type
      }
      attack_type
      casting_time
      classes {
        name
      }
      components
      concentration
      damage {
        damage_at_character_level {
          damage
          level
        }
        damage_at_slot_level {
          damage
          level
        }
        damage_type {
          name
        }
      }
      dc {
        desc
        success
        type {
          full_name
          name
        }
      }
      desc
      duration
      heal_at_slot_level {
        healing
        level
      }
      higher_level
      index
      level
      material
      name
      range
      ritual
      school {
        name
      }
      subclasses {
        name
      }
    }
  }
`;

export const transformSpell = (spell) => {
  return {
    areaOfEffect: spell.area_of_effect != null
      ? {
        size: spell.area_of_effect.size,
        type: spell.area_of_effect.type,
      }
      : null,
    attackType: spell.attack_type,
    castingTime: spell.casting_time,
    classes: spell.classes,
    components: spell.components,
    damageType: spell?.damage?.damage_type?.name ?? null,
    description: [...spell.desc],
    duration: spell.duration,
    higherLevel: spell.higher_level,
    id: spell.index,
    isRitual: spell.ritual,
    level: spell.level,
    material: spell.material,
    name: spell.name,
    range: spell.range,
    requiresConcentration: spell.concentration,
    saveType: spell?.dc?.type?.name ?? null,
    school: spell.school.name,
    subclasses: spell.subclasses,
  };
};

export const fetchSpell = async (key) => {
  const { data } = await apolloClient.query({
    query: generateSpellQuery,
    variables: {
      index: key,
    },
  });

  return data?.spell ?? null;
};
