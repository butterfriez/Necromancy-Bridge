import type { Client } from 'discord.js';
import Command from '../gameCommand';
import { getPlayer } from '../../service/players';
import MClient from '../mineflayer';

export default new Command(
  'cata',
  "Get a player's dungeons stats.",
  '[ign] [profile]',
  (discordClient: Client, message: string, messageAuthor: string) => {
    let { 1: username, 2: profile } = message.split(' ');
    if (!username) username = messageAuthor;

    const searchedPlayer = getPlayer(username, profile);
    if (!searchedPlayer) return;

    const dungeons = searchedPlayer.dungeons;

    const cataLvl = dungeons.experience.level;
    const classes = {
      healer: dungeons.classes.healer.level,
      mage: dungeons.classes.mage.level,
      berserk: dungeons.classes.berserk.level,
      archer: dungeons.classes.archer.level,
      tank: dungeons.classes.tank.level,
    };

    const currClass = dungeons.classes.selected;
    const currClassFancy = currClass[0]?.toUpperCase() + currClass.substring(1);

    const secrets = dungeons.secrets;

    MClient.chat(
      `/gc @${messageAuthor}${messageAuthor === username ? "'s" : `${username}'s`} dungeon stats:\nCatacombs level: ${cataLvl}\nSelected Class: ${currClassFancy}\nClass Levels: T${classes.tank} A${classes.archer} B${classes.berserk} M${classes.mage} H${classes.healer}\nTotal Secrets: ${secrets}\n`
    );
  }
);
