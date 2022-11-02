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
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    path: "/explore",
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    path: "/notifications",
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    path: "/messages",
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    path: "/bookmarks",
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    path: "/lists",
    element: lazy(() => import("@pages/Main")),
  },
  {
    isPublic: false,
    path: "/user_name",
    element: lazy(() => import("@pages/Main")),
  },
];

export default routes;
