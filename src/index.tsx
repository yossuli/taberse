import { Hono } from "hono";
import { renderToString } from "react-dom/server";
import { createApp } from "honox/server";
import { showRoutes } from "hono/dev";

const base = new Hono();

base.get("*", (c, next) => {
  console.log(c.req.url);
  if (c.req.url.includes("/api")) {
    console.log("API request", c.req.url);
    return next();
  }
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            rel="stylesheet"
            href="https://cdn.simplecss.org/simple.min.css"
          />
          {import.meta.env.PROD ? (
            <script type="module" src="/static/client.js"></script>
          ) : (
            <script type="module" src="/app/client.tsx"></script>
          )}
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  );
});

const app = createApp({ app: base });
showRoutes(app);

export default app;
