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
import { SpellInfo } from './spell-info';

export const SpellDialog = ({
  isOpen = false,
  onClose,
  spell = null,
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
          >{spell && spell.name}</DialogTitle>
          <DialogContent>
            {spell ? (
              <SpellInfo {...spell} />
            ) : (
              <p>No spell selected</p>
            )}
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

SpellDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  spell: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};
