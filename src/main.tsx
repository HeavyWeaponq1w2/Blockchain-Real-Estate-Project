import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Admin from "./routes/admin";
import Index from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "admin",
    element: <Admin />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
