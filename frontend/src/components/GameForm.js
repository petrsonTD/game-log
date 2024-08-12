import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContextProvider";

function GameForm({ game, genres, method }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  async function onSubmit(formData) {
    formData.preventDefault();
    const data = new FormData(formData.target);
    const formDataObj = Object.fromEntries(data.entries());

    const response = await fetch("/api/games", {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user.token
      },
      body: JSON.stringify(formDataObj)
    })

    if (response.ok) {
      const data = await response.json();
      const gameId = data.id;

      navigate(`/games/${gameId}`);
    }
  }

  return(
    <form method={method} onSubmit={onSubmit} className="space-y-6 bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 max-w-md mx-auto text-slate-200 mt-10">
      {method === "PATCH" && <input name="id" hidden readOnly value={game.id} />}
      <div>
        <label htmlFor="title" className="block text-base font-semibold text-slate-200">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={game ? game.title : ""}
          className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-200"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-base font-semibold text-slate-200">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={game ? game.description : ""}
          className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-200"
        />
      </div>

      <div>
        <label htmlFor="coverImg" className="block text-base font-semibold text-slate-200">Image</label>
        <input
          id="coverImg"
          type="url"
          name="coverImg"
          required
          defaultValue={game ? game.coverImg : ""}
          className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-200"
        />
      </div>

      <div>
        <label htmlFor="releaseYear" className="block text-base font-semibold text-slate-200">Release year</label>
        <input
          id="releaseYear"
          type="number"
          name="releaseYear"
          required
          defaultValue={game ? game.releaseYear : ""}
          className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-200"
        />
      </div>

      <div>
        <label htmlFor="genreId" className="block text-base font-semibold text-slate-200">Genres</label>
        <select
          id="genreId"
          name="genreId"
          required
          defaultValue={game ? game.genreId : ""}
          className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-200"
        >
          <option value="">Select a genre</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out">
          Submit
        </button>
        <Link to="../" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 underline transition duration-200">
          Back to list
        </Link>
      </div>
    </form>
  )
}

export default GameForm;
