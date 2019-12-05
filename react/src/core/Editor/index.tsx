import { Button, Icon, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '../../authService';
import { API_URL } from '../../config';
import { IMessage } from '../Messages';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`;
const StyledTextField = styled(TextField)`
  max-width: 500px;
  width: 100%;
  margin-bottom: 1rem !important;
  margin-top: 1rem !important;
`;

interface Props {
  loading: boolean;
  setLoading: (value: React.SetStateAction<boolean>) => void;
  addNewMessage: (message: IMessage) => any;
}

export default function Editor({ loading, setLoading, addNewMessage }: Props) {
  const { getTokenSilently } = useAuth0();
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      setLoading(true);
      const token = await getTokenSilently();
      const { data } = await axios.post(
        `${API_URL}/message`,
        { message },
        { headers: { authorization: `Bearer ${token}` } }
      );
      addNewMessage({ ...data, createdAt: new Date(data.createdAt) });
    } catch (err) {}
    setLoading(false);
    setMessage('');
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  return (
    <Container>
      <StyledTextField
        variant="outlined"
        multiline
        rows="4"
        value={message}
        onChange={handleChange}
      />
      <div>
        <Button
          disabled={loading}
          endIcon={<Icon>send</Icon>}
          onClick={sendMessage}
        >
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </Container>
  );
}
