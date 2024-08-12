import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import UserContextProvider from "../UserContextProvider";

function RootLayout() {
  return (
    <UserContextProvider>
      <div className="bg-gradient-to-b from-red-950 via-blue-950 max-h-screen min-h-screen text-slate-50">
        <div className="container mx-auto">
          <MainNavigation />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </UserContextProvider>
  )
}

export default RootLayout;
