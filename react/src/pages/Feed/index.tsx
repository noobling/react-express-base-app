import { Box, Typography } from '@material-ui/core';
import Pusher from 'pusher-js';
import React, { useEffect, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import styled from 'styled-components';
import { useAuth0 } from '../../authService';
import { PUSHER_CLUSTER, PUSHER_ID } from '../../config';
import MyEditor from '../../core/Editor';
import Messages, { IMessage } from '../../core/Messages';
import SkeletonCard from '../../core/SkeletonCard';
import { getFeed, updateUser } from './services';

const Heading = styled(Box)`
  font-weight: 100;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`;

export default function Feed() {
  const { getTokenSilently, user } = useAuth0();
  const [feed, setFeed] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollableNodeRef = useRef();

  const scrollBottom = () => {
    if (scrollableNodeRef) {
      // @ts-ignore not sure why typescript not working here
      scrollableNodeRef.current.scrollTop =
        //@ts-ignore
        scrollableNodeRef.current.scrollHeight;
    }
  };
  const addNewMessage = (message: IMessage) => {
    setFeed(prevFeed => [...prevFeed, message]);
    scrollBottom();
  };

  const handleMessageDelete = (message: IMessage) => {
    setFeed(prevFeed => prevFeed.filter(item => item.id !== message.id));
  };

  useEffect(() => {
    updateUser(setLoading, getTokenSilently);

    getFeed(setFeed, setLoading, getTokenSilently);
    const pusher = new Pusher(PUSHER_ID, {
      cluster: PUSHER_CLUSTER,
      forceTLS: true
    });
    const channel = pusher.subscribe('message');
    channel.bind('new-message', function({ message }) {
      if (message.author.id !== user.sub) {
        setFeed(prevFeed => [...prevFeed, message]);
        scrollBottom();
      }
    });
    // eslint-disable-next-line
  }, [user.sub]);

  return (
    <>
      <Typography component="div">
        <Heading>Real Time Messaging</Heading>
        {loading && (
          <p>
            Loads can take up to 1 minute due to Heroku free tier{' '}
            <span role="img" aria-label="sad">
              😢
            </span>
          </p>
        )}
      </Typography>

      <Container>
        {/* 
        // @ts-ignore the typings are incomplete */}
        <SimpleBar
          autoHide={false}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            maxHeight: '400px'
          }}
          scrollableNodeProps={{ ref: scrollableNodeRef }}
        >
          <Messages items={feed} onMessageDelete={handleMessageDelete} />
        </SimpleBar>
        {loading && <SkeletonCard />}
        <MyEditor
          setLoading={setLoading}
          loading={loading}
          addNewMessage={addNewMessage}
        />
      </Container>
    </>
  );
}
