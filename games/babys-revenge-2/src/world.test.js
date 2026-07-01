import { describe, it, expect } from 'vitest';
import {
  createWorld3D,
  startChoppingTree,
  updateTreeChopping,
  getDoorPositions,
  tryCollectNearbyDucks,
  collectDuck,
} from './world3d.js';

describe('world3d', () => {
  it('spawns doors inside the playable barrier', () => {
    const doors = getDoorPositions();
    expect(doors.length).toBeGreaterThanOrEqual(3);
    doors.forEach((door) => {
      expect(door.x).toBeGreaterThan(7);
      expect(door.x).toBeLessThan(17);
      expect(door.y).toBeGreaterThan(8);
      expect(door.y).toBeLessThan(15);
    });
  });

  it('chops each tree only once and removes it from the world', () => {
    const world = createWorld3D();
    const tree = world.trees[0];
    world.player.x = tree.x;
    world.player.y = tree.y;

    expect(startChoppingTree(world, tree)).toBe(true);
    let finished = false;
    for (let i = 0; i < 200 && !finished; i += 1) {
      finished = updateTreeChopping(world, 0.05);
    }

    expect(finished).toBe(true);
    expect(world.trees.some((t) => t.id === tree.id)).toBe(false);
    expect(startChoppingTree(world, tree)).toBe(false);
  });

  it('collects ducks when the player walks into them', () => {
    const world = createWorld3D();
    const duck = world.wildDucks.find((d) => d.onLand) ?? world.wildDucks[0];
    world.player.x = duck.x;
    world.player.y = duck.y;

    const collected = tryCollectNearbyDucks(world);
    expect(collected.length).toBeGreaterThanOrEqual(1);
    expect(collected.some((d) => d.id === duck.id)).toBe(true);
    expect(collectDuck(duck)).toBe(false);
  });
});
