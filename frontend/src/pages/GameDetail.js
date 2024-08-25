import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContextProvider";
import GameDetail from "../components/GameDetail";
import { useFetch } from "../hooks/useFetch";

function GameDetailPage() {
  const { user } = useContext(UserContext);
  const { gameId } = useParams();

  const {
    isLoading: isLoadingGame,
    data: fetchedGame,
    error: errorGame,
    refetch: refetchGame
  } = useFetch(user ? `/api/games/${gameId}/user` : `/api/games/${gameId}`);

  const {
    data: fetchedStatus
  } = useFetch("/api/status");

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {isLoadingGame && <p>Loading...</p>}
        {errorGame && <p>{errorGame}</p>}
      </div>
      {!isLoadingGame && fetchedGame && <GameDetail game={fetchedGame} status={fetchedStatus?.status} refetchGame={refetchGame} />}
    </>
  );
}

export default GameDetailPage;
