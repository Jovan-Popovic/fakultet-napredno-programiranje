import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type FC } from "react";

import { DialogProvider } from "./components/ui/dialog/context";
import { NotificationProvider } from "./components/ui/notifications/context";
import { ThemeProvider } from "./contexts/theme";
import { queryClient } from "./queries";
import { AppRouter } from "./router";

type Props = object;

export const App: FC<Props> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <ThemeProvider>
          <DialogProvider>
            <AppRouter />
            <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
          </DialogProvider>
        </ThemeProvider>
      </NotificationProvider>
    </QueryClientProvider>
  );
};
