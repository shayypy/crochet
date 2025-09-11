/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Index from "./routes";
import PostRoute from "./routes/p.$slug";

// biome-ignore lint/style/noNonNullAssertion: it's present
const elem = document.getElementById("root")!;

const queryClient = new QueryClient();

const App = () => {
  // useEffect(() => {
  //   if (location.pathname.startsWith("/crochet/p/")) {
  //     // Ensure only the yarn icon is showing
  //     const icon = document.querySelector<HTMLLinkElement>(
  //       'head>link[data-variant="basket"]',
  //     );
  //     if (icon) icon.remove();
  //   } else {
  //     // Ensure only the basket icon is showing
  //     const icon = document.querySelector<HTMLLinkElement>(
  //       'head>link[data-variant="yarn"]',
  //     );
  //     if (icon) icon.remove();
  //   }
  // }, []);

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        {/* basename because we have not deployed to our cname yet */}
        <BrowserRouter basename="/crochet">
          <Routes>
            <Route index Component={Index} />
            <Route path="/p/:slug" Component={PostRoute} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
};

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  // biome-ignore lint/suspicious/noAssignInExpressions: from template
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(<App />);
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(<App />);
}
