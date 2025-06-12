import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import './index.css'
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);
