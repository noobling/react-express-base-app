import { LinearProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components';
import { useAuth0 } from '../authService';
import { API_URL } from '../config';

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white !important;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;

function FancyButton({ history }: RouteComponentProps) {
  const { getTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);

  const giveSuperPowers = async () => {
    setLoading(true);
    const token = await getTokenSilently();
    await axios.post(
      `${API_URL}/admin`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    );
    setLoading(false);
    history.push('/');
  };
  return (
    <div>
      {loading ? (
        <LinearProgress variant="indeterminate" />
      ) : (
        <StyledButton onClick={giveSuperPowers}>
          Super Powerful Button
        </StyledButton>
      )}
    </div>
  );
}

export default withRouter(FancyButton);
