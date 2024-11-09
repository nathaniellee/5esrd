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
import { MonsterInfo } from './monster-info';

export const MonsterDialog = ({
  isOpen = false,
  onClose,
  monster = null,
}) => {
  const onChangeIsOpen = useCallback((event, data) => {
    if (!data.open) {
      onClose();
    }
  }, []);
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
          >{monster && monster.name}</DialogTitle>
          <DialogContent>
            {monster ? (
              <MonsterInfo {...monster} />
            ) : (
              <p>No monster selected</p>
            )}
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

MonsterDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  monster: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};
