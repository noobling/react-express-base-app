import axios from 'axios';
import { IMessage } from '../../core/Messages';
import { API_URL } from '../../config';

export const getFeed = async (
  setFeed: React.Dispatch<IMessage[]>,
  setLoading: React.Dispatch<boolean>,
  getTokenSilently: () => Promise<string>
) => {
  setLoading(true);
  const token = await getTokenSilently();

  const { data } = await axios.get(`${API_URL}/feed`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  const parsedData = data.map((item: any) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt)
  }));

  setFeed(parsedData);
  setLoading(false);
};

export const updateUser = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  getTokenSilently: () => Promise<string>
) => {
  setLoading(true);
  const token = await getTokenSilently();
  await axios.post(
    `${API_URL}/user`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  );
  setLoading(false);
};
