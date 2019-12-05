import { Link, useTheme } from '@material-ui/core';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  href: string;
  children: ReactNode;
}

export default function StyledExternalLink({
  children,
  href,
  ...props
}: Props) {
  const theme = useTheme();

  const StyledLink = styled(Link)`
    color: inherit;
    text-decoration: none;
    border-bottom: 2px dotted;
    transition-duration: 0.5s;
    &:hover {
      text-decoration: none !important;
      color: ${theme.palette.secondary.main};
    }
  `;

  return (
    <StyledLink href={href} target="_blank" rel="noopener" {...props}>
      {children}
    </StyledLink>
  );
}
