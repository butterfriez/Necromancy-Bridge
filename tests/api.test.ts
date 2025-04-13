import { expect, test } from 'bun:test';

import { getHypixelData } from '../src/util/api';
import Player from '../src/util/player';

import { getCurrentTime } from '../src/util/time';

test("getHypixelData helper function doesn't return null", async () => {
  const result = await getHypixelData('tgny');
  expect(result).not.toBeUndefined();
});

test('Player object', async () => {
  const result = new Player('tgny');
  await result.update(getCurrentTime());
  expect(result).not.toBeNull();

  if (result) {
    expect(result.profiles).not.toBeEmptyObject();
  }
});
