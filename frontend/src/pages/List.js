import GamesList from "../components/GamesList";
import { useFetch } from "../hooks/useFetch";

function ListPage() {
  const {
    isLoading: isLoadingGames,
    data: fetchedGames,
    error: errorGames
  } = useFetch("/api/lists");

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {isLoadingGames && <p>Loading...</p>}
        {errorGames && <p>{errorGames}</p>}
      </div>
      {!isLoadingGames && fetchedGames && <GamesList games={fetchedGames.games} />}
    </>
  );
}

export default ListPage;
