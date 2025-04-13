import { readdir } from 'node:fs/promises';
import type Command from './gameCommand';

const Commands: Map<string, Command> = new Map();

const CommandFiles = await readdir('src/modules/mineflayer/commands');

for (const file of CommandFiles) {
  const command: Command = await import(`./commands/${file}`);
  if (command.name) {
    Commands.set(command.name, command);
  } else {
    continue;
  }
}

export default Commands;
