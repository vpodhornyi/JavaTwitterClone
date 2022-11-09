import {lazy} from "react";

const routes = [
  {
    isPublic: true,
    isLogin: true,
    path: "/",
    element: lazy(() => import("@pages/Auth")),
  },
  {
    isPublic: false,
    path: "/home",
    element: lazy(() => import("@pages/Home")),
  },
  {
    isPublic: false,
    path: "/explore",
    element: lazy(() => import("@pages/Home")),
  },
  {
    isPublic: false,
    path: "/notifications",
    element: lazy(() => import("@pages/Home")),
  },
  {
    isPublic: false,
    path: "/messages",
    element: lazy(() => import("@pages/Messages")),
  },
  {
    isPublic: false,
    path: "/bookmarks",
    element: lazy(() => import("@pages/Home")),
  },
  {
    isPublic: false,
    path: "/lists",
    element: lazy(() => import("@pages/Home")),
  },
  {
    isPublic: false,
    path: "/:user_name",
    element: lazy(() => import("@pages/Home")),
  },
];

export default routes;
