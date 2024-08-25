import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContextProvider";

export function useFetch(url) {
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await fetch(url, user && {
        method: "GET",
        headers: { "Authorization": "Bearer " + user.token }
      });

      if (!response.ok) {
        throw new Error("Fetching data failed.");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { isLoading, data, error, refetch: fetchData };
}
