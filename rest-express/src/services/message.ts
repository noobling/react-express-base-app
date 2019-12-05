import { Photon } from '@prisma/photon';
export const createMessage = async (
  userId: string,
  message: string,
  photon: Photon
) => {
  return await photon.messages.create({
    data: {
      author: { connect: { id: userId } },
      text: message
    },
    include: {
      author: true
    }
  });
};

export const deleteMessage = async (id: string, photon: Photon) => {
  return await photon.messages.delete({
    where: {
      id
    }
  });
};
