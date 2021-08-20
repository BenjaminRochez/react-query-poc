import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (page) => {
  console.log(page);
  const res = await fetch(`http://swapi.dev/api/planets?page=${page}`);
  return res.json();
};

function Planets() {
  const [page, setPage] = useState(1);

  const { data, status } = useQuery(
    ["planets", page],
    ({ queryKey }) => fetchPlanets(queryKey[1]),
    {
      keepPreviousData: true,
    }
  );
  console.log(data);
  return (
    <div>
      <h2>Planets</h2>

      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous page
          </button>
          <span>{page}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= data.count / data.results.length}
          >
            Next page
          </button>
          <div>
            {data.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Planets;
