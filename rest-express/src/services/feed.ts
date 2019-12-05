import { Photon } from '@prisma/photon';
export default async function(photon: Photon) {
  return await photon.messages.findMany({
    include: {
      author: true
    },
    last: 5
  });
}
