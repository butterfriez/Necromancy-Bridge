import type { Client } from 'discord.js';
import MClient from '../mineflayer';

let emittedEvent = false;
export default async function execute(discordClient: Client) {
  if (!emittedEvent) {
    console.log('[MINECRAFT] Logged in!');
    emittedEvent = true;

    setTimeout(() => {
      MClient.chat('/locraw');
    }, 5000);
    setInterval(() => {
      MClient.chat('/locraw');
    }, 1000 * 60);
  }
}
