import React from "react";

function NewsItem({ title, description, imageUrl, newsUrl, variant, publishedAt, author, source }) {
  const openNews = () => {
    window.open(newsUrl, "_blank");
  };

  const formatDateTime = (utcDateString) => {
    if (!utcDateString) return { date: 'N/A', time: 'N/A' };
    const utcDate = new Date(utcDateString);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
    const istDate = new Date(utcDate.getTime() + istOffset);
    const date = istDate.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const time = istDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST';
    return { date, time };
  };

  const { date, time } = formatDateTime(publishedAt);

  if (variant === "big") {
    return (
      <div className="card text-bg-dark mb-4" style={{ cursor: "pointer" }} onClick={openNews}>
        <img
          src={imageUrl || "https://placeholdit.com/400x280/bdbdbd/ffffff?text=News&font=&font_size=36"}
          className="card-img"
          alt="news"
          style={{ height: "280px", objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placeholdit.com/400x280/bdbdbd/ffffff?text=News&font=&font_size=36";
          }}
        />

        <div className="position-absolute" style={{ top: '0', right: '0', zIndex: 1, width: '120px', height: '30px', backgroundColor: 'red', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', border: 'none', borderRadius: '5px' }}>
          {source || 'Unknown'}
        </div>
        <div className="card-img-overlay d-flex flex-column justify-content-end bg-dark bg-opacity-50">
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{description}</p>
        </div>
        <div className="card-footer text-muted small">
          <div>{date} | {time}</div>
          <div>By {author || 'Unknown'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card h-100" style={{ cursor: "pointer" }} onClick={openNews}>
      <img
        src={imageUrl || "https://placeholdit.com/400x280/bdbdbd/ffffff?text=News&font=&font_size=36"}
        className="card-img-top"
        alt="news"
        style={{ height: "350px", objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placeholdit.com/400x280/bdbdbd/ffffff?text=News&font=&font_size=36";
        }}
      />

      <div className="position-absolute" style={{ top: '0', right: '0', zIndex: 1, width: '120px', height: '30px', backgroundColor: 'red', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', border: 'none', borderRadius: '5px' }}>
        {source || 'Unknown'}
      </div>
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p className="card-text small">{description}</p>
      </div>
      <div className="card-footer text-muted small">
        <div>{date} | {time}</div>
        <div>By {author || 'Unknown'}</div>
      </div>
    </div>
  );
}

export default NewsItem;
