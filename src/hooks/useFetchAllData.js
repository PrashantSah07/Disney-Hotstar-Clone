import { useEffect, useState } from "react";

function useFetchAllData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Max pages limit and delay between requests in ms
  const MAX_PAGES = 10;
  const DELAY_MS = 300;

  useEffect(() => {
    if (!url) return;

    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function fetchAllPages() {
      try {
        setLoading(true);
        setError(null);
        let results = [];
        let page = 1;
        let totalPages = 1;

        do {
          const response = await fetch(`${url}&page=${page}`);
          if (!response.ok) throw new Error("Failed to fetch data");
          const json = await response.json();

          if (json?.results?.length) {
            results = results.concat(json.results);
          }

          totalPages = json.total_pages || 1;
          page++;

          if (page <= totalPages && page <= MAX_PAGES) {
            await delay(DELAY_MS);
          }
        } while (page <= totalPages && page <= MAX_PAGES);

        setData(results);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchAllPages();
  }, [url]);

  return { data, loading, error };
}

export default useFetchAllData;
