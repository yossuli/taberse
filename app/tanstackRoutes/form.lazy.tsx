import { createLazyRoute } from "@tanstack/react-router";

export const Route = createLazyRoute("/form")({
  component: () => {
    return (
      <>
        <h1>Hello, Hono with React!</h1>
        <form action="/api/test/form" method="post">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <button type="submit">Submit</button>
        </form>
      </>
    );
  },
});
