import { Photon, User, UserCreateInput } from '@prisma/photon';
import * as bodyParser from 'body-parser';
import express from 'express';
import admin from './services/admin';
import { jwtCheck } from './services/auth';
import feed from './services/feed';
import { createMessage, deleteMessage } from './services/message';
import pusher from './services/pusher';
import {
  createUser,
  currentUser,
  getUserInfo,
  updateUser
} from './services/user';

const cors = require('cors');

const photon = new Photon();
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.post(`/user`, jwtCheck, async (req, res) => {
  try {
    const data = await getUserInfo(req.headers.authorization);

    const currentUser: UserCreateInput = {
      id: data.sub,
      avatarUrl: data.picture,
      name: data.name,
      nickname: data.nickname
    };
    const user = await photon.users.findOne({ where: { id: currentUser.id } });
    if (!user) {
      return res.json(await createUser(currentUser, photon));
    } else {
      return res.json(await updateUser(currentUser, photon));
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/currentUser', jwtCheck, async (req, res) => {
  try {
    res.json(await currentUser(req.headers.authorization, photon));
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/message', jwtCheck, async (req, res) => {
  try {
    const user = await getUserInfo(req.headers.authorization);
    const result = await createMessage(user.sub, req.body.message, photon);
    pusher.trigger('message', 'new-message', {
      message: result
    });
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.delete('/message/:id', jwtCheck, async (req, res) => {
  try {
    const { id } = req.params;

    res.json(await deleteMessage(id, photon));
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/feed', jwtCheck, async (req, res) => {
  try {
    res.json(await feed(photon));
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/admin', jwtCheck, async (req, res) => {
  try {
    const userInfo = await getUserInfo(req.headers.authorization);
    const user: User = await photon.users.findOne({
      where: { id: userInfo.sub }
    });

    res.json(await admin(user, photon));
  } catch (err) {
    res.json(err);
  }
});

app.listen(process.env.PORT || 5000, () =>
  console.log(
    '🚀 Server ready at: http://localhost:5000\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#5-using-the-rest-api'
  )
);
