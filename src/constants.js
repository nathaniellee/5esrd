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

export const equipmentCategories = {
  'adventuring-gear': 'Adventuring Gear',
  armor: 'Armor',
  'mounts-and-vehicles': 'Mounts and Vehicles',
  tools: 'Tools',
  weapon: 'Weapons',
};

export const currencies = {
  CP: 'cp',
  EP: 'ep',
  GP: 'gp',
  PP: 'pp',
  SP: 'sp',
};
