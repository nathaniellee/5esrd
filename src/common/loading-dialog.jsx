import PropTypes from 'prop-types';
import React from 'react';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  Spinner,
} from '@fluentui/react-components';

export const LoadingDialog = ({
  isOpen = false,
  message = 'Loading',
}) => {
  return (
    <Dialog open={isOpen}>
      <DialogSurface>
        <DialogBody>
          <DialogContent>
            <Spinner size="medium" label={message} />
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

LoadingDialog.propTypes = {
  isOpen: PropTypes.bool,
  message: PropTypes.string,
};
