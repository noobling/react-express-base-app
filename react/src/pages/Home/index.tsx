import React from 'react';
import { ReactComponent as LandingSVG } from './landing.svg';
import styled from 'styled-components';
import ReactFloaterJS from 'react-floaterjs';
import { Typography, Box, Container, Grid } from '@material-ui/core';
import StyledExternalLink from '../../core/StyledExternalLink';

const StyledLandingSVG = styled(LandingSVG)`
  max-width: 400px;
  float: right;
`;

export default function Home() {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <ReactFloaterJS>
            <StyledLandingSVG />
          </ReactFloaterJS>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          style={{ display: 'flex', margin: 'auto 0 auto 0' }}
        >
          <Typography component="div">
            <Box fontSize={40} fontWeight="fontWeightLight">
              Next Generation Apps.
            </Box>
            <Box fontSize={18} fontWeight="fontWeightLight">
              Built with:{' '}
              <StyledExternalLink href="https://reactjs.org">
                React
              </StyledExternalLink>
              ,{' '}
              <StyledExternalLink href="https://www.styled-components.com/">
                Styled Components
              </StyledExternalLink>{' '}
              &{' '}
              <StyledExternalLink href="https://www.prisma.io/">
                Prisma
              </StyledExternalLink>
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
