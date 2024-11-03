import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Title1,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { Paginator } from '../common/paginator';
import {
  equipmentCategories,
  sortDirections,
} from '../constants';
import {
  getCostString,
  getWeightString,
} from './utils';

const useStyles = makeStyles({
  th: {
    fontWeight: tokens.fontWeightBold,
  },
});

const columns = [
  { columnKey: 'name', label: 'Name' },
  { columnKey: 'cost', label: 'Cost' },
  { columnKey: 'weight', label: 'Weight' },
  { columnKey: 'equipmentCategory', label: 'Category' },
];
const sortableColumns = [
  'name',
  'weight',
  'equipmentCategory',
];
const isSortableColumn = columnKey => sortableColumns.includes(columnKey);

export const EquipmentTable = ({
  equipments,
  onChangeSort,
  onNextPage,
  onPrevPage,
  pageNumber,
  perPage,
  totalEquipmentCount = 0,
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
      <Title1>Equipment</Title1>
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
          {equipments.map(equipment => (
            <TableRow key={equipment.id}>
              <TableCell>{equipment.name}</TableCell>
              <TableCell>{getCostString(equipment.cost.quantity, equipment.cost.unit)}</TableCell>
              <TableCell>{getWeightString(equipment.weight)}</TableCell>
              <TableCell>{equipmentCategories[equipment.equipmentCategory]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Paginator
        onClickNext={onNextPage}
        onClickPrev={onPrevPage}
        pageNumber={pageNumber}
        perPage={perPage}
        totalCount={totalEquipmentCount}
      />
    </div>
  );
};

EquipmentTable.propTypes = {
  equipments: PropTypes.arrayOf(PropTypes.shape({
    cost: PropTypes.shape({
      quantity: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    weight: PropTypes.number,
  })).isRequired,
  onChangeSort: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalEquipmentCount: PropTypes.number,
};
