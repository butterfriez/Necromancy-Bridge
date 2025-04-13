import SkyblockMember from 'hypixel-api-reborn/dist/Structures/SkyBlock/SkyblockMember';
import { getHypixelData } from './api';
import { getCurrentTime, getSecondsBetween } from './time';
import type { Dungeons } from 'hypixel-api-reborn';

export interface IPlayer {
  name: string;
  defaultProfileName: string;
  lastCommandTimeStamp: number;
  profiles: Map<string, SkyblockMember>;
  update: (currentTime: number) => void;
}

// this is going to be a lot of null checking
class Player implements IPlayer {
  name: string;
  defaultProfileName: string;
  lastCommandTimeStamp: number;
  profiles: Map<string, SkyblockMember>;

  constructor(name: string) {
    this.name = name;
    this.defaultProfileName = '';
    this.lastCommandTimeStamp = 0;
    this.profiles = new Map();
  }

  async update(currentTime: number) {
    if (getSecondsBetween(this.lastCommandTimeStamp, currentTime) < 60 * 5) return;

    const hypixelApiData = await getHypixelData(this.name);
    if (hypixelApiData == undefined) return;

    this.profiles = hypixelApiData;

    hypixelApiData.forEach((profile: SkyblockMember, profileName) => {
      if (profile.selected) this.defaultProfileName = profileName;
    });
  }
}

export default Player;
