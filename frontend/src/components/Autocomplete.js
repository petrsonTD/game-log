import { useEffect, useRef, useState } from "react";
import GameDetail from "./GameDetail";

//TODO create autocomplete component

function Autocomplete() {
  const [isFetching, setIsFetching] = useState(false);
  const [availableGames, setAvailableGames] = useState([]);
  const [error, setError] = useState();

  const [filteredGames, setFilteredGames] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [gameId, setGameId] = useState("");

  const dialog = useRef();

  // useEffect(() => {
  //     async function fetchGames() {
  //         setIsFetching(true)

  //         try {
  //             const response = await fetch("/api/games");
  //             const resData = await response.json();

  //             if (!response.ok) {
  //                 throw new Error("Failed to fetch games")
  //             }

  //             setAvailableGames(resData);
  //             setFilteredGames(resData.slice(0, 10));
  //         } catch (error) {
  //             setError({
  //                 message: error.message || "Could not fetch games, please try again later."
  //             });
  //         }

  //         setIsFetching(false);
  //     }

  //     fetchGames();
  // }, []);

  function filterGames(event) {
    setFilteredGames(availableGames.filter(game => game.title.toLowerCase().includes(event.target.value.toLowerCase())).slice(0, 10));
  }

  function findGameDetails(event) {
    dialog.current.showModal();
    setGameId(event.target.value);
  }

  function closeList() {
    setTimeout(() => {
      setIsFocused(false);
    }, 10); //TODO solve this better without timeout
  }

  return (
    <div className="relative self-end">
      <input
        disabled
        title="This element is not finished yet."
        className="px-2 w-40 rounded-md font-normal text-base"
        placeholder="Search (disabled)"
        onFocus={() => setIsFocused(true)}
        onBlur={closeList}
        onChange={filterGames}
      />
      {isFocused && <ul className="absolute bg-white">
        {filteredGames.map(game => (
          <li
            className="hover:bg-slate-300 px-2"
            key={game.id}
            value={game.id}
            onMouseDown={findGameDetails}
          >
            {game.title}
          </li>
        ))}
      </ul>}
      {/* {<GameDetail ref={dialog} id={gameId} />} */}
    </div>
  );
}

export default Autocomplete;
