import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme
} from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '../../authService';
import { API_URL } from '../../config';
import { IMessage, Role, User } from '../Messages';

interface Props {
  item: IMessage;
  currentUser: User | null;
  onMessageDelete: (message: IMessage) => any;
}
export default function Message({ item, currentUser, ...props }: Props) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { getTokenSilently } = useAuth0();

  if (!currentUser) return null;

  const Container = styled(Card)`
    ${currentUser.id === item.author.id &&
      'border-left: 5px solid ' + theme.palette.primary.main}

    width: 90%;
  `;

  const deleteMessage = async () => {
    setLoading(true);
    const token = await getTokenSilently();
    await axios.delete(`${API_URL}/message/${item.id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    setLoading(false);
    props.onMessageDelete(item);
  };

  return (
    <Container {...props}>
      <CardHeader
        avatar={
          <Avatar src={item.author.avatarUrl}>{item.author.name[0]}</Avatar>
        }
        action={
          currentUser.roles &&
          currentUser.roles[0] === Role.ADMIN && (
            <Button
              color="secondary"
              variant="contained"
              size="small"
              onClick={deleteMessage}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          )
        }
        title={item.author.name}
        subheader={item.createdAt.toLocaleString()}
      />
      <CardContent>
        <Typography>{item.text}</Typography>
      </CardContent>
    </Container>
  );
}
