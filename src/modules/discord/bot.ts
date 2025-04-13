import { Client, Events, GatewayIntentBits } from 'discord.js';
import { handleMessage } from './handlers';

const DClient = new Client({ intents: [GatewayIntentBits.Guilds] });

DClient.once(Events.ClientReady, (c) => {
  console.log(`Bot ready! Now listening for messages as ${c.user.tag}`);
});

DClient.once(Events.MessageCreate, (msg) => {
  handleMessage(msg);
});

DClient.login(process.env.DISCORD_TOKEN);

export default DClient;
