import PropTypes from 'prop-types';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  th: {
    fontWeight: tokens.fontWeightBold,
  },
});

const orderedLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const FeaturesTableRow = ({ classLevel }) => {
  return (
    <TableRow>
      <TableCell>{classLevel.level}</TableCell>
      <TableCell>{classLevel.proficiencyBonus}</TableCell>
      <TableCell>{classLevel.features.map(({ name }) => name).join(', ')}</TableCell>
    </TableRow>
  );
};

FeaturesTableRow.propTypes = {
  classLevel: PropTypes.shape({
    features: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
    level: PropTypes.number.isRequired,
    proficiencyBonus: PropTypes.number.isRequired,
  }).isRequired,
};

export const FeaturesTable = ({ classLevels }) => {
  const styles = useStyles();
  return (
    <div className="FeaturesTable">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell className={styles.th}>Level</TableHeaderCell>
            <TableHeaderCell className={styles.th}>Proficiency Bonus</TableHeaderCell>
            <TableHeaderCell className={styles.th}>Class Features</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderedLevels.map(level => (
            <FeaturesTableRow
              classLevel={classLevels[level]}
              key={level}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

FeaturesTable.propTypes = {
  classLevels: PropTypes.objectOf(PropTypes.shape({
    features: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    level: PropTypes.number.isRequired,
    proficiencyBonus: PropTypes.number.isRequired,
  })).isRequired,
};
