import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'simplebar/dist/simplebar.min.css';
import styled from 'styled-components';
import { useAuth0 } from '../authService';
import { API_URL } from '../config';
import Message from './Message';

export interface IMessage {
  author: {
    avatarUrl?: string;
    email?: string;
    id: 'facebook|804022623351203';
    name: string;
    nickname?: string;
  };
  createdAt: Date;
  id: string;
  text: string;
  updatedAt: Date;
}

interface Props {
  items: IMessage[];
  onMessageDelete: (message: IMessage) => any;
}

const StyledMessage = styled(Message)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  avatarUrl?: string;
  email?: string;
  id: string;
  name: string;
  nickname?: string;
  roles?: Role[];
  onMessageDelete: (message: IMessage) => any;
}

export default function Messages({ items, onMessageDelete }: Props) {
  const { getTokenSilently } = useAuth0();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = await getTokenSilently();
      const { data }: { data: User } = await axios.get(
        `${API_URL}/currentUser`,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
      setCurrentUser(data);
    };

    getCurrentUser();
  });

  return (
    <>
      {items.map(item => (
        <StyledMessage
          currentUser={currentUser}
          item={item}
          onMessageDelete={onMessageDelete}
        />
      ))}
    </>
  );
}
