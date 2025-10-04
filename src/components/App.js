import React, { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((json) => {
        if (!json || Object.keys(json).length === 0) {
          setData("No data found");
        } else {
          setData(json);
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Fetched Data</h1>
      {error ? (
        <pre>{error}</pre>
      ) : (
        <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
      )}
    </div>
  );
}
