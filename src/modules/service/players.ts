import type SkyblockMember from 'hypixel-api-reborn/dist/Structures/SkyBlock/SkyblockMember';
import Player from '../../util/player';
import { getCurrentTime } from '../../util/time';

const Players: Map<string, Player> = new Map();

export async function addNewPlayer(playerName: string) {
  if (!Players.has(playerName)) {
    const player = new Player(playerName);
    await player.update(getCurrentTime());

    Players.set(playerName, player);
  }
}

export function getPlayer(
  playerName: string,
  profileName: string | undefined
): SkyblockMember | undefined {
  const player = Players.get(playerName);

  if (!player) return undefined;

  return player.profiles.get(profileName || player.defaultProfileName);
}
