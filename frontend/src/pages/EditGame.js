import { useEffect, useState } from "react";
import GameForm from "../components/GameForm";
import { useParams } from "react-router-dom";

function EditGamePage() {
  const [isLoadingGame, setIsLoadingGame] = useState(false);
  const [fetchedGame, setFetchedGame] = useState();
  const [errorGam, setErrorGame] = useState();

  const { gameId } = useParams();

  useEffect(() => {
    async function fetchGames() {
      setIsLoadingGame(true);
      const response = await fetch(`/api/games/${gameId}`);

      if (!response.ok) {
        setErrorGame('Fetching games failed.');
      } else {
        const resData = await response.json();
        setFetchedGame(resData.game);
      }
      setIsLoadingGame(false);
    }

    fetchGames();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedGenres, setFetchedGenres] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchGenres() {
      setIsLoading(true);
      const response = await fetch('/api/genres');

      if (!response.ok) {
        setError('Fetching genres failed.');
      } else {
        const resData = await response.json();
        setFetchedGenres(resData.genres);
      }
      setIsLoading(false);
    }

    fetchGenres();
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && fetchedGame && fetchedGenres && <GameForm game={fetchedGame} genres={fetchedGenres} />}
    </>
  )
}

export default EditGamePage;
