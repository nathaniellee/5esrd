import { apolloClient, gql } from './apollo';

const generateMonsterQuery = gql`
  query Monster($index: String) {
    monster(index: $index) {
      alignment
      armor_class {
        desc
        type
        value
      }
      challenge_rating
      charisma
      condition_immunities {
        index
        name
      }
      constitution
      damage_immunities
      damage_resistances
      damage_vulnerabilities
      dexterity
      hit_dice
      hit_points
      hit_points_roll
      index
      intelligence
      languages
      name
      proficiencies {
        proficiency {
          index
          name
        }
        value
      }
      proficiency_bonus
      senses {
        blindsight
        darkvision
        passive_perception
        tremorsense
        truesight
      }
      size
      speed {
        burrow
        climb
        fly
        hover
        swim
        walk
      }
      strength
      subtype
      type
      wisdom
      xp
    }
  }
`;

export const transformMonster = (monster) => {
  return {
    armorClass: monster.armor_class[0].value,
    challengeRating: monster.challenge_rating,
    hitPoints: monster.hit_points,
    hitPointsFormula: monster.hit_points_roll,
    id: monster.index,
    name: monster.name,
    size: monster.size,
    subtype: monster.subtype,
    type: monster.type,
  };
};

export const fetchMonster = async (key) => {
  const { data } = await apolloClient.query({
    query: generateMonsterQuery,
    variables: {
      index: key,
    },
  });

  return data?.monster ?? null;
};
