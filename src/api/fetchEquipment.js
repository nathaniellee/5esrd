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
          name
        }
      }
      ... on Gear {
        gear_category {
          index
          name
        }
      }
      ... on Pack {
        contents {
          item {
            index
            name
          }
          quantity
        }
        gear_category {
          index
          name
        }
      }
      ... on Weapon {
        damage {
          damage_dice
          damage_type {
            index
            name
          }
        }
      }
      ... on Ammunition {
        gear_category {
          index
          name
        }
        quantity
      }
      ... on Armor {
        armor_category {
          index
          name
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
          name
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
  cost: {
    quantity: equipment.cost.quantity,
    unit: equipment.cost.unit,
  },
  description: equipment.desc ? [...equipment.desc] : [],
  equipmentCategory: equipment.equipment_category.index,
  id: equipment.index,
  name: equipment.name,
  weight: equipment.weight,
});
