import { createLazyRoute } from "@tanstack/react-router";
import { useState } from "react";

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
        <ReqWithIdButton />
      </>
    );
  },
});

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      You clicked me {count} times
    </button>
  );
}

const ClockButton = () => {
  const [response, setResponse] = useState<string | null>(null);

  const handleClick = async () => {
    const response = await fetch("/api/test");
    const data = await response.json();
    const headers = Array.from(response.headers.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
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
      <button onClick={handleClick}>Get Server Time</button>
      {response && <pre>{response}</pre>}
    </div>
  );
};

const ReqWithIdButton = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [id, setId] = useState(0);
  const handleClick = async () => {
    const response = await fetch(`/api/test/${id}`);
    const data = await response.json();
    const headers = Array.from(response.headers.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
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
      <button onClick={handleClick}>Get Server Time with param</button>
      {response && <pre>{response}</pre>}
    </div>
  );
};
