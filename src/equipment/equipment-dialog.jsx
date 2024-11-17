import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { EquipmentInfo } from './equipment-info';

export const EquipmentDialog = ({
  isOpen = false,
  onClose,
  equipment = null,
}) => {
  const onChangeIsOpen = useCallback((event, data) => {
    if (!data.open) {
      onClose();
    }
  }, [onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onChangeIsOpen}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle
            action={
              <DialogTrigger action="close">
                <Dismiss24Regular />
              </DialogTrigger>
            }
          >{equipment && equipment.name}</DialogTitle>
          <DialogContent>
            {equipment ? (
              <EquipmentInfo {...equipment} />
            ) : (
              <p>No equipment selected</p>
            )}
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

EquipmentDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  equipment: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};
