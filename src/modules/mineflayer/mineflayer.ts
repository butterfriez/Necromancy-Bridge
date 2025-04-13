import { createBot } from 'mineflayer';
import { TextChannel } from 'discord.js';
import DClient from '../discord/bot';

const MClient = createBot({
  host: 'mc.hypixel.net',
  username: process.env.MC_USERNAME as string,
  auth: process.env.MC_MICROSOFTAUTH ? 'microsoft' : 'mojang',
  version: '1.8.9',
  viewDistance: 'tiny',
  chatLengthLimit: 256,
  port: 25565,
});

function connect() {
  MClient.on('end', async () => {
    if (process.env.HYPIXEL_DISCONNECT) {
      const logChannel = DClient.channels.cache.get(
        process.env.LOG_CHANNEL as string
      ) as TextChannel;
      if (logChannel == null) return;

      await logChannel.send(`Minecraft bot disconnected! Trying to reconnect.`);
    }
    connect();
  });

  MClient.on('kicked', connect);
  MClient.on('error', connect);

  import('./commandGrabber');
  import('./eventHandler');
}

connect();

export default MClient;
