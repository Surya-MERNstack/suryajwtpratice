import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProtectedRouteComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Replace 'your_jwt_token_here' with your actual JWT token
  const authToken = 'suryaperumal';

  useEffect(() => {
    axios
      .get('/api/some-protected-route', {
        headers: {
          'auth-token': authToken,
        },
      })
      .then((response) => {
        // Handle the successful response here
        setData(response.data);
      })
      .catch((err) => {
        // Handle any errors here
        setError(err.response ? err.response.data.message : 'Network Error');
      });
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1>Protected Data</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default ProtectedRouteComponent;
