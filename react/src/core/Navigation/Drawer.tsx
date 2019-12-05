import { Drawer as DrawerMaterial, List } from '@material-ui/core';
import {
  Home as HomeIcon,
  LockOpen,
  Person as PersonIcon
} from '@material-ui/icons';
import React from 'react';
import { useAuth0 } from '../../authService';
import { REDIRECT_URI } from '../../config';
import ListItemLink from '../ListItemLink';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Drawer = ({ open, setOpen }: Props) => {
  const closeDrawer = () => setOpen(false);
  const { logout } = useAuth0();

  return (
    <DrawerMaterial open={open} onClose={closeDrawer}>
      <div
        style={{
          width: 250
        }}
      >
        <List>
          <ListItemLink
            icon={<HomeIcon />}
            primary="Home"
            to="/"
            onClick={closeDrawer}
          />
          <ListItemLink
            icon={<PersonIcon />}
            primary="Profile"
            to="/profile"
            onClick={closeDrawer}
          />
          <ListItemLink
            icon={<LockOpen />}
            primary="Logout"
            to="#"
            onClick={() => logout({ returnTo: REDIRECT_URI })}
          />
        </List>
      </div>
    </DrawerMaterial>
  );
};
