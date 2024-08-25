import { useContext } from "react";
import { Link, redirect } from "react-router-dom";
import { UserContext } from "../UserContextProvider";

function GameDetail({ game, status, refetchGame }) {
  const { user } = useContext(UserContext);

  async function addGameToList() {
    const response = await fetch("/api/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user.token
      },
      body: JSON.stringify({ gameId: game.Details.id })
    });

    if (response.ok) {
      refetchGame();
    }
  }

  async function removeGameFromList() {
    const response = await fetch(`/api/lists/${game.Details.id}`, {
      method: "DELETE",
      headers: { "Authorization": "Bearer " + user.token }
    });

    if (response.ok) {
      refetchGame();
    }
  }

  async function changeGameStatus(e) {
    const statusId = e.target.value;

    await fetch("/api/lists", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user.token
      },
      body: JSON.stringify({ gameId: game.Details.id, statusId: statusId })
    });
  }

  async function deleteGame() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      const response = await fetch(`/api/games/${game.Details.id}`, {
        method: "DELETE",
        headers: { "Authorization": "Bearer " + user.token }
      });

      if (response.ok) {
        redirect("../");
      }
    }
  }

  return (
    <div className="gap-5 pt-5">
      <img className="float-left xs-float-none w-32 mr-5 mb-5" src={game.Details.coverImg} alt={game.Details.title} />
      <div className="text-justify">
        <h3 className="font-medium text-xl sm:text-3xl mb-5 text-left">{game.Details.title}</h3>
        <p className="text-sm sm:text-base mb-5">
          {game.Details.description}
        </p>
        <p className="mb-5">
          <label>Release year: </label>
          {game.Details.releaseYear}
        </p>
        <p className="mb-5">
          <label>Genre: </label>
          {game.Details.genre}
        </p>
      </div>
      <div className="mb-5 flex flex-col gap-5">
        <div className="flex-col flex sm:flex-row gap-5">
          {user && !game.listGame && (
            <button onClick={addGameToList} className="px-2 h-8 min-w-40 bg-green-600 font-medium text-xs uppercase rounded shadow-md hover:bg-green-700 active:bg-green-800 transition duration-150 ease-in-out">
              Add to my list
            </button>
          )}
          {user && game.listGame && (
            <button onClick={removeGameFromList} className="px-2 h-8 min-w-40 bg-red-600 font-medium text-xs uppercase rounded shadow-md hover:bg-red-700 active:bg-red-800 transition duration-150 ease-in-out">
              Remove from my list
            </button>
          )}
          {game.listGame && status && (
            <select
              onChange={changeGameStatus}
              defaultValue={game.listGame.statusId}
              className="px-2 h-8 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-200"
            >
              <option value="">Select a genre</option>
              {status.map(statu => (
                <option key={statu.id} value={statu.id}>
                  {statu.name}
                </option>
              ))}
            </select>
          )}
          <Link to="../" className="flex items-center justify-center px-2 h-8 min-w-32 font-medium text-xs uppercase rounded shadow-md bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition duration-150 ease-in-out">
            Back to list
          </Link>
        </div>
        {user?.isAdmin && (
          <div className="hidden sm:flex gap-5">
            <Link to="edit" className="flex items-center justify-center px-2 h-8 bg-red-600 font-medium text-xs uppercase rounded shadow-md hover:bg-red-700 active:bg-red-800 transition duration-150 ease-in-out">
              Edit game
            </Link>
            <button type="button" onClick={deleteGame} className="px-2 h-8 bg-red-600 font-medium text-xs uppercase rounded shadow-md hover:bg-red-700 active:bg-red-800 transition duration-150 ease-in-out">
              Delete game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameDetail;
