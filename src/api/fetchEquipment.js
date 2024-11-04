import { apolloClient, gql } from './apollo';

const generateEquipmentQuery = gql`
  query Equipment($index: String) {
    equipment(index: $index) {
      index
      name
      cost {
        unit
        quantity
      }
      desc
      equipment_category {
        index
      }
      weight
      ... on Tool {
        tool_category {
          index
        }
      }
      ... on Gear {
        gear_category {
          index
        }
      }
      ... on Pack {
        contents {
          item {
            index
          }
          quantity
        }
        gear_category {
          index
        }
      }
      ... on Weapon {
        damage {
          damage_dice
          damage_type {
            index
          }
        }
      }
      ... on Ammunition {
        gear_category {
          index
        }
        quantity
      }
      ... on Armor {
        armor_category {
          index
        }
        armor_class {
          base
          dex_bonus
          max_bonus
        }
        stealth_disadvantage
        str_minimum
      }
      ... on Vehicle {
        capacity
        speed {
          quantity
          unit
        }
        vehicle_category {
          index
        }
      }
    }
  }
`;

export const fetchEquipment = async (key) => {
  const { data } = await apolloClient.query({
    query: generateEquipmentQuery,
    variables: {
      index: key,
    },
  });

  return data?.equipment ?? null;
};

export const transformEquipment = equipment => ({
  armorCategory: equipment?.armor_category?.index ?? null,
  armorClass: equipment.armor_class
    ? {
      base: equipment.armor_class.base,
      dexBonus: equipment.armor_class.dex_bonus,
      maxBonus: equipment.armor_class.max_bonus,
    }
    : null,
  capacity: equipment.capacity,
  cost: {
    quantity: equipment.cost.quantity,
    unit: equipment.cost.unit,
  },
  damage: equipment.damage
    ? {
      damageDice: equipment.damage.damage_dice,
      damageType: equipment.damage.damage_type.index,
    }
    : null,
  description: equipment.desc ? [...equipment.desc] : [],
  equipmentCategory: equipment.equipment_category.index,
  gearCategory: equipment?.gear_category?.index ?? null,
  id: equipment.index,
  name: equipment.name,
  quantity: equipment.quantity,
  speed: equipment.speed
    ? {
      quantity: equipment.speed.quantity,
      unit: equipment.speed.unit,
    }
    : null,
  stealthDisadvantage: equipment.steal_disadvantage,
  strengthMinimum: equipment.str_minimum,
  toolCategory: equipment?.tool_category?.index ?? null,
  vehicleCategory: equipment?.vehicle_category?.index ?? null,
  weight: equipment.weight,
});
