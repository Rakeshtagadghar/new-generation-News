import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";
import { Suspense } from "react";

export default async function NewsPage() {
  try {
    const news = await getAllNews();

    return (
      <>
        <h1>News Page</h1>
        <Suspense fallback={<p>Loading...</p>}>
          <NewsList news={news} />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error('Error loading news page:', error);
    return (
      <>
        <h1>News Page</h1>
        <p>Error loading news. Please try again later.</p>
      </>
    );
  }
}
