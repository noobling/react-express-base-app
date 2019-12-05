import { UserCreateInput, Photon } from '@prisma/photon';
import { AUTH0_DOMAIN } from './../config';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getUserInfo, createUser, updateUser, currentUser } from './user';

describe('Services/User', () => {
  let mock: MockAdapter;
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });
  beforeEach(() => mock.reset());

  it('getUserInfo()', async () => {
    mock.onGet().reply(200, {});

    await getUserInfo('');
    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toBe(`${AUTH0_DOMAIN}/userinfo`);
  });

  it('createUser()', async () => {
    const photon = ({ users: { create: jest.fn() } } as unknown) as Photon;
    const user: UserCreateInput = {
      avatarUrl: 'fake.com',
      email: 'a@a.com',
      name: 'david'
    };
    await createUser(user, photon);

    expect(photon.users.create).toHaveBeenCalled();
    expect(photon.users.create).toHaveBeenCalledWith({ data: user });
  });

  it('updateUser()', async () => {
    const photon = ({ users: { update: jest.fn() } } as unknown) as Photon;
    const user: UserCreateInput = {
      id: 'fakeid',
      email: 'changed',
      avatarUrl: ''
    };

    await updateUser(user, photon);

    expect(photon.users.update).toHaveBeenCalledWith({
      where: { id: user.id },
      data: user
    });
  });

  it('currentUser()', async () => {
    mock.onGet(`${AUTH0_DOMAIN}/userinfo`).reply(200, {
      sub: 'thisistheidfromauth0'
    });
    const photon = ({ users: { findOne: jest.fn() } } as unknown) as Photon;
    await currentUser('', photon);

    expect(photon.users.findOne).toBeCalledWith({
      where: { id: 'thisistheidfromauth0' }
    });
  });
});
