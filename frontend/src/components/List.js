import { Link } from "react-router-dom";

function GamesList({ games }) {
  return (
    <ul className="flex flex-wrap mt-5 pb-10 gap-2">
      {games.map(game => (
        <li key={game.id} className="grow max-w-36">
          <Link to={game.id}>
            <div className="relative overflow-hidden rounded-sm group">
              <img
                src={game.coverImg}
                alt={game.title}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                <div className="text-white text-xl text-center px-2">
                  {game.title}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default GamesList;
