import { useEffect, useState } from "react";
import GameForm from "../components/GameForm";

function NewGamePage() {
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
      {!isLoading && fetchedGenres && <GameForm game={null} genres={fetchedGenres} />}
    </>
  )
}

export default NewGamePage;
