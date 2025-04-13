import { expect, test } from 'bun:test';
import { addNewPlayer, getPlayer } from '../src/modules/service/players';

test('Players service', async () => {
  await addNewPlayer('tgny');

  const result = getPlayer('tgny', undefined);

  expect(result).not.toBeNull();
});
