import { currencies } from "../constants";

export const getCostString = (quantity, unit) => {
  if (quantity === 0) {
    return '--';
  }
  return `${quantity} ${currencies[unit]}`;
};

export const getWeightString = (weight) => {
  if (!weight || Number.isNaN(weight)) {
    return '--';
  }
  if (weight === 1) {
    return '1 lb.';
  }
  
  const integer = Number.parseInt(weight);
  const decimal = weight - integer;

  if (decimal === 0.25) {
    return integer === 0
      ? '1/4 lbs.'
      : `${integer} 1/4 lbs.`;
  }
  if (decimal === 0.5) {
    return integer === 0
      ? '1/2 lbs.'
      : `${integer} 1/2 lbs.`;
  }

  return `${weight} lbs.`;
};
