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
  currencies,
  equipmentCategories,
} from '../constants';

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

const getCostString = (quantity, unit) => {
  if (quantity === 0) {
    return '--';
  }
  return `${quantity} ${currencies[unit]}`;
};

const getWeightString = (weight) => {
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

  const [sortDirection, setSortDirection] = useState('ascending');
  const [sortedColumn, setSortedColumn] = useState(sortableColumns[0]);

  const onClickTableHeaderCell = useCallback((columnKey) => {
    if (columnKey !== sortedColumn) {
      setSortedColumn(columnKey);
      setSortDirection('ascending');
      onChangeSort({
        columnKey,
        sortDirection: 'ascending',
      });
    } else {
      const newSortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
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
