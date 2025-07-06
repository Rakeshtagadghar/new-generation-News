import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";
import { Suspense } from "react";

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <>
      <h1>News Page</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <NewsList news={news} />
      </Suspense>
    </>
  );
}
