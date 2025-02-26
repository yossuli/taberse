import { Link, createLazyRoute } from "@tanstack/react-router";
import { hc } from "hono/client";
import { useState } from "react";
import type { Routes } from "../.hc.type";

const client = hc<Routes>("");

export const Route = createLazyRoute("/")({
  component: () => {
    return (
      <>
        <h1>Hello, Hono with React!</h1>
        <h2>Example of useState()</h2>
        <Counter />
        <h2>Example of API fetch()</h2>
        <ClockButton />
        <h2>Example of API fetch() with param</h2>
        <ReqWithParamButton />
        <h2>Example of API fetch() with body</h2>
        <ReqWithBodyButton />
        <Link to="/form">
          <button type="button">Jump to form</button>
        </Link>
        <form action="api/test/game" method="post">
          <input type="text" name="title" />
          <input type="text" name="passPhrase" />
          <button type="submit">Submit</button>
        </form>
        <h2>Example of API fetch() to DB</h2>
        <FetchToDB />
      </>
    );
  },
});

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      You clicked me {count} times
    </button>
  );
}

const ClockButton = () => {
  const [response, setResponse] = useState<string | null>(null);

  const handleClick = async () => {
    const response = await client.api.test.$get();
    const data = await response.json();
    const headers = Array.from(response.headers.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {},
    );
    const fullResponse = {
      url: response.url,
      status: response.status,
      headers,
      body: data,
    };
    setResponse(JSON.stringify(fullResponse, null, 2));
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Get Server Time
      </button>
      {response && <pre>{response}</pre>}
    </div>
  );
};

const ReqWithParamButton = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [id, setId] = useState(0);
  const handleClick = async () => {
    const response = await client.api.test.id[":id"].$get({
      param: { id: String(id) },
    });
    const data = await response.json();
    const headers = Array.from(response.headers.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {},
    );
    const fullResponse = {
      url: response.url,
      status: response.status,
      headers,
      body: data,
    };
    setResponse(JSON.stringify(fullResponse, null, 2));
  };

  return (
    <div>
      <input type="number" onChange={(e) => setId(+e.target.value)} />
      <button type="button" onClick={handleClick}>
        Get param
      </button>
      {response && <pre>{response}</pre>}
    </div>
  );
};

const ReqWithBodyButton = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [name, setName] = useState("");
  const handleClick = async () => {
    const response = await client.api.test.$post({
      json: { name },
    });
    const data = await response.json();
    const headers = Array.from(response.headers.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {},
    );
    const fullResponse = {
      url: response.url,
      status: response.status,
      headers,
      body: data,
    };
    setResponse(JSON.stringify(fullResponse, null, 2));
  };

  return (
    <div>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button type="button" onClick={handleClick}>
        Post name
      </button>
      {response && <pre>{response}</pre>}
    </div>
  );
};

const FetchToDB = () => {
  const [response, setResponse] = useState<string | null>(null);
  const handleClick = async () => {
    const response = await client.api.test.game.$get();
    const data = await response.json();
    const headers = Array.from(response.headers.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {},
    );
    const fullResponse = {
      url: response.url,
      status: response.status,
      headers,
      body: data,
    };
    setResponse(JSON.stringify(fullResponse, null, 2));
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Get games
      </button>
      {response && <pre>{response}</pre>}
    </div>
  );
};
