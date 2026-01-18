import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsItem from "./NewsItem";

function News() {
  const { category = "all" } = useParams();

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageSize] = useState(13); // 1 Featured + 12 Small
  const [totalResults, setTotalResults] = useState(0);

  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const getQuery = () => {
    if (category === "all") {
      return "football OR cricket OR trump OR finance OR india OR usa OR oil OR sports OR technology OR ai";
    }

    switch (category.toLowerCase()) {
      case "sports":
        return "football OR cricket OR sports";
      case "usa":
        return "usa OR america";
      case "india":
        return "india";
      case "trump":
        return "trump";
      case "finance":
        return "finance OR business OR economy";
      case "oil":
        return "oil OR petroleum OR energy";
      case "technology":
        return "technology OR gadgets OR software";
      case "ai":
        return "artificial intelligence OR ai OR machine learning";
      default:
        return "football OR cricket OR trump OR finance OR india OR usa OR oil OR sports OR technology OR ai";
    }
  };

  const fetchNews = async () => {
    setLoading(true);
    const query = encodeURIComponent(getQuery());
    const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    const uniqueArticles = [];
    const seen = new Set();

    (data.articles || []).forEach((item) => {
      const key = item.url || item.title;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueArticles.push(item);
      }
    });

    setArticles(uniqueArticles);
    setTotalResults(data.totalResults || 0);
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line
  }, [page, category]);

  // 🔒 NewsAPI free tier practical limit
  const apiLimit = 100;
  const effectiveTotal = Math.min(totalResults, apiLimit);
  const totalPages = Math.ceil(effectiveTotal / pageSize);

  const getVisiblePages = () => {
    if (totalPages <= 1) return [];

    // Page 1–3: show 1–5
    if (page <= 3) {
      return Array.from(
        { length: Math.min(5, totalPages) },
        (_, i) => i + 1
      );
    }

    // From page 4 onward: sliding window of 4 pages (excluding 1)
    const start = Math.min(page, totalPages - 3);
    const end = Math.min(start + 3, totalPages);

    const pages = [];
    for (let p = start; p <= end; p++) {
      if (p !== 1) pages.push(p);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();
  const hasMore = page < totalPages;

  return (
    <div style={{ marginTop: "40px" }}>
      <div className="container-fluid">
        <div className="row">

          <div className="col-md-2 border py-3">
            <h6 className="text-center">Ads</h6>
            <div className="my-3 p-2 border">Ad Space</div>
            <div className="my-3 p-2 border">Ad Space</div>
            <div className="my-3 p-2 border">Ad Space</div>
          </div>

          <div className="col-md-10">
            {loading && (
              <div className="d-flex justify-content-center my-5">
                <div className="spinner-border text-primary" role="status" />
              </div>
            )}

            {!loading && (
              <>
                {articles.length > 0 && (
                  <NewsItem
                    title={articles[0].title}
                    description={articles[0].description}
                    imageUrl={articles[0].urlToImage}
                    newsUrl={articles[0].url}
                    variant="big"
                    publishedAt={articles[0].publishedAt}
                    author={articles[0].author}
                    source={articles[0].source.name}
                  />
                )}

                <div className="row g-3">
                  {articles.slice(1).map((item, index) => (
                    <div className="col-12 col-md-6 col-lg-4" key={index}>
                      <NewsItem
                        title={item.title}
                        description={item.description}
                        imageUrl={item.urlToImage}
                        newsUrl={item.url}
                        variant="small"
                        publishedAt={item.publishedAt}
                        author={item.author}
                        source={item.source.name}
                      />
                    </div>
                  ))}
                </div>

                <nav className="d-flex justify-content-center my-4">
                  <ul className="pagination gap-2">

                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => setPage(page - 1)}>
                        Prev
                      </button>
                    </li>

                    {/* Show 1 separately only after page 3 */}
                    {page > 3 && (
                      <li className="page-item">
                        <button className="page-link" onClick={() => setPage(1)}>1</button>
                      </li>
                    )}

                    {visiblePages.map((p) => (
                      <li key={p} className={`page-item ${page === p ? "active" : ""}`}>
                        <button className="page-link" onClick={() => setPage(p)}>
                          {p}
                        </button>
                      </li>
                    ))}

                    <li className={`page-item ${!hasMore ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => hasMore && setPage(page + 1)}
                      >
                        Next
                      </button>
                    </li>

                  </ul>
                </nav>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
