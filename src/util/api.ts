import Client from 'hypixel-api-reborn/dist/Client';
import type RequestData from 'hypixel-api-reborn/dist/Private/RequestData';
import type SkyblockMember from 'hypixel-api-reborn/dist/Structures/SkyBlock/SkyblockMember';

interface profile {
  name: string;
  data: SkyblockMember;
}

const CHypixel = new Client(process.env.HYPIXEL_KEY!);

export async function getHypixelData(playerName: string): Promise<Map<string, SkyblockMember>> {
  let playerProfiles: Map<string, SkyblockMember> = new Map();

  await CHypixel.getSkyblockMember(playerName)
    .then((profiles: Map<string, SkyblockMember> | RequestData) => {
      if (profiles instanceof Map) {
        playerProfiles = profiles;
      }
    })
    .catch((error) => {
      console.error(`Error fetching skyblock data for: ${playerName}, error: `, error);
    });

  return playerProfiles;
}
