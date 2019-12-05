import { currentUser } from './user';
import { User, Photon, Role, UserUpdaterolesInput } from '@prisma/photon';
export default async function(user: User, photon: Photon) {
  const query: UserUpdaterolesInput =
    user.roles[0] === Role.ADMIN ? { set: [] } : { set: Role.ADMIN };

  return await photon.users.update({
    where: {
      id: user.id
    },
    data: {
      roles: query
    }
  });
}
