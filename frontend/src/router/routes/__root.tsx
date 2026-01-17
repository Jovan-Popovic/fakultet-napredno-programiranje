import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { MinimalLayout } from "@/layouts/minimal";
import { NotFound } from "@/pages/errors/not-found";

export type RouterContext = object;

const RootComponent = () => {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: (props) => <MinimalLayout element={<NotFound {...props} />} />,
});
