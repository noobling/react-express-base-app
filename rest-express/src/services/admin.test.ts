import admin from './admin';
import { User, Role } from '@prisma/photon';

describe('services/admin', () => {
  it('when no admin role exists it is added', async () => {
    const photon: any = { users: { update: jest.fn() } };
    const user: User = {
      email: 'a@a.com',
      name: 'david',
      avatarUrl: 'fakeplace',
      id: 'fakeid',
      nickname: 'fakename',
      roles: []
    };
    await admin(user, photon);
    expect(photon.users.update).toBeCalledWith({
      where: {
        id: 'fakeid'
      },
      data: {
        roles: { set: Role.ADMIN }
      }
    });
  });

  it('when  admin role exists it is removed', async () => {
    const photon: any = { users: { update: jest.fn() } };
    const user: User = {
      email: 'a@a.com',
      name: 'david',
      avatarUrl: 'fakeplace',
      id: 'fakeid',
      nickname: 'fakename',
      roles: [Role.ADMIN]
    };
    await admin(user, photon);
    expect(photon.users.update).toBeCalledWith({
      where: {
        id: 'fakeid'
      },
      data: {
        roles: { set: [] }
      }
    });
  });
});
