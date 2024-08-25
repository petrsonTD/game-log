import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContextProvider";

function Body({ trendingGames }) {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full min-h-full container mx-auto pt-5 md:mt-16 pb-10">
      <h1 className="font-bold text-4xl sm:text-6xl md:text-8xl">
        <span className="underline">game</span>
        <span>-log</span>
      </h1>
      <h2 className="text-slate-400 font-medium md:text-3xl text-xl mt-6 mb-16">Discover, collect, analyze your games</h2>
      {user ? (
        <>
          <span className="text-slate-400">{"Hello "}</span>
          <span className="font-bold">{user.username}</span>
          <span className="text-slate-400">{" would you like to see your "}</span>
          <Link to="list" className="font-bold">list</Link>
          <span className="text-slate-400">?</span>
        </>
      ) : (
        <>
          <Link to="auth?mode=signup" className="px-2 py-1.5 bg-green-600 font-medium text-xs uppercase rounded shadow-md hover:bg-green-700 active:bg-green-800 transition duration-150 ease-in-out">Create a free account</Link>
          <span className="text-slate-400">{" or "}</span>
          <Link to="auth?mode=login" className="font-bold">log in</Link>
          <span className="text-slate-400">{" if you have an account"}</span>
        </>
      )}
      <div className="mt-6 md:mt-11">
        <h3 className="font-medium text-2xl sm:text-3xl text-center sm:text-left">Recently trending</h3>
        <ul className="flex flex-col sm:flex-row mt-10 gap-11">
          {trendingGames.map(game => (
            <div key={game.title} className="">
              <img className="max-h-36 mx-auto sm:max-h-64" src={game.coverImg} />
              <p className="sm:hidden mt-3 text-center">{game.title}</p>
            </div>
          ))}
        </ul>
      </div>
      <div className="mt-6 md:mt-11">
        <h3 className="font-medium text-2xl md:text-3xl">{"What is "}
          <span className="underline">game</span>
          <span>-log</span>
          ?
        </h3>
        <p className="text-slate-400 mt-2">
          <span className="text-slate-50 font-bold underline">game</span>
          <span className="text-slate-50 font-bold">-log</span>
          {" is a place to virtually track your game collection. Keep your backlog updated, rate the games you've played and add those upcoming to your wishlist. Share your gaming journey with your friends by following each other to keep up-to-date on your latest play sessions."}</p>
      </div>
    </div>
  );
}

export default Body;
