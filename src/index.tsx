import { serve } from "bun";
import root from "./index.html";

const server = serve({
  routes: {
    "/*": root,

    // dev only; on Pages all requests go through the browser router instead.
    // the MDX files are copied to a `raw` directory during the build.
    "/crochet/raw/:*": {
      async GET(req) {
        return new Response(Bun.file(`./posts/${req.params["*"]}`));
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
