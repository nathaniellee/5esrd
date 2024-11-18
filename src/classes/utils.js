export const armorMapping = {
  'Light Armor': 'Light',
  'Medium Armor': 'Medium',
};

export const getArmorString = (armor) => {
  if (armor.length === 0) {
    return 'None';
  }

  if (armor.includes('All armor')) {
    return 'Light, Medium, and Heavy armor and Shields';
  }

  const categorizedArmor = armor.filter(a => a !== 'Shields').map(a => armorMapping[a]);
  const armorString = `${categorizedArmor.join(' and ')} armor`;

  return armor.includes('Shields')
    ? `${armorString} and Shields`
    : armorString;
};

export const getHitDieString = (hitDie, name) => `D${hitDie} per ${name} level`;

export const getSavingThrowString = (savingThrows) => savingThrows.join(' and ');

export const weaponsMapping = {
  'Martial Weapons': 'Martial',
  'Simple Weapons': 'Simple',
};

export const getWeaponsString = (weapons) => {
  if (weapons.includes('Martial Weapons')) {
    // If the class includes martial weapons proficiency, it also includes simple weapons proficiency.
    return 'Simple and Martial weapons';
  }

  const simpleWeaponsIndex = weapons.findIndex((weapon) => weapon === 'Simple Weapons');

  if (simpleWeaponsIndex === -1) {
    return weapons.join(', ');
  }

  if (weapons.length === 1) {
    return 'Simple weapons';
  }

  const individualWeapons = weapons.toSpliced(simpleWeaponsIndex, 1);
  return `Simple weapons, ${individualWeapons.join(', ')}`;
};
