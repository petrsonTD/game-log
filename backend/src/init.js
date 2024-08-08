import Database from "better-sqlite3";
import { queryCreateRanks, queryCreateUsers, queryCreateGenres, queryCreateGames, queryCreateUserReviews } from "./initTables.js";
import { dataRanks, dataUsers, dataGenres } from "./initData.js";
import { dataGames } from "./initData.js";

const db = new Database('game-log.db');

// dopping tables in database
db.exec(`
  DROP TABLE IF EXISTS ranks;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS genres;
  DROP TABLE IF EXISTS games;
  DROP TABLE IF EXISTS reviews;
`);
console.log('Tables deleted successfully.');

// creating tables in database
db.transaction(() => {
  db.prepare(queryCreateRanks).run();
  db.prepare(queryCreateUsers).run();
  db.prepare(queryCreateGenres).run();
  db.prepare(queryCreateGames).run();
  db.prepare(queryCreateUserReviews).run();
})();
console.log('Tables created successfully.');

// inserting data to database
const insertRank = db.prepare('INSERT INTO ranks (id, name) VALUES (?, ?)');
const insertUser = db.prepare('INSERT INTO users (id, username, password, rankId) VALUES (?, ?, ?, ?)');
const insertGenre = db.prepare('INSERT INTO genres (id, name) VALUES (?, ?)');
const insertGame = db.prepare('INSERT INTO games (id, title, description, genreId, releaseYear, coverImg) VALUES (?, ?, ?, ?, ?, ?)');

db.transaction(() => {
  dataRanks.forEach(rank => insertRank.run(
    rank.id,
    rank.name
  ));
  dataUsers.forEach(user => insertUser.run(
    user.id,
    user.username,
    user.password,
    user.rankId
  ));
  dataGenres.forEach(genre => insertGenre.run(
    genre.id,
    genre.name
  ));
  dataGames.forEach(game => insertGame.run(
      game.id,
      game.title,
      game.description,
      game.genreId,
      game.releaseYear,
      game.coverImg
  ));
})();
console.log('Data inserted successfully.');

db.close();
