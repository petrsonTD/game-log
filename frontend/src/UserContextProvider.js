import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;

export const UserContext = createContext({
  user: {},
  addUser: () => {},
  removeUser: () => {}
});

export default function UserContextProvider({children}) {
  const [user, setUser] = useState(storedUser);
  const navigate = useNavigate();

  function addUser(newUser) {
    setUser(() => {
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    })
  }

  function removeUser() {
    setUser(() => {
      localStorage.removeItem("user");
      return null;
    });

    navigate("/")
  }

  function getTokenDuration() {
    if (!user) {
      return null;
    }

    const expirationDate = new Date(user.expiration);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
  }
    
  const ctxValue = {
    user: user,
    addUser: addUser,
    removeUser: removeUser
  }

  useEffect(() => {
    if (!user) {
      return;
    }

    // if (user.token === 'EXPIRED') {
    //   removeUser();
    //   return;
    // }

    const tokenDuration = getTokenDuration();

    setTimeout(removeUser, tokenDuration);
  }, [user]);

  console.log("getTokenDuration()", getTokenDuration());
    
  return (
    <UserContext.Provider value={ctxValue}>
      {children}
    </UserContext.Provider>
  )
}
