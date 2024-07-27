export const queryCreateRanks = `
  CREATE TABLE ranks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  )
`;

export const queryCreateUsers = `
  CREATE TABLE users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    rankId TEXT,
    FOREIGN KEY (rankId) REFERENCES ranks(id) ON DELETE SET NULL ON UPDATE CASCADE
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
    title TEXT NOT NULL UNIQUE,
    description TEXT,
    genreId TEXT,
    releaseDate NUMERIC,
    coverImg TEXT,
    FOREIGN KEY (genreId) REFERENCES genres(id) ON DELETE SET NULL ON UPDATE CASCADE
  )
`;

//TODO add table for platforms like PS3, PS4, Xbox, Switch etc...
//TODO add connnecting table for games and plarforms.

export const queryCreateUserReviews = `
  CREATE TABLE reviews (
    id TEXT PRIMARY KEY,
    gameId TEXT,
    userId TEXT,
    score NUMERIC,
    FOREIGN KEY (gameId) REFERENCES games(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
  )
`;
