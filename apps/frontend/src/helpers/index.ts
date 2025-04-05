export { default as client } from './https';
export { getTempUserData, storeTempUserData, type User } from './userHandler';
export { roomWebSocketConnector, sendWSMessage } from './webSocketHandler';

// "board": {
//     "rooms": ["Study", "Hall", "Lounge", "Library", "Billiard Room", "Dining Room", "Conservatory", "Ballroom", "Kitchen"],
//     "weapons": ["Knife", "Revolver", "Rope", "Lead Pipe", "Wrench", "Candlestick"],
//     "characters": ["Miss Scarlet", "Col. Mustard", "Mrs. White", "Mr. Green", "Mrs. Peacock", "Prof. Plum"],
//     "hallways": [("Study", "Hall"), ("Hall", "Lounge"), ("Study", "Library"), ("Hall", "Billiard Room"),
//                  ("Lounge", "Dining Room"), ("Library", "Billiard Room"), ("Billiard Room", "Dining Room"),
//                  ("Library", "Conservatory"), ("Billiard Room", "Ballroom"), ("Dining Room", "Kitchen")],
//     "secret_passages": {
//         "Study": "Kitchen",
//         "Kitchen": "Study",
//         "Lounge": "Conservatory",
//         "Conservatory": "Lounge"
//     }
// },
