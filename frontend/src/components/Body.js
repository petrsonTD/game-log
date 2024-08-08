import { Link } from "react-router-dom";

const trendingGames = [
  {
    name: "Elden Ring: Shadow of the Erdtree",
    img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7sly.jpg"
  },
  {
    name: "Zenless Zone Zero",
    img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8efw.jpg"
  },
  {
    name: "Elden Ring",
    img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg"
  },
  {
    name: "Portal",
    img: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7d.jpg"
  },
  {
    name: "Persona 3 Reload",
    img: "	https://images.igdb.com/igdb/image/upload/t_cover_big/co6z12.jpg"
  }
]

function Body() {
  return(
    <div className="w-full min-h-full container mx-auto mt-20">
      <h1 className="font-bold text-8xl">
        <span className="underline">game</span>
        <span>-log</span>
      </h1>
      <h2 className="text-slate-400 font-medium text-3xl mt-6 mb-16">Discover, collect, analyze your games</h2>
      <Link to="login" className="font-medium bg-red-600 py-2 px-3 rounded-md my-11">Create a free account</Link>
      <span className="text-slate-400">{" or "}</span>
      <Link to="login" className="font-bold">log in</Link>
      <span className="text-slate-400">{" if you have an account"}</span>
      <div className="mt-11">
        <h3 className="font-medium text-3xl">Recently trending</h3>
        <ul className="flex flex-row mt-5 gap-11">
          {trendingGames.map(game => (
            <div className="">
              <img className="max-h-64" src={game.img} />
            </div>
          ))}
        </ul>
      </div>
      <div className="mt-11">
        <h3 className="font-medium text-3xl">{"What is "}
          <span className="underline">game</span>
          <span>-log</span>
          ?
        </h3>
        <p className="text-slate-400">
          <span className="text-slate-50 font-bold underline">game</span>
          <span className="text-slate-50 font-bold">-log</span>
          {" is a place to virtually track your game collection. Keep your backlog updated, rate the games you've played and add those upcoming to your wishlist. Share your gaming journey with your friends by following each other to keep up-to-date on your latest play sessions."}</p>
      </div>
    </div>
  )
}

export default Body;
