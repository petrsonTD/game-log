export const queryCreateUsers = `
  CREATE TABLE users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    rank TEXT
  )
`;

export const queryCreateGenres = `
  CREATE TABLE genres (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
  )
`;

export const queryCreateGames = `
  CREATE TABLE games (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    genreId TEXT,
    releaseYear NUMERIC,
    coverImg TEXT,
    FOREIGN KEY (genreId) REFERENCES genres(id) ON DELETE SET NULL ON UPDATE CASCADE
  )
`;

export const queryCreateStatus = `
  CREATE TABLE status (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  )
`;


export const queryCreateListGames = `
  CREATE TABLE listGames (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    gameId TEXT NOT NULL,
    statusId TEXT,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (gameId) REFERENCES games(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (statusId) REFERENCES status(id) ON DELETE SET NULL ON UPDATE CASCADE
  )
`;
