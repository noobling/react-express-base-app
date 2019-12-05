import React from 'react';
import { useAuth0 } from '../../authService';
import { Button } from '@material-ui/core';

export default function UnAuthenticatedItems() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button color="secondary" onClick={loginWithRedirect}>
      Login
    </Button>
  );
}
