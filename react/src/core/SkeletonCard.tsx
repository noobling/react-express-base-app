import { Card, CardContent, CardHeader } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import React from 'react';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  max-width: 500px;
`;

export default function SkeletonCard() {
  return (
    <StyledCard>
      <CardHeader
        avatar={<Skeleton variant="circle" width={40} height={40} />}
        title={<Skeleton height={6} width="80%" />}
        subheader={<Skeleton height={6} width="40%" />}
      />
      {<Skeleton variant="rect" />}
      <CardContent>
        <Skeleton height={6} />
        <Skeleton height={6} width="80%" />
      </CardContent>
    </StyledCard>
  );
}
