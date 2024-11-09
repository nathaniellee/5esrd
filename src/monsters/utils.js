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

export const getCRString = ({ challengeRating, xp }) => {
  const cr = getChallengeRating(challengeRating);
  return `${cr} (${xp} XP)`;
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
