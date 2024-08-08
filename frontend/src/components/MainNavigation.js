import { Link, useLocation } from "react-router-dom";
import Autocomplete from "./Autocomplete";

function MainNavigation() {
  const location = useLocation();

  return (
    <div className="py-5 flex text-xl font-bold justify-between">
      <div>
        {location.pathname !== "/" && <Link to="/" className="">
          <span className="text-slate-50 font-bold underline">game</span>
          <span className="text-slate-50 font-bold">-log</span>
        </Link>}
      </div>
      <div className="flex justify-end">
        <Link to="/login" className="mr-3">Log in</Link>
        <Link to="/login" className="mr-3">Register</Link>
        <Link to="/games" className="mr-3">Games</Link>
        <Autocomplete />
      </div>
    </div>
  )
}

export default MainNavigation;
