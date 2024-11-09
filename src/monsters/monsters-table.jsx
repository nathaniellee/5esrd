import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
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
  sortDirections,
} from '../constants';
import {
  getChallengeRating,
  getHitPointsString,
} from './utils';

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
const sortableColumns = [
  'name',
  'challengeRating',
  'armorClass',
  'type',
  'size',
];
const isSortableColumn = columnKey => sortableColumns.includes(columnKey);

export const MonstersTable = ({
  monsters,
  onChangeSort,
  onNextPage,
  onPrevPage,
  onSelectMonster,
  pageNumber,
  perPage,
  totalMonsterCount = 0,
}) => {
  const styles = useStyles();

  const [sortDirection, setSortDirection] = useState(sortDirections.ascending);
  const [sortedColumn, setSortedColumn] = useState(sortableColumns[0]);

  const onClickTableHeaderCell = useCallback((columnKey) => {
    if (columnKey !== sortedColumn) {
      setSortedColumn(columnKey);
      setSortDirection(sortDirections.ascending);
      onChangeSort({
        columnKey,
        sortDirection: sortDirections.ascending,
      });
    } else {
      const newSortDirection = sortDirection === sortDirections.ascending ? sortDirections.descending : sortDirections.ascending;
      setSortDirection(newSortDirection);
      onChangeSort({
        columnKey,
        sortDirection: newSortDirection,
      })
    }
  }, [sortDirection, sortedColumn]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(({ columnKey, label }) => (
              <TableHeaderCell
                key={columnKey}
                className={styles.th}
                onClick={() => {
                  if (isSortableColumn(columnKey)) {
                    onClickTableHeaderCell(columnKey);
                  }
                }}
                sortDirection={sortedColumn === columnKey ? sortDirection : undefined}
                sortable={isSortableColumn(columnKey)}
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
              onClick={() => { onSelectMonster(monster.id) }}
            >
              <TableCell>{monster.name}</TableCell>
              <TableCell>{getChallengeRating(monster.challengeRating)}</TableCell>
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
  onChangeSort: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onSelectMonster: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalMonsterCount: PropTypes.number,
};
