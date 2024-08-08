import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  return (
    <div className="bg-gradient-to-b from-red-950 via-blue-950 max-h-screen min-h-screen text-slate-50">
      <div className="container mx-auto">
        <MainNavigation />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default RootLayout;
