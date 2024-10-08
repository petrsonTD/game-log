import { Link } from "react-router-dom";
import GamesList from "../components/GamesList";
import { useFetch } from "../hooks/useFetch";

function GamesPage() {
  const {
    isLoading: isLoadingGames,
    data: fetchedGames,
    error: errorGames
  } = useFetch("/api/games");

  return (
    <>
      <Link to="new-game" className="px-2 py-1.5 bg-green-600 font-medium text-xs uppercase rounded shadow-md hover:bg-green-700 active:bg-green-800 transition duration-150 ease-in-out">Add new game</Link>
      <div style={{ textAlign: "center" }}>
        {isLoadingGames && <p>Loading...</p>}
        {errorGames && <p>{errorGames}</p>}
      </div>
      {!isLoadingGames && fetchedGames && <GamesList games={fetchedGames.games} />}
    </>
  );
}

export default GamesPage;
