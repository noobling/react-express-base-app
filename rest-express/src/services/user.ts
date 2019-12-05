import { AUTH0_DOMAIN } from './../config';
import { UserCreateInput, Photon } from '@prisma/photon';
import { Auth0User } from './auth';
import axios from 'axios';

export const getUserInfo = async (authorizationHeader: string) => {
  const { data }: { data: Auth0User } = await axios.get(
    `${AUTH0_DOMAIN}/userinfo`,
    {
      headers: {
        Authorization: authorizationHeader
      }
    }
  );

  return data;
};

export const createUser = (user: UserCreateInput, photon: Photon) => {
  return photon.users.create({
    data: {
      ...user
    }
  });
};

export const updateUser = (user: UserCreateInput, photon: Photon) => {
  return photon.users.update({
    where: { id: user.id },
    data: { ...user }
  });
};

export const currentUser = async (
  authorizationHeader: string,
  photon: Photon
) => {
  const user = await getUserInfo(authorizationHeader);

  return await photon.users.findOne({ where: { id: user.sub } });
};
