import { expect, test } from 'bun:test';
import { getHypixelData } from './util/api';
import Player from './util/player';

test("getHypixelData helper function doesn't return null", async () => {
  const result = await getHypixelData('tgny');
  expect(result).not.toBeUndefined();

  if (result) {
    expect(result.name).toBeTypeOf('string');
    expect(result.data).toBeTypeOf('object');
  }
});

test('Player object', async () => {
  const result = new Player('tgny');
  await result.update();
  expect(result).not.toBeNull();

  if (result) {
    expect(result.apiData).not.toBeEmptyObject();
  }
});
