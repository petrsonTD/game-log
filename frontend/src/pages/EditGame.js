import { useParams } from "react-router-dom";
import GameForm from "../components/GameForm";
import { useFetch } from "../hooks/useFetch";

function EditGamePage() {
  const { gameId } = useParams();

  const {
    isLoading: isLoadingGame,
    data: fetchedGame,
    error: errorGame
  } = useFetch(`/api/games/${gameId}`);

  const {
    isLoading: isLoadingGenres,
    data: fetchedGenres,
    error: errorGenres
  } = useFetch("/api/genres");

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {(isLoadingGame || isLoadingGenres) && <p>Loading...</p>}
        {errorGame && <p>{errorGame}</p>}
        {errorGenres && <p>{errorGenres}</p>}
      </div>
      {!isLoadingGame && !isLoadingGenres && fetchedGame && fetchedGenres && <GameForm game={fetchedGame.details} genres={fetchedGenres.genres} method="PATCH" />}
    </>
  );
}

export default EditGamePage;
