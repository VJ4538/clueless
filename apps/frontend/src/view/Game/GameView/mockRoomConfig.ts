interface RoomConnection {
  adjacent: string[];
  secretPassage?: string;
}

interface Character {
  id: string;
  name: string;
  color: string;
  startingPosition: string;
}

/**
- - x - x - -
- r h r h r -
x h - h - h x
- r h r h r -
x h - h - h x
- r h r h r -
- - x - x - -
 */

interface GameboardTile {
  id: string;
  type: 'room' | 'hallway' | 'empty' | 'entry';
  label?: string;
  secretPassageTo?: string;
}

interface Weapon {
  id: string;
  name: string;
}

interface Card {
  id: string;
  type: 'suspect' | 'weapon' | 'room';
  name: string;
}

interface MockRoomConfig {
  connections: Record<string, RoomConnection>;
  characters: Character[];
  gameboard: GameboardTile[];
  weapons: Weapon[];
  cards: Card[];
}

export const mockRoomConfig: MockRoomConfig = {
  connections: {
    'room-1': {
      adjacent: ['hallway-3', 'hallway-1'],
      secretPassage: 'room-9',
    },
    'hallway-1': {
      adjacent: ['room-1', 'room-2'],
    },
    'room-2': {
      adjacent: ['hallway-4', 'hallway-1', 'hallway-2'],
    },
    'hallway-2': {
      adjacent: ['room-2', 'room-3'],
    },
    'room-3': {
      adjacent: ['hallway-5', 'hallway-2'],
      secretPassage: 'room-7',
    },
    'hallway-3': {
      adjacent: ['room-1', 'room-4'],
    },
    'hallway-4': {
      adjacent: ['room-2', 'room-5'],
    },
    'hallway-5': {
      adjacent: ['room-3', 'room-6'],
    },
    'room-4': {
      adjacent: ['hallway-3', 'hallway-8', 'hallway-6'],
    },
    'hallway-6': {
      adjacent: ['room-4', 'room-5'],
    },
    'room-5': {
      adjacent: ['hallway-4', 'hallway-9', 'hallway-6', 'hallway-7'],
    },
    'hallway-7': {
      adjacent: ['room-5', 'room-6'],
    },
    'room-6': {
      adjacent: ['hallway-5', 'hallway-10', 'hallway-7'],
    },
    'hallway-8': {
      adjacent: ['room-4', 'room-7'],
    },
    'hallway-9': {
      adjacent: ['room-5', 'room-8'],
    },
    'hallway-10': {
      adjacent: ['room-6', 'room-9'],
    },
    'room-7': {
      adjacent: ['hallway-8', 'hallway-11'],
      secretPassage: 'room-3',
    },
    'hallway-11': {
      adjacent: ['room-7', 'room-8'],
    },
    'room-8': {
      adjacent: ['hallway-9', 'hallway-11', 'hallway-12'],
    },
    'hallway-12': {
      adjacent: ['room-8', 'room-9'],
    },
    'room-9': {
      adjacent: ['hallway-10', 'hallway-12'],
      secretPassage: 'room-1',
    },
  },
  characters: [
    {
      id: 'char-1',
      name: 'Miss Scarlet',
      color: 'Red',
      startingPosition: 'hallway-5',
    },
    {
      id: 'char-2',
      name: 'Colonel Mustard',
      color: 'Yellow',
      startingPosition: 'hallway-10',
    },
    {
      id: 'char-3',
      name: 'Mrs. White',
      color: 'White',
      startingPosition: 'hallway-12',
    },
    {
      id: 'char-4',
      name: 'Mr. Green',
      color: 'Green',
      startingPosition: 'hallway-9',
    },
    {
      id: 'char-5',
      name: 'Mrs. Peacock',
      color: 'Blue',
      startingPosition: 'hallway-4',
    },
    {
      id: 'char-6',
      name: 'Professor Plum',
      color: 'Purple',
      startingPosition: 'hallway-1',
    },
  ],
  gameboard: [
    // Row 1 - - x - x - -
    {
      id: 'empty-1',
      type: 'empty',
    },
    {
      id: 'empty-2',
      type: 'empty',
    },
    {
      id: 'entry-1',
      type: 'entry',
    },
    {
      id: 'empty-3',
      type: 'empty',
    },
    {
      id: 'entry-2',
      type: 'entry',
    },
    {
      id: 'empty-4',
      type: 'empty',
    },
    {
      id: 'empty-5',
      type: 'empty',
    },
    // Row 1

    // Row 2 - # h # h # -
    {
      id: 'empty-6',
      type: 'empty',
    },
    {
      id: 'room-1',
      type: 'room',
      label: 'Study',
      secretPassageTo: 'room-9',
    },
    {
      id: 'hallway-1',
      type: 'hallway',
      label: 'Hallway 1',
    },
    {
      id: 'room-2',
      type: 'room',
      label: 'Hall',
    },
    {
      id: 'hallway-2',
      type: 'hallway',
      label: 'Hallway 2',
    },
    {
      id: 'room-3',
      type: 'room',
      label: 'Lounge',
      secretPassageTo: 'room-7',
    },
    {
      id: 'empty-7',
      type: 'empty',
    },
    // Row 2

    // Row 3  x h - h - h x
    {
      id: 'entry-3',
      type: 'entry',
    },
    {
      id: 'hallway-3',
      type: 'hallway',
      label: 'Hallway 3',
    },
    {
      id: 'empty-8',
      type: 'empty',
    },
    {
      id: 'hallway-4',
      type: 'hallway',
      label: 'Hallway 4',
    },
    {
      id: 'empty-9',
      type: 'empty',
    },
    {
      id: 'hallway-5',
      type: 'hallway',
      label: 'Hallway 5',
    },
    {
      id: 'entry-4',
      type: 'entry',
    },

    // Row 4
    {
      id: 'empty-10',
      type: 'empty',
    },
    {
      id: 'room-4',
      type: 'room',
      label: 'Library',
    },
    {
      id: 'hallway-6',
      type: 'hallway',
      label: 'Hallway 6',
    },
    {
      id: 'room-5',
      type: 'room',
      label: 'Billiard Room',
    },
    {
      id: 'hallway-7',
      type: 'hallway',
      label: 'Hallway 7',
    },
    {
      id: 'room-6',
      type: 'room',
      label: 'Dining Room',
    },
    {
      id: 'empty-11',
      type: 'empty',
    },

    // Row 5
    {
      id: 'entry-5',
      type: 'entry',
    },
    {
      id: 'hallway-8',
      type: 'hallway',
      label: 'Hallway 8',
    },
    {
      id: 'empty-12',
      type: 'empty',
    },
    {
      id: 'hallway-9',
      type: 'hallway',
      label: 'Hallway 9',
    },
    {
      id: 'empty-13',
      type: 'empty',
    },
    {
      id: 'hallway-10',
      type: 'hallway',
      label: 'Hallway 10',
    },
    {
      id: 'entry-6',
      type: 'entry',
    },

    // Row 6
    {
      id: 'empty-14',
      type: 'empty',
    },
    {
      id: 'room-7',
      type: 'room',
      label: 'Conservatory',
      secretPassageTo: 'room-3',
    },
    {
      id: 'hallway-11',
      type: 'hallway',
      label: 'Hallway 11',
    },
    {
      id: 'room-8',
      type: 'room',
      label: 'Ballroom',
    },
    {
      id: 'hallway-12',
      type: 'hallway',
      label: 'Hallway 12',
    },
    {
      id: 'room-9',
      type: 'room',
      label: 'Kitchen',
      secretPassageTo: 'room-1',
    },
    {
      id: 'empty-15',
      type: 'empty',
    },
    //Row 7
    {
      id: 'empty-16',
      type: 'empty',
    },
    {
      id: 'empty-17',
      type: 'empty',
    },
    {
      id: 'entry-7',
      type: 'entry',
    },
    {
      id: 'empty-19',
      type: 'empty',
    },
    {
      id: 'entry-8',
      type: 'entry',
    },
    {
      id: 'empty-21',
      type: 'empty',
    },
    {
      id: 'empty-22',
      type: 'empty',
    },
  ],
  weapons: [
    {
      id: 'weapon-1',
      name: 'Candlestick',
    },
    {
      id: 'weapon-2',
      name: 'Dagger',
    },
    {
      id: 'weapon-3',
      name: 'Lead Pipe',
    },
    {
      id: 'weapon-4',
      name: 'Revolver',
    },
    {
      id: 'weapon-5',
      name: 'Rope',
    },
    {
      id: 'weapon-6',
      name: 'Wrench',
    },
  ],
  cards: [
    { id: 'card-1', type: 'suspect', name: 'Miss Scarlet' },
    { id: 'card-2', type: 'suspect', name: 'Colonel Mustard' },
    { id: 'card-3', type: 'suspect', name: 'Mrs. White' },
    { id: 'card-4', type: 'suspect', name: 'Mr. Green' },
    { id: 'card-5', type: 'suspect', name: 'Mrs. Peacock' },
    { id: 'card-6', type: 'suspect', name: 'Professor Plum' },
    { id: 'card-7', type: 'weapon', name: 'Candlestick' },
    { id: 'card-8', type: 'weapon', name: 'Dagger' },
    { id: 'card-9', type: 'weapon', name: 'Lead Pipe' },
    { id: 'card-10', type: 'weapon', name: 'Revolver' },
    { id: 'card-11', type: 'weapon', name: 'Rope' },
    { id: 'card-12', type: 'weapon', name: 'Wrench' },
    { id: 'card-13', type: 'room', name: 'Study' },
    { id: 'card-14', type: 'room', name: 'Hall' },
    { id: 'card-15', type: 'room', name: 'Lounge' },
    { id: 'card-16', type: 'room', name: 'Library' },
    { id: 'card-17', type: 'room', name: 'Billiard Room' },
    { id: 'card-18', type: 'room', name: 'Dining Room' },
    { id: 'card-19', type: 'room', name: 'Conservatory' },
    { id: 'card-20', type: 'room', name: 'Ballroom' },
    { id: 'card-21', type: 'room', name: 'Kitchen' },
  ],
};
