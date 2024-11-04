import PropTypes from 'prop-types';
import React, { useCallback, useContext, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Tooltip,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  areas,
  attackTypes,
  attackTypesMapping,
  sortDirections,
  spellLevels,
} from '../constants';
import { Paginator } from '../common/paginator';
import { SpellsLoadingContext } from '../contexts';
import { AreaOfEffect } from './area-of-effect';

const useStyles = makeStyles({
  concentration: {
    cursor: 'default',
    display: 'inline-block',
    marginLeft: '5px',
  },
  th: {
    fontWeight: tokens.fontWeightBold,
  },
});

const getAttackSave = ({ attackType, saveType }) => {
  if (attackType) {
    return attackTypesMapping[attackType];
  }
  
  if (saveType) {
    return `${saveType} Save`;
  }

  return '';
};

const DurationCellContent = ({ duration, requiresConcentration }) => {
  const styles = useStyles();
  
  if (!requiresConcentration) {
    return duration;
  }

  const concentrationDescription = 'This spell requires Concentration to remain active. If the spellcaster loses Concentration, the spell ends. The spellcaster can end Concentration at any time (no action required).';
  return (
    <>
      {duration}
      <Tooltip
        content={concentrationDescription}
        relationship="label"
        withArrow
      >
        <span className={styles.concentration}>&copy;</span>
      </Tooltip>
    </>
  );
};

DurationCellContent.propTypes = {
  duration: PropTypes.string.isRequired,
  requiresConcentration: PropTypes.bool.isRequired,
};

const columns = [
  { columnKey: 'name', label: 'Name' },
  { columnKey: 'level', label: 'Level' },
  { columnKey: 'school', label: 'Spell School' },
  { columnKey: 'castingTime', label: 'Casting Time' },
  { columnKey: 'duration', label: 'Duration' },
  { columnKey: 'range', label: 'Range' },
  { columnKey: 'areaOfEffect', label: 'Area of Effect' },
  { columnKey: 'attackSave', label: 'Attack/Save' },
];
const sortableColumns = [
  'name',
  'level',
  'school',
];
const isSortableColumn = columnKey => sortableColumns.includes(columnKey);

export const SpellsTable = ({
  onChangeSort,
  onNextPage,
  onPrevPage,
  onSelectSpell,
  pageNumber,
  perPage,
  spells,
  totalSpellCount = 0,
}) => {
  const styles = useStyles();
  const isPaginationControlsDisabled = useContext(SpellsLoadingContext);

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
      <Table sortable>
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
          {spells.map((spell) => {
            return (
              <TableRow
                key={spell.id}
                onClick={() => { onSelectSpell(spell.id); }}
              >
                <TableCell>{spell.name}</TableCell>
                <TableCell>{spellLevels[spell.level]}</TableCell>
                <TableCell>{spell.school}</TableCell>
                <TableCell>{spell.castingTime}</TableCell>
                <TableCell>
                  <DurationCellContent
                    duration={spell.duration}
                    requiresConcentration={spell.requiresConcentration}
                  />
                </TableCell>
                <TableCell>{spell.range}</TableCell>
                <TableCell>
                  {spell.areaOfEffect && (
                    <AreaOfEffect {...spell.areaOfEffect} />
                  )}
                </TableCell>
                <TableCell>
                  {getAttackSave({
                    attackType: spell.attackType,
                    saveType: spell.saveType,
                  })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Paginator
        isDisabled={isPaginationControlsDisabled}
        onClickNext={onNextPage}
        onClickPrev={onPrevPage}
        pageNumber={pageNumber}
        perPage={perPage}
        totalCount={totalSpellCount}
      />
    </div>
  );
};

SpellsTable.propTypes = {
  onChangeSort: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onSelectSpell: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  spells: PropTypes.arrayOf(PropTypes.shape({
    areaOfEffect: PropTypes.shape({
      size: PropTypes.number.isRequired,
      type: PropTypes.oneOf([
        areas.cone,
        areas.cube,
        areas.cylinder,
        areas.line,
        areas.sphere,
      ]).isRequired,
    }),
    attackType: PropTypes.oneOf(attackTypes),
    castingTime: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isRitual: PropTypes.bool.isRequired,
    level: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    range: PropTypes.string.isRequired,
    requiresConcentration: PropTypes.bool.isRequired,
    school: PropTypes.string.isRequired,
  })),
  totalSpellCount: PropTypes.number,
};
