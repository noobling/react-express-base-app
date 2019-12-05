import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Omit } from '@material-ui/types';
import React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom';

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  [key: string]: any;
}
export default function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<
        HTMLAnchorElement,
        Omit<RouterLinkProps, 'innerRef' | 'to'>
      >((itemProps, ref) => (
        <RouterLink to={to} {...itemProps} innerRef={ref} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink} {...props}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}
