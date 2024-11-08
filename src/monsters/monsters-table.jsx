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
import { Paginator } from '../common/paginator';
import {
  creatureSizes,
  creatureTypes,
} from '../constants';

const useStyles = makeStyles({
  th: {
    fontWeight: tokens.fontWeightBold,
  },
});

const columns = [
  { columnKey: 'name', label: 'Name' },
  { columnKey: 'challengeRating', label: 'CR' },
  { columnKey: 'armorClass', label: 'AC' },
  { columnKey: 'hitPoints', label: 'Hit Points (Formula)' },
  { columnKey: 'type', label: 'Type' },
  { columnKey: 'size', label: 'Size' },
];

export const getHitPointsString = ({ hitPoints, hitPointsFormula }) => `${hitPoints} (${hitPointsFormula})`;

export const MonstersTable = ({
  monsters,
  onNextPage,
  onPrevPage,
  pageNumber,
  perPage,
  totalMonsterCount = 0,
}) => {
  const styles = useStyles();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(({ columnKey, label }) => (
              <TableHeaderCell
                key={columnKey}
                className={styles.th}
              >
                {label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {monsters.map(monster => (
            <TableRow
              key={monster.id}
            >
              <TableCell>{monster.name}</TableCell>
              <TableCell>{monster.challengeRating}</TableCell>
              <TableCell>{monster.armorClass}</TableCell>
              <TableCell>
                {getHitPointsString({
                  hitPoints: monster.hitPoints,
                  hitPointsFormula: monster.hitPointsFormula,
                })}
              </TableCell>
              <TableCell>{creatureTypes[monster.type]}</TableCell>
              <TableCell>{creatureSizes[monster.size]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Paginator
        onClickNext={onNextPage}
        onClickPrev={onPrevPage}
        pageNumber={pageNumber}
        perPage={perPage}
        totalCount={totalMonsterCount}
      />
    </div>
  );
};

MonstersTable.propTypes = {
  monsters: PropTypes.arrayOf(PropTypes.shape({
    armorClass: PropTypes.number.isRequired,
    challengeRating: PropTypes.number.isRequired,
    hitPoints: PropTypes.number.isRequired,
    hitPointsFormula: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.oneOf(Object.keys(creatureSizes)).isRequired,
    type: PropTypes.oneOf(Object.keys(creatureTypes)).isRequired,
  })),
  onNextPage: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalMonsterCount: PropTypes.number,
};
