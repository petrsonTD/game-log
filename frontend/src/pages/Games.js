import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GamesList from '../components/GamesList';

function GamesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedGames, setFetchedGames] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchGames() {
      setIsLoading(true);
      const response = await fetch('/api/games');

      if (!response.ok) {
        setError('Fetching games failed.');
      } else {
        const resData = await response.json();
        setFetchedGames(resData.games);
      }
      setIsLoading(false);
    }

    fetchGames();
  }, []);

  return (
    <>
      <Link to="new-game" className="px-2 py-1.5 bg-green-600 font-medium text-xs uppercase rounded shadow-md hover:bg-green-700 active:bg-green-800 transition duration-150 ease-in-out">Add new game</Link>
      <div style={{ textAlign: 'center' }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && fetchedGames && <GamesList games={fetchedGames} />}
    </>
  );
}

export default GamesPage;
