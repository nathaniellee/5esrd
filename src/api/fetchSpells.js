import { apolloClient, gql } from "./apollo";

const generateQuery = gql`
  query Spells($limit: Int, $order: SpellOrder, $skip: Int) {
    spells(limit: $limit, order: $order, skip: $skip) {
      index
      level
      name
      school {
        name
      }
      components
      ritual
      casting_time
      duration
      concentration
      range
      area_of_effect {
        size
        type
      }
      dc {
        type {
          name
        }
      }
      attack_type
      damage {
        damage_type {
          name
        }
      }
    }
  }
`;

export const transformSpell = spell => ({
  areaOfEffect: spell.area_of_effect != null
    ? {
      size: spell.area_of_effect.size,
      type: spell.area_of_effect.type,
    }
    : null,
  attackType: spell.attack_type,
  castingTime: spell.casting_time,
  components: spell.components.join(', '),
  damageType: spell.damage != null
    ? spell.damage.damage_type.name
    : null,
  duration: spell.duration,
  id: spell.index,
  isRitual: spell.ritual,
  level: spell.level,
  name: spell.name,
  range: spell.range,
  requiresConcentration: spell.concentration,
  saveType: spell.dc != null
    ? spell.dc.type.name
    : null,
  school: spell.school.name,
});

export const fetchSpells = async () => {
  const { data } = await apolloClient.query({ query: generateQuery });
  return data?.spells ?? [];
};
