import {
  PUSHER_APP_ID,
  PUSHER_KEY,
  PUSHER_SECRET,
  PUSHER_CLUSTER
} from './../config';
import Pusher from 'pusher';

const pusherOptions = {
  appId: PUSHER_APP_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: PUSHER_CLUSTER,
  encrypted: true
};

export default new Pusher(pusherOptions);
