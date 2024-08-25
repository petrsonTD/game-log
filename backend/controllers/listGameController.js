import Database from "better-sqlite3";
import { nanoid } from "nanoid";

const db = new Database("game-log.db");

// get all listGames
export const getListGames = (req, res) => {
    const { userId } = req.token;
    // const getQuery = "SELECT * FROM games";
    // const games = db.prepare(getQuery).all();

    // if (games < 1) {
    //     return res.status(204);
    // }

    const query = `
        SELECT games.*
        FROM listGames
        JOIN games ON listGames.gameId = games.id
        WHERE listGames.userId = ?
    `;

    const stmt = db.prepare(query);
    const games = stmt.all(userId);
    console.log(games);

    res.status(200).json({ games: games });
};

// get a single listGame
// export const getGame = async (req, res) => {
//     const { id } = req.params;

//     const getQuery = db.prepare(`
//         SELECT games.id, games.title, games.description, games.releaseYear, games.coverImg, genres.name as genre
//         FROM games
//         LEFT JOIN genres ON games.genreId = genres.id
//         WHERE games.id = ?
//     `);
//     const game = getQuery.get(id);

//     if (!game) {
//         return res.status(400).json({ error: "No such game" });
//     }

//     res.status(200).json({ game });
// };

// POST add new game to user's list
export const addGameToUsersList = (req, res) => {
    const { gameId, statusId } = req.body;
    const { userId } = req.token;


    const newId = nanoid();

    let errors = {};

    if (!gameId) {
        return res.status(400).json({ error: "Missing game ID." });
    }

    // Check if user already has game in hist list
    const alreadyExistQuery = db.prepare("SELECT * FROM listGames WHERE userId = ? AND gameId = ? LIMIT 1");
    const alreadyExist = alreadyExistQuery.get(userId, gameId);

    if (alreadyExist) {
        return res.status(400).json({ error: "You already have this game in your list." });
    }

    const checkQuery = db.prepare("SELECT * FROM games where id = ?");
    const checkGame = checkQuery.get(gameId);

    if (!checkGame) {
        return res.status(400).json({ error: "Game with this id doesn't exists." });
    }

    try {
        const createQuery = db.prepare("INSERT INTO listGames (id, userId, gameId, statusId) VALUES (?, ?, ?, ?)");
        createQuery.run(
            newId,
            userId,
            gameId,
            statusId
        );

        res.status(201).json({ id: newId });
    } catch (error) {
        res.status(500).json({ error: "Error, please try later." });
    }
};

// PATCH uppdate status of user's game in list
export const updateListGameStatus = (req, res) => {
    const {
        gameId,
        statusId
    } = req.body;
    const { userId } = req.token;

    const checkQuery = db.prepare("SELECT * FROM games where id = ?");
    const checkGame = checkQuery.get(gameId);

    if (!checkGame) {
        return res.status(400).json({ error: "No such game" });
    }

    const updateQuery = db.prepare("UPDATE listGames SET statusId = @statusId WHERE userId = @userId AND gameId = @gameId;");
    updateQuery.run({
        userId,
        gameId,
        statusId
    });

    res.status(200).json({ message: "Status changed successfully." });
};

// DELETE delete game from user's list
export const deleteGameFromUsersList = (req, res) => {
    const { gameId } = req.params;
    const { userId } = req.token;

    const checkQuery = db.prepare("SELECT * FROM games where id = ?");
    const checkGame = checkQuery.get(gameId);

    if (!checkGame) {
        return res.status(400).json({ error: "No such game" });
    }

    const deleteQuery = db.prepare("DELETE FROM listGames WHERE userId = ? AND gameId = ?");
    deleteQuery.run(userId, gameId);

    res.status(200).json({ message: "Game was deleted successfully from your list." });
};
