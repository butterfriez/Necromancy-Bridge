import { getHypixelData } from './api';
import { getCurrentTime } from './time';

type CatacombClass = {
  name: string;
  level: number;
};

type PlayerApiData = {
  catacombs: {
    level: number;
    classes: {
      healer: number;
      mage: number;
      berserk: number;
      archer: number;
      tank: number;
    };
    currentClass: CatacombClass;
    secrets: number;
  };
};

export interface IPlayer {
  name: string;
  lastCommandTimeStamp: number;
  apiData: PlayerApiData | undefined;
}

// this is going to be a lot of null checking
class Player implements IPlayer {
  name: string;
  lastCommandTimeStamp: number;
  apiData: PlayerApiData | undefined;

  constructor(name: string) {
    this.name = name;
    this.lastCommandTimeStamp = getCurrentTime();
  }

  async update() {
    const hypixelApiData = await getHypixelData(this.name);
    if (hypixelApiData == undefined) return;

    this.apiData = {
      catacombs: {
        level: hypixelApiData.data.dungeons.experience.level,
        classes: {
          healer: hypixelApiData.data.dungeons.classes.healer.level,
          mage: hypixelApiData.data.dungeons.classes.mage.level,
          berserk: hypixelApiData.data.dungeons.classes.berserk.level,
          archer: hypixelApiData.data.dungeons.classes.archer.level,
          tank: hypixelApiData.data.dungeons.classes.tank.level,
        },
        currentClass: {
          name: hypixelApiData.data.dungeons.classes.selected,
          level:
            hypixelApiData.data.dungeons.classes[hypixelApiData.data.dungeons.classes.selected]
              .level,
        },
        secrets: hypixelApiData.data.dungeons.secrets,
      },
    };
  }

  getCatacombs() {
    return this.apiData?.catacombs;
  }
}

export default Player;
