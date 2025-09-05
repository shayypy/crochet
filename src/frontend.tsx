/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./App";
import PostRoute from "./routes/p.$slug";

const elem = document.getElementById("root")!;
const app = (
  <StrictMode>
    {/* basename because we have not deployed to our cname yet */}
    <BrowserRouter basename="/crochet">
      <Routes>
        <Route index element={<App />} />
        <Route path="/p/:slug" element={<PostRoute />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(app);
}
