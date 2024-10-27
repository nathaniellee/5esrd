import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
} from '@fluentui/react-components';

export const SpellDialog = ({
  isOpen = false,
  onClose,
  spell = null,
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
          <DialogTitle>{spell?.name ?? 'No spell selected'}</DialogTitle>
          <DialogContent>
            {spell?.description
              ? spell.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))
              : <p>Please select a spell to see its information.</p>
            }
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
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
