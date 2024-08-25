import Body from "../components/Body";
import { useFetch } from "../hooks/useFetch";

function HomePage() {
  const {
    isLoading,
    data,
    error
  } = useFetch("/api/games/trending");

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && data && <Body trendingGames={data.games} />}
    </>
  );
}

export default HomePage;
