import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import "./index.css";

import { LazyAbout } from "@/pages/about/About.lazy";
import { LazyAdmin } from "@/pages/admin/Admin.lazy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback="Loading....">
            <LazyAbout />,
          </Suspense>
        ),
      },
      {
        path: "/admin",
        element: (
          <Suspense fallback="Loading....">
            <LazyAdmin />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
