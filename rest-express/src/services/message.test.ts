import { createMessage, deleteMessage } from './message';
import { UserCreateInput, Photon } from '@prisma/photon';
import { AUTH0_DOMAIN } from './../config';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getUserInfo, createUser, updateUser, currentUser } from './user';

describe('services/message', () => {
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

  it('createMessage()', async () => {
    const photon: any = { messages: { create: jest.fn() } };
    await createMessage('randomid', 'randommessage', photon);

    expect(photon.messages.create).toBeCalledWith({
      data: {
        author: { connect: { id: 'randomid' } },
        text: 'randommessage'
      },
      include: { author: true }
    });
  });

  it('deleteMessage', async () => {
    const photon: any = { messages: { delete: jest.fn() } };
    await deleteMessage('id', photon);

    expect(photon.messages.delete).toBeCalledWith({ where: { id: 'id' } });
  });
});
