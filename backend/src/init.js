import Database from "better-sqlite3";
import { queryCreateUsers, queryCreateGenres, queryCreateGames, queryCreateStatus, queryCreateListGames } from "./initTables.js";
import { dataUsers, dataGenres, dataGames, dataStatus } from "./initData.js";

const db = new Database("game-log.db");

// dopping tables in database
db.exec(`
    DROP TABLE IF EXISTS listGames;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS genres;
    DROP TABLE IF EXISTS games;
    DROP TABLE IF EXISTS status;
`);
console.log("Tables deleted successfully.");

// creating tables in database
db.transaction(() => {
    db.prepare(queryCreateUsers).run();
    db.prepare(queryCreateGenres).run();
    db.prepare(queryCreateGames).run();
    db.prepare(queryCreateStatus).run();
    db.prepare(queryCreateListGames).run();
})();
console.log("Tables created successfully.");

// inserting data to database
const insertUser = db.prepare("INSERT INTO users (id, username, password, rank) VALUES (?, ?, ?, ?)");
const insertGenre = db.prepare("INSERT INTO genres (id, name) VALUES (?, ?)");
const insertGame = db.prepare("INSERT INTO games (id, title, description, genreId, releaseYear, coverImg) VALUES (?, ?, ?, ?, ?, ?)");
const insertStatus = db.prepare("INSERT INTO status (id, name) VALUES (?, ?)");

db.transaction(() => {
    dataUsers.forEach(user => insertUser.run(
        user.id,
        user.username,
        user.password,
        user.rank
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
    dataStatus.forEach(status => insertStatus.run(
        status.id,
        status.name
    ));
})();
console.log("Data inserted successfully.");

db.close();
