"use client";
import { DUMMY_NEWS } from "@/dummy-news";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";

export default function InerceptedNewsImagePage({ params }) {
  const newsItem = DUMMY_NEWS.find((item) => item.slug === params.slug);
  const router = useRouter();
  if (!newsItem) {
    notFound();
  }
  return (
    <div className="modal-backdrop" onClick={router.back}>
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img
            src={`/images/news/${newsItem.image}`}
            alt={newsItem.title}
            width={700}
            height={700}
          />
        </div>
      </dialog>
    </div>
  );
}
