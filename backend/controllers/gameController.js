import Database from "better-sqlite3";

const db = new Database("game-log.db");

// get all games
export const getGames = (req, res) => {
    const getQuery = "SELECT * FROM games";
    const games = db.prepare(getQuery).all();

    if (games < 1) {
        return res.status(204);
    }
    
    res.status(200).json(games);
};

// get a single game
export const getGame = (req, res) => {
    const { id } = req.params;

    const getQuery = db.prepare("SELECT * FROM games where id = ?");
    const game = getQuery.get(id);
  
    if (!game) {
        return res.status(400).json({ error: "No such game" });
    }

    res.status(200).json(game);
};

// create a new game
export const createGame = (req, res) => {
    const { gameTitle } = req.body;

    if (!gameTitle) {
        res.status(400).json({ error: "Missing title!" });
    }

    const checkQuery = db.prepare("SELECT * FROM games where title = ?");
    const checkGame = checkQuery.get(gameTitle);

    if (checkGame) {
        return res.status(400).json({ error: "Game with this title already exists." });
    }

    try {
        const createQuery = db.prepare("INSERT INTO games (title) VALUES (?)");
        const game = createQuery.run(gameTitle);
        
        res.status(201).json(game);
    } catch (error) {
        res.status(500).json({ error: "Error, please try later." });
    }
};

// update a game
export const updateGame = (req, res) => {
    const { id } = req.params;
    const { newTitle } = req.body;

    const checkQuery = db.prepare("SELECT * FROM games where id = ?");
    const checkGame = checkQuery.get(id);

    if (!checkGame) {
        return res.status(400).json({ error: "No such game" });
    }

    const updateQuery = db.prepare("UPDATE games SET title = @title WHERE id = @id;");
    const updateGame = updateQuery.run({
        id: id,
        title: newTitle
    })

    res.status(200).json(updateGame);
};

// delete a game
export const deleteGame = (req, res) => {
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
