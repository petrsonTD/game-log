import { Link, redirect, useLocation } from "react-router-dom";
import Autocomplete from "./Autocomplete";
import { UserContext } from "../UserContextProvider";
import { useContext } from "react";

function MainNavigation() {
  const { user, removeUser } = useContext(UserContext);
  
  const location = useLocation();
  // const token = getAuthToken(); //TODO change for CONTEXT

  function logout() {
    removeUser();
    return redirect("/");
  }

  return (
    <div className="py-5 flex text-xl font-bold justify-between">
      <div>
        {location.pathname !== "/" && (<Link to="/" className="">
          <span className="text-slate-50 font-bold underline">game</span>
          <span className="text-slate-50 font-bold">-log</span>
        </Link>)}
      </div>
      <div className="flex justify-end">
        {user && <button className="mr-3" onClick={logout}>Log out</button>}
        {!user && <Link to="/auth?mode=login" className="mr-3">Log in</Link>}
        <Link to="/games" className="mr-3">Games</Link>
        <Autocomplete />
      </div>
    </div>
  )
}

export default MainNavigation;
