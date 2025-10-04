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
        if (!json || !json.products || json.products.length === 0) {
          setData([]); // no data case
        } else {
          setData(json); // success case
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div>
        <h1>Fetched Data</h1>
        <pre>An error occurred: {error}</pre>
      </div>
    );
  }

  if (data === null) {
    return (
      <div>
        <h1>Fetched Data</h1>
        <pre>Loading...</pre>
      </div>
    );
  }

  if (Array.isArray(data) && data.length === 0) {
    return (
      <div>
        <h1>Fetched Data</h1>
        <pre>No data found</pre>
      </div>
    );
  }

  // success: data is present and non-empty
  return (
    <div>
      <h1>Data Fetched from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
