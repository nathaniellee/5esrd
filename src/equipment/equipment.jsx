import React, { useCallback, useEffect, useState } from 'react';
import { Title1 } from '@fluentui/react-components';
import {
  DEFAULT_ORDER,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PER_PAGE,
} from '../api/constants';
import {
  fetchEquipment,
  transformEquipment as transformDialogEquipment,
} from '../api/fetchEquipment';
import {
  fetchEquipments,
  fetchTotalEquipmentCount,
  transformEquipment,
} from '../api/fetchEquipments';
import { EquipmentDialog } from './equipment-dialog';
import { EquipmentTable } from './equipment-table';

export const Equipment = () => {
  const [equipment, setEquipment] = useState();
  const [equipments, setEquipments] = useState([]);
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [totalEquipmentCount, setTotalEquipmentCount] = useState(0);
  const [showEquipmentDialog, setShowEquipmentDialog] = useState(false);

  const perPage = DEFAULT_PER_PAGE;

  const onChangeSort = useCallback(({ columnKey, sortDirection }) => {
    const newOrder = [{
      by: columnKey,
      direction: sortDirection,
    }];

    if (columnKey !== 'name') {
      newOrder.push({
        by: 'name',
        direction: sortDirection,
      });
    }
    setOrder(newOrder);
    setPageNumber(DEFAULT_PAGE_NUMBER);
    fetchEquipments({
      order: newOrder,
      pageNumber: DEFAULT_PAGE_NUMBER,
      perPage,
    }).then(onDoneFetchEquipments);
  });

  const onDoneFetchEquipments = useCallback((equipments) => {
    setEquipments(equipments.map(transformEquipment));
  }, []);

  const onNextPage = useCallback(() => {
    const newPageNumber = pageNumber + 1;
    setPageNumber(newPageNumber);
    fetchEquipments({
      order,
      pageNumber: newPageNumber,
      perPage,
    }).then(onDoneFetchEquipments);
  }, [order, pageNumber, perPage]);

  const onPrevPage = useCallback(() => {
    const newPageNumber = pageNumber - 1;
    setPageNumber(newPageNumber);
    fetchEquipments({
      order,
      pageNumber: newPageNumber,
      perPage,
    }).then(onDoneFetchEquipments);
  }, [order, pageNumber, perPage]);

  const onSelectEquipment = useCallback((id) => {
    fetchEquipment(id).then((equipment) => {
      setEquipment(transformDialogEquipment(equipment));
      setShowEquipmentDialog(true);
    });
  }, []);

  const onCloseEquipmentDialog = useCallback(() => {
    setShowEquipmentDialog(false);
  }, []);

  useEffect(() => {
    fetchTotalEquipmentCount().then((count) => {
      setTotalEquipmentCount(count);
      fetchEquipments({
        pageNumber: DEFAULT_PAGE_NUMBER,
        perPage,
      }).then(onDoneFetchEquipments);
    });
  }, []);

  return (
    <div className="Equipment">
      <Title1>Equipment</Title1>
      <EquipmentTable
        equipments={equipments}
        onChangeSort={onChangeSort}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        onSelectEquipment={onSelectEquipment}
        pageNumber={pageNumber}
        perPage={perPage}
        totalEquipmentCount={totalEquipmentCount}
      />
      <EquipmentDialog
        isOpen={showEquipmentDialog}
        onClose={onCloseEquipmentDialog}
        equipment={equipment}
      />
    </div>
  );
};
