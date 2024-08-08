import Database from "better-sqlite3";

const db = new Database("game-log.db");

// get all genres
export const getGenres = (req, res) => {
    const getQuery = "SELECT * FROM genres";
    const genres = db.prepare(getQuery).all();

    if (genres < 1) {
        return res.status(204);
    }
    
    res.status(200).json({genres: genres});
};
