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
          type
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

const transformProficiencies = proficiencies => proficiencies.reduce((acc, { proficiency }) => {
  const value = proficiency.name.split(': ')[1];

  if (proficiency.type === 'SKILLS') {
    acc.skills.push(value);
  } else {
    acc.savingThrows.push(value);
  }

  return acc;
}, { savingThrows: [], skills: [] });

export const transformMonster = (monster) => {
  return {
    alignment: monster.alignment,
    armorClass: monster.armor_class[0].value,
    challengeRating: monster.challenge_rating,
    charisma: monster.charisma,
    constitution: monster.constitution,
    damageImmunities: monster.damage_immunities,
    damageResistances: monster.damage_resistances,
    damageVulnerabilities: monster.damage_vulnerabilities,
    dexterity: monster.dexterity,
    hitPoints: monster.hit_points,
    hitPointsFormula: monster.hit_points_roll,
    id: monster.index,
    intelligence: monster.intelligence,
    languages: monster.languages,
    name: monster.name,
    proficiencies: transformProficiencies(monster.proficiencies),
    proficiencyBonus: monster.proficiency_bonus,
    size: monster.size,
    speed: {
      burrow: monster.speed.burrow,
      climb: monster.speed.climb,
      fly: monster.speed.fly,
      hover: monster.speed.hover,
      swim: monster.speed.swim,
      walk: monster.speed.walk,
    },
    strength: monster.strength,
    subtype: monster.subtype,
    type: monster.type,
    wisdom: monster.wisdom,
    xp: monster.xp,
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
