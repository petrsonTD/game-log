import Database from "better-sqlite3";

const db = new Database("game-log.db");

// get all status
export const getStatus = (req, res) => {
    const getQuery = "SELECT * FROM status";
    const status = db.prepare(getQuery).all();

    if (status < 1) {
        return res.status(204);
    }
    
    res.status(200).json({status: status});
};
