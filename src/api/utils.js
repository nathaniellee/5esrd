import {
  SORT_DIRECTION,
  SORT_FIELDS,
} from './constants';

export const getOrderVariables = ([first, ...rest] = []) => {
  if (!first) {
    return;
  }

  const variables = {
    by: SORT_FIELDS[first.by],
    direction: SORT_DIRECTION[first.direction],
  };

  return rest.length === 0
    ? variables
    : {
      ...variables,
      then_by: getOrderVariables(rest),
    };
};

export const getPaginationVariables = ({ pageNumber, perPage }) => {
  const limit = perPage < 1
    ? 20
    : perPage;
  const skip = pageNumber < 2
    ? 0
    : (pageNumber - 1) * limit;

  return {
    limit,
    skip,
  };
};
