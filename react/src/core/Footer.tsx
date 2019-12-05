import React from 'react';
import styled from 'styled-components';
import StyledExternalLink from './StyledExternalLink';
import { Typography } from '@material-ui/core';

const StyledFooter = styled('footer')`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 20px;
  width: 100vw;
  height: 100px;
  margin-top: 1.5rem;
`;

const Content = styled(Typography)`
  font-weight: 100 !important;
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Content>
        Made by{' '}
        <StyledExternalLink href="https://github.com/noobling">
          David
        </StyledExternalLink>{' '}
        ❤️
      </Content>
    </StyledFooter>
  );
}
