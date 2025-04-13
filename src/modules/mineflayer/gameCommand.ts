import type { Client } from 'discord.js';

interface CommandBase {
  name: string;
  description: string;
  args: string;
  execute: (discordClient: Client, message: string, messageAuthor: string) => void;
}

class Command implements CommandBase {
  name: string;
  description: string;
  args: string;
  execute: (discordClient: Client, message: string, messageAuthor: string) => void;

  constructor(
    name: string,
    description: string,
    args: string,
    execute: (discordClient: Client, message: string, messageAuthor: string) => void
  ) {
    this.name = name;
    this.description = description;
    this.args = args;
    this.execute = execute;
  }
}

export default Command;
