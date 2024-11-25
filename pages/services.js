import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/sendMail',{
            method: "POST"
        })
        const result = await response.json();
        setData(result); // Set the result in state
      } catch (err) {
        setError(err); // Set the error in state
      }
    }
    fetchData();
  }, []);

  if (error) {
    // ✅ Access the message property to display it
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render data here */}
      <p>{data.message || "Data loaded successfully!"}</p>
    </div>
  );
}

export default MyComponent;
