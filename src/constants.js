export const sortDirections = {
  ascending: 'ascending',
  descending: 'descending',
};

export const classes = {
  barbarian: {
    id: 'barbarian',
    name: 'Barbarian',
  },
  bard: {
    id: 'bard',
    name: 'Bard',
  },
  cleric: {
    id: 'cleric',
    name: 'Cleric',
  },
  druid: {
    id: 'druid',
    name: 'Druid',
  },
  fighter: {
    id: 'fighter',
    name: 'Fighter',
  },
  monk: {
    id: 'monk',
    name: 'Monk',
  },
  paladin: {
    id: 'paladin',
    name: 'Paladin',
  },
  ranger: {
    id: 'ranger',
    name: 'Ranger',
  },
  rogue: {
    id: 'rogue',
    name: 'Rogue',
  },
  sorcerer: {
    id: 'sorcerer',
    name: 'Sorcerer',
  },
  warlock: {
    id: 'warlock',
    name: 'Warlock',
  },
  wizard: {
    id: 'wizard',
    name: 'Wizard',
  },
};

const areasMapping = {
  cone: {
    enum: 'CONE',
    string: 'Cone',
  },
  cube: {
    enum: 'CUBE',
    string: 'Cube',
  },
  cylinder: {
    enum: 'CYLINDER',
    string: 'Cylinder',
  },
  line: {
    enum: 'LINE',
    string: 'Line',
  },
  sphere: {
    enum: 'SPHERE',
    string: 'Sphere',
  },
};

export const areas = Object.entries(areasMapping).reduce((acc, [key, value]) => ({
  ...acc,
  [key]: value.enum,
}), {});

export const areaStrings = Object.entries(areasMapping).reduce((acc, [key, value]) => ({
  ...acc,
  [value.enum]: value.string,
}), {});

export const attackTypes = [
  'MELEE',
  'RANGED',
];

export const attackTypesMapping = {
  MELEE: 'Melee',
  RANGED: 'Ranged',
};

export const damageTypes = {
  acid: 'Acid',
  bludgeoning: 'Bludgeoning',
  cold: 'Cold',
  fire: 'Fire',
  force: 'Force',
  lightning: 'Lightning',
  necrotic: 'Necrotic',
  piercing: 'Piercing',
  poison: 'Poison',
  psychic: 'Psychic',
  radiant: 'Radiant',
  slashing: 'Slashing',
  thunder: 'Thunder',
};

export const spellLevels = [
  'Cantrip',
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
  '6th',
  '7th',
  '8th',
  '9th',
];

export const creatureSizes = {
  GARGANTUAN: 'Gargantuan',
  HUGE: 'Huge',
  LARGE: 'Large',
  MEDIUM: 'Medium',
  SMALL: 'Small',
  TINY: 'Tiny',
};

export const creatureTypes = {
  ABERRATION: 'Aberration',
  BEAST: 'Beast',
  CELESTIAL: 'Celestial',
  CONSTRUCT: 'Construct',
  DRAGON: 'Dragon',
  ELEMENTAL: 'Elemental',
  FEY: 'Fey',
  FIEND: 'Fiend',
  GIANT: 'Giant',
  HUMANOID: 'Humanoid',
  MONSTROSITY: 'Monstrosity',
  OOZE: 'Ooze',
  PLANT: 'Plant',
  SWARM: 'Swarm',
  UNDEAD: 'Undead',
};

export const abilityScores = {
  charisma: 'CHA',
  constitution: 'CON',
  dexterity: 'DEX',
  intelligence: 'INT',
  strength: 'STR',
  wisdom: 'WIS',
};

export const equipmentCategories = {
  'adventuring-gear': 'Adventuring Gear',
  armor: 'Armor',
  'mounts-and-vehicles': 'Mount/Vehicle',
  tools: 'Tool',
  weapon: 'Weapon',
};

export const currencies = {
  CP: 'cp',
  EP: 'ep',
  GP: 'gp',
  PP: 'pp',
  SP: 'sp',
};

export const armorCategories = {
  'heavy-armor': 'Heavy Armor',
  'light-armor': 'Light Armor',
  'medium-armor': 'Medium Armor',
};

export const toolCategories = {
  'artisans-tools': "Artisan's Tool",
  'gaming-sets': 'Gaming Set',
  'musical-instruments': 'Musical Instrument',
  'other-tools': 'Tool',
};
