import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth0 } from '../../authService';
import AuthenticatedItems from './AuthenticatedItems';
import { Drawer } from './Drawer';
import UnAuthenticatedItems from './UnAuthenticatedItems';

const Heading = styled(Typography)`
  font-weight: 100 !important;
  font-size: 1.5rem !important;
`;

const RightContainer = styled('div')`
  margin-left: auto;
`;

const StyledAppBar = styled(AppBar)`
  margin-bottom: 1rem;
`;

const Navigation = () => {
  const { isAuthenticated } = useAuth0();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      <StyledAppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Heading>Starter App</Heading>
          <RightContainer>
            {isAuthenticated ? (
              <AuthenticatedItems />
            ) : (
              <UnAuthenticatedItems />
            )}
          </RightContainer>
        </Toolbar>
      </StyledAppBar>

      <Drawer setOpen={setDrawerOpen} open={drawerOpen} />
    </div>
  );
};

export default Navigation;
