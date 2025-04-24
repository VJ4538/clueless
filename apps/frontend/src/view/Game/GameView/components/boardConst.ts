import { CSSProperties } from 'react';

type TileStyleMap = Record<string, CSSProperties>;

// Reusable styles
const borderNone = (sides: string[]): CSSProperties =>
  Object.fromEntries(sides.map(side => [`border${side}`, 'none']));

const entryTilePositionMapping: TileStyleMap = {
  // Bottom-right corner entries
  ...Object.fromEntries(
    ['entry-1', 'entry-2'].map(key => [
      key,
      {
        alignSelf: 'end',
        justifySelf: 'end',
        top: '35px',
        ...borderNone(['Bottom']),
      },
    ])
  ),

  // Top-right entries
  ...Object.fromEntries(
    ['entry-3', 'entry-5'].map(key => [
      key,
      {
        alignSelf: 'start',
        justifySelf: 'end',
        left: '35px',
        ...borderNone(['Right']),
      },
    ])
  ),

  // Right side entries
  ...Object.fromEntries(
    ['entry-4', 'entry-6'].map(key => [
      key,
      {
        right: '35px',
        ...borderNone(['Left']),
      },
    ])
  ),

  // Top entries
  ...Object.fromEntries(
    ['entry-7', 'entry-8'].map(key => [
      key,
      {
        top: '-35px',
        ...borderNone(['Top']),
        ...(key === 'entry-8' && {
          alignSelf: 'start',
          justifySelf: 'end',
        }),
      },
    ])
  ),
};

const hallwayTilePositionMapping: TileStyleMap = {
  // Horizontal hallways
  ...Object.fromEntries(
    [
      'hallway-1',
      'hallway-2',
      'hallway-6',
      'hallway-7',
      'hallway-11',
      'hallway-12',
    ].map(key => [key, borderNone(['Left', 'Right'])])
  ),

  // Vertical hallways
  ...Object.fromEntries(
    [
      'hallway-3',
      'hallway-4',
      'hallway-5',
      'hallway-8',
      'hallway-9',
      'hallway-10',
    ].map(key => [key, borderNone(['Top', 'Bottom'])])
  ),
};

export { entryTilePositionMapping, hallwayTilePositionMapping };
