import React from 'react';
import { useAuth0 } from '../authService';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  CardHeader,
  Avatar,
  IconButton
} from '@material-ui/core';
import styled from 'styled-components';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import SuperPowerfulButton from '../core/SuperPowerfulButton';

const Heading = styled(Box)`
  font-weight: 100 !important;
  font-size: 1.5rem;
`;

const BodyContent = styled(Box)`
  font-weight: 100 !important;
  font-size: 1rem;
`;

const StyledSuperPowerfulButton = styled(SuperPowerfulButton)`
  margin: 2rem 0 2rem 0;
`;

const Profile = () => {
  const { user } = useAuth0();
  return (
    <Card style={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar src={user.picture}>
            {user.name && user.name.length > 0 && user.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Your Profile"
        subheader="September 14, 2016"
      ></CardHeader>
      <CardActionArea>
        <CardMedia
          style={{ height: 140 }}
          image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
          title="Profile Picture"
        />
        <CardContent>
          <Typography>
            <Heading>{user.name}</Heading>
            <BodyContent>{user.nickname}</BodyContent>
          </Typography>
          <StyledSuperPowerfulButton />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Profile;
