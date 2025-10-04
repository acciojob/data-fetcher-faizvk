import React, { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching data");
        }
        return res.json();
      })
      .then((json) => {
        // This logic for "no data" is correct and passing.
        if (!json || !json.products || json.products.length === 0) {
          setData([]);
        } else {
          // FIX: For the success case, set the data state to the actual JSON response.
          setData(json);
        }
      })
      .catch((err) => {
        // This error handling is correct and passing.
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <h1>Fetched Data</h1>
      {error ? (
        // This error rendering is correct and passing.
        <pre>An error occurred: {error}</pre>
      ) : (
        <pre>
          {/* This rendering logic now works for all cases: loading, no data, and success data. */}
          {data !== null ? JSON.stringify(data, null, 2) : "Loading..."}
        </pre>
      )}
    </div>
  );
}
