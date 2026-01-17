import { RouterProvider, createRouter } from "@tanstack/react-router";
import { type FC } from "react";

import { routeTree } from "./routes-tree.gen";

// Create router once outside component to prevent recreation on re-renders
const router = createRouter({
  routeTree,
  context: {},
  scrollRestoration: true,
});

type Props = object;

export const AppRouter: FC<Props> = () => {
  // Pass context through RouterProvider - updates without recreating router
  return <RouterProvider router={router} />;
};
