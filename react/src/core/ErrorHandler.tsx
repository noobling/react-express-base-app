import { IconButton, Snackbar, Typography } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import axios from 'axios';
import React, { useState } from 'react';

export default function ErrorHandler() {
  const [showSnackbarError, setShowSnackbarError] = useState(false);
  const [message, setMessage] = useState('');
  const handleSnackbarClose = () => {
    setShowSnackbarError(false);
  };
  axios.interceptors.response.use(
    response => {
      // do something with the response data
      return response;
    },
    error => {
      // handle the response error
      setMessage(error.message);
      setShowSnackbarError(true);
      return Promise.reject(error);
    }
  );
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={showSnackbarError}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<Typography color="secondary">{message}</Typography>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleSnackbarClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
}
