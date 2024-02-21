
interface TickerNewsResponse {
  title: string;
  author: string;
  published_utc: string;
  article_url: string;
  image_url: string;
  description: string;
}

// Make sure to type the expected structure of the API response correctly
interface NewsApiResponse {
  results: TickerNewsResponse[];
}

const fetchTickerNewsData = async (): Promise<TickerNewsResponse | null> => {
  const API_KEY = process.env.POLYGON_API_KEY;
  const url = `https://api.polygon.io/v2/reference/news?order=desc&limit=1&apiKey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch news data`);
    }
    // You will need to adjust this according to the actual shape of the response
    const { results } = await response.json() as NewsApiResponse;
    return results[0]; // Assuming the first result is the article you want
  } catch (error) {
    console.error(`Error fetching news data:`, error);
    return null;
  }
}

// Your CryptoOverview component should probably be named NewsOverview or similar
const NewsOverview = async () => {
  const tickerNewsData = await fetchTickerNewsData();

  return (
    <section>
      <div className="container">
        <div className="max-w-[300px] shadow-lg rounded-lg p-4 border dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="font-bold text-lg mb-6">NEWS</h3>
          {tickerNewsData ? (
            <div className="flex flex-col items-center">
              <img src={tickerNewsData.image_url} alt={tickerNewsData.title} className="mb-4 w-full h-auto rounded-md" />
              <a href={tickerNewsData.article_url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:underline">
                {tickerNewsData.title}
              </a>
              <p className="mt-2 text-sm text-gray-500">
                {/* {new Date(tickerNewsData.published_utc).toLocaleDateString()} by {tickerNewsData.author} */}
              </p>
              {/* <p className="mt-2">{tickerNewsData.description}</p> */}
            </div>
          ) : (
            <p>News data not available</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default NewsOverview;
