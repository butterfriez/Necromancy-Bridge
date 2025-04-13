import { readdir } from 'node:fs/promises';
import MClient from './mineflayer';
import DClient from '../discord/bot';
import type { BotEvents } from 'mineflayer';

const EventFiles = await readdir('src/modules/mineflayer/events');

for (const file of EventFiles) {
  const event = await import(`./events/${file}`);
  const name = file.split('.')[0] as keyof BotEvents;

  MClient.on(name, async (...args: any) => await event.default(DClient, ...args));
}
