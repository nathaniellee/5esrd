import { apolloClient, gql } from './apollo';
import {
  DEFAULT_ORDER,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PER_PAGE,
} from './constants';
import {
  getOrderVariables,
  getPaginationVariables,
} from './utils';

const generateEquipmentsQuery = gql`
  query Equipments($limit: Int, $order: EquipmentOrder, $skip: Int) {
    equipments(limit: $limit, order: $order, skip: $skip) {
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
    }
  }
`;

export const transformEquipment = equipment => ({
  cost: {
    quantity: equipment.cost.quantity,
    unit: equipment.cost.unit,
  },
  equipmentCategory: equipment.equipment_category.index,
  id: equipment.index,
  name: equipment.name,
  weight: equipment.weight,
});

export const fetchEquipments = async (options = {}) => {
  const {
    order = DEFAULT_ORDER,
    pageNumber = DEFAULT_PAGE_NUMBER,
    perPage = DEFAULT_PER_PAGE,
  } = options;
  const variables = getPaginationVariables({ pageNumber, perPage });
  const orderVariables = getOrderVariables(order);

  if (orderVariables) {
    variables.order = orderVariables;
  }

  const { data } = await apolloClient.query({
    query: generateEquipmentsQuery,
    variables,
  });

  return data?.equipments ?? [];
};

// Have to do this for the time being as the GraphQL endpoint doesn't seem to return count as part of the response.
export const fetchTotalEquipmentCount = async () => {
  const url = 'https://www.dnd5eapi.co/api/equipment';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`There was an issue fetching from the equipments endpoint. Response.status: ${response.status}`);
    }

    const json = await response.json();
    return json.count;
  } catch (error) {
    console.error(error.message);
  }
};
