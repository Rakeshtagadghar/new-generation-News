import { getLatestNews } from "@/lib/news";
import { NewsList } from "@/lib/news-list";

export default function LatestNews() {
  const news = getLatestNews();
  return (
    <div>
      <h2>Latest News</h2>
      <NewsList news={news} />
    </div>
  );
}
