const getIndicesData = async () => {
  const API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY
  const res = await fetch(`https://api.polygon.io/v2/aggs/ticker/I:COMP/range/1/day/2024-02-16/2024-02-16?sort=asc&limit=120&apiKey=${API_KEY}`);

  return res.json();
}



const IndicesOverview = async () => {
  const data = await getIndicesData();
  // console.log(data)

  const results = data.results[0]
  return (
    <>
    <div>IndicesOverview</div>
    <p>{results.o.toFixed(2)}</p>
    <p>{results.c.toFixed(2)}</p>
    <p>{results.h.toFixed(2)}</p>
    <p>{results.l.toFixed(2)}</p>
    </>
  )
}

export default IndicesOverview