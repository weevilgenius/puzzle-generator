import { describe, expect, it } from 'vitest';
import { createRectangleBorder } from '../borderShapes';

describe('createRectangleBorder', () => {
  it('builds a closed rectangle path that matches the provided dimensions', () => {
    const width = 320;
    const height = 180;

    const commands = createRectangleBorder(width, height);

    expect(commands).toHaveLength(5);
    expect(commands[0]).toEqual({ type: 'move', p: [0, 0] });
    expect(commands.at(-1)).toEqual({ type: 'line', p: [0, 0] });
    expect(commands.slice(1, 4)).toEqual([
      { type: 'line', p: [width, 0] },
      { type: 'line', p: [width, height] },
      { type: 'line', p: [0, height] },
    ]);
  });
});
