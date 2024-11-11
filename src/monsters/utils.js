import { damageTypes } from "../constants";

export const getChallengeRating = (challengeRating) => {
  if (challengeRating === 0.125) {
    return '1/8';
  }
  if (challengeRating === 0.25) {
    return '1/4';
  }
  if (challengeRating === 0.5) {
    return '1/2';
  }
  return challengeRating;
};

export const getCRString = ({ challengeRating, proficiencyBonus, xp }) => {
  const cr = getChallengeRating(challengeRating);
  return `${cr} (XP ${xp}; PB ${proficiencyBonus})`;
};

export const getDamageAdjustmentString = (adjustments) => {
  const formattedAdjustments = adjustments.map((adjustment) => {
    if (!adjustment.includes(' ')) {
      return damageTypes[adjustment];
    }

    let formattedAdjustment = adjustment;

    Object.entries(damageTypes).forEach(([key, value]) => formattedAdjustment = formattedAdjustment.replace(key, value));
    return formattedAdjustment;
  });
  return formattedAdjustments.join('; ');
};

export const getHitPointsString = ({ hitPoints, hitPointsFormula }) => `${hitPoints} (${hitPointsFormula})`;

export const getSpeedString = ({
  burrow,
  climb,
  fly,
  hover,
  swim,
  walk,
}) => {
  let speeds = [walk];

  if (burrow) {
    speeds.push(`Burrow ${burrow}`);
  }

  if (climb) {
    speeds.push(`Climb ${climb}`);
  }

  if (fly) {
    speeds.push(`Fly ${fly}${hover ? ' (Hover)' : ''}`);
  }

  if (swim) {
    speeds.push(`Swim ${swim}`);
  }

  return speeds.join(', ');
};
