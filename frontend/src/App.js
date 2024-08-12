import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import GamesPage from "./pages/Games";
import GameDetailPage from "./pages/GameDetail";
import NewGamePage from "./pages/NewGame";
import RootLayout from "./pages/Root";
import AuthenticationPage from "./pages/Authhentication";
import EditGamePage from "./pages/EditGame";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "auth", element: <AuthenticationPage /> },
      {
        path: "games",
        children: [
          { path: "", element: <GamesPage /> },
          { path: ":gameId", element: <GameDetailPage /> },
          { path: ":gameId/edit", element: <EditGamePage /> },
          { path: "new-game", element: <NewGamePage /> }
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
