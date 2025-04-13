import type { Message, OmitPartialGroupDMChannel } from 'discord.js';

function handleCommand(content: string) {}

export function handleMessage(msg: OmitPartialGroupDMChannel<Message<boolean>>) {
  if (msg.author.bot) return;

  if (msg.content.startsWith('!')) {
    handleCommand(msg.content);
  }
}
