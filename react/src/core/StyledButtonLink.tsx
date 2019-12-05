import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface Props {
  link: string;
  color: 'primary' | 'secondary' | 'inherit';
  children: ReactNode;
}

export default function StyledButtonLink({
  children,
  link,
  color,
  ...props
}: Props) {
  const StyledButtonLink = styled(Link)`
    color: inherit;
    text-decoration: none;
  `;

  return (
    <StyledButtonLink to={link} {...props}>
      <Button color={color} {...props}>
        {children}
      </Button>
    </StyledButtonLink>
  );
}
