import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameDetail from "../components/GameDetail";

function GameDetailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedGame, setFetchedGame] = useState(null);
  const [error, setError] = useState();

  const { gameId } = useParams();

  useEffect(() => {
    async function fetchGames() {
      setIsLoading(true);
      const response = await fetch(`/api/games/${gameId}`);

      if (!response.ok) {
        setError('Fetching games failed.');
      } else {
        const resData = await response.json();
        setFetchedGame(resData.game);
      }
      setIsLoading(false);
    }

    fetchGames();
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && fetchedGame && <GameDetail game={fetchedGame} />}
    </>
  );
}

export default GameDetailPage;
