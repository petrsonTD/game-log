import Database from "better-sqlite3";
import { nanoid } from "nanoid";

const db = new Database("game-log.db");

// get all games
export const getGames = (req, res) => {
    const getQuery = "SELECT * FROM games";
    const games = db.prepare(getQuery).all();

    if (games < 1) {
        return res.status(204);
    }
    
    res.status(200).json({games: games});
};

// get a single game
export const getGame = async (req, res) => {
    const { id } = req.params;

    const getQuery = db.prepare("SELECT * FROM games where id = ?");
    const game = getQuery.get(id);
  
    if (!game) {
        return res.status(400).json({ error: "No such game" });
    }

    res.status(200).json({game: game});
};

// create a new game
export const createGame = (req, res) => {
    if (!req.token.isAdmin) {
        return res.status(401).json({ error: "User can't add games." });
    }

    const {
        title,
        description,
        coverImg,
        releaseYear,
        genreId
    } = req.body;

    const newId = nanoid();

    let errors = {};

    if (!title) {
        errors.title = "Invalid title."
    }

    if (!description) {
        errors.description = "Invalid description."
    }

    if (!coverImg) {
        errors.coverImg = "Invalid coverImg."
    }

    if (!releaseYear) {
        errors.releaseYear = "Invalid releaseYear."
    }

    if (!genreId) {
        errors.genreId = "Invalid genreId."
    }

    if (Object.keys(errors).length > 0) {
        return res.status(422).json({
            message: "Adding the game failed due to validation errors.",
            errors
        })
    }

    const checkQuery = db.prepare("SELECT * FROM games where title = ?");
    const checkGame = checkQuery.get(title);

    if (checkGame) {
        return res.status(400).json({ error: "Game with this title already exists." });
    }

    try {
        const createQuery = db.prepare("INSERT INTO games (id, title, description, coverImg, releaseYear, genreId) VALUES (?, ?, ?, ?, ?, ?)");
        createQuery.run(
            newId,
            title,
            description,
            coverImg,
            releaseYear,
            genreId
        );
        
        res.status(201).json({ id: newId });
    } catch (error) {
        res.status(500).json({ error: "Error, please try later." });
    }
};

// update a game
export const updateGame = (req, res) => {
    if (!req.token.isAdmin) {
        return res.status(401).json({ error: "User can't edit games." });
    }

    const {
        id,
        title,
        description,
        coverImg,
        releaseYear,
        genreId
    } = req.body;

    const checkQuery = db.prepare("SELECT * FROM games where id = ?");
    const checkGame = checkQuery.get(id);

    if (!checkGame) {
        return res.status(400).json({ error: "No such game" });
    }

    //TODO add check for same duplicited name

    const updateQuery = db.prepare("UPDATE games SET title = @title, description = @description, coverImg = @coverImg, releaseYear = @releaseYear, genreId = @genreId WHERE id = @id;");
    updateQuery.run({
        id,
        title,
        description,
        coverImg,
        releaseYear,
        genreId
    })

    res.status(200).json({ id: id });
};

// delete a game
export const deleteGame = (req, res) => {
    if (!req.token.isAdmin) {
        return res.status(401).json({ error: "User can't delete games." });
    }

    const { id } = req.params;

    const checkQuery = db.prepare("SELECT * FROM games where id = ?");
    const checkGame = checkQuery.get(id);

    if (!checkGame) {
        return res.status(400).json({ error: "No such game" });
    }

    const deleteQuery = db.prepare("DELETE FROM games WHERE id = ?");
    const game = deleteQuery.run(id);

    res.status(200).json({message: "Game was deleted successfully."});
};
