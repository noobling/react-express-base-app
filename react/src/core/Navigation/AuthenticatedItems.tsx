import { Avatar, Button, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '../../authService';
import StyledButtonLink from '../StyledButtonLink';
import { REDIRECT_URI } from '../../config';

export default function AuthenticatedItems() {
  const { logout, user } = useAuth0();
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const Container = styled('div')`
    display: flex;
    align-items: center;
  `;
  return (
    <Container>
      {largeScreen && (
        <>
          {/*
            // @ts-ignore logout is a function that can be passed to onclick */}
          <Button color="secondary" onClick={() => logout(REDIRECT_URI)}>
            Logout
          </Button>
          <StyledButtonLink link="/" color="secondary">
            Home
          </StyledButtonLink>
          <StyledButtonLink link="/profile" color="secondary">
            Profile
          </StyledButtonLink>
        </>
      )}

      <Avatar src={user.picture}>
        {user.name && user.name.length > 0 && user.name[0]}
      </Avatar>
    </Container>
  );
}
