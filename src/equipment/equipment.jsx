import React, { useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_ORDER,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PER_PAGE,
} from '../api/constants';
import {
  fetchEquipments,
  fetchTotalEquipmentCount,
  transformEquipment,
} from '../api/fetchEquipments';
import { EquipmentTable } from './equipment-table';

export const Equipment = () => {
  const [equipments, setEquipments] = useState([]);
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [totalEquipmentCount, setTotalEquipmentCount] = useState(0);

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
      <EquipmentTable
        equipments={equipments}
        onChangeSort={onChangeSort}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        pageNumber={pageNumber}
        perPage={perPage}
        totalEquipmentCount={totalEquipmentCount}
      />
    </div>
  );
};
