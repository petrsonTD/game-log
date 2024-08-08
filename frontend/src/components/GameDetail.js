import { Link, useNavigate } from "react-router-dom";

function GameDetail({ game }) {
  const navigate = useNavigate();

  async function deleteGame() {
    const response = await fetch(`/api/games/${game.id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      const data = await response.json();
      const gameId = data.id;

      navigate("../");
    }
  }

  return(
    <div className="flex">
      <img src={game.coverImg} alt={game.title}/>
      <div className="ml-5 flex flex-col justify-between w-full">
        <div className="">
          <h3 className="font-medium text-3xl mb-5">{game.title}</h3>
          <p className="mb-5">
            {game.description}
          </p>
          <p className="mb-5">
            <label>Release year: </label>
            {game.releaseYear}
          </p>
          <p className="mb-5">
            <label>Genre: </label>
            {game.genreId}
          </p>
        </div>
        <div className="mb-5 flex justify-between">
          <div className="">
            <Link to="../" className="px-2 py-1.5 mr-3 bg-red-600 font-medium text-xs uppercase rounded shadow-md hover:bg-red-700 active:bg-red-800 transition duration-150 ease-in-out">
              Add to my list
            </Link>
            <Link to="../" className="px-2 py-1.5 bg-red-600 font-medium text-xs uppercase rounded shadow-md hover:bg-red-700 active:bg-red-800 transition duration-150 ease-in-out">
              Back to list
            </Link>
          </div>
          <div>
            <Link to="edit" className="px-2 py-1.5 mr-3 bg-red-600 font-medium text-xs uppercase rounded shadow-md hover:bg-red-700 active:bg-red-800 transition duration-150 ease-in-out">
              Edit game
            </Link>
            <button type="button" onClick={deleteGame} className="px-2 py-1.5 bg-red-600 font-medium text-xs uppercase rounded shadow-md hover:bg-red-700 active:bg-red-800 transition duration-150 ease-in-out">
              Delete game
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetail;
