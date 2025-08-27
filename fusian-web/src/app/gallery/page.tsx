"use client";

import { PostCard } from "@/components/post.card";
import { useInstagramPosts } from "@/lib/hooks/useInstagramPosts";
import { useEffect } from "react";

export default function GalleryPage() {
  const { posts, fetchPosts } = useInstagramPosts("<ACCESS_TOKEN>");

  useEffect(() => {
    // Fetch posts when the component mounts
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Gallery</h1>
        <div className="flex flex-wrap gap-4">
          {posts?.map((post) => (
            <div key={post.id} className="basis-3xs h-96">
              <PostCard post={post}></PostCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
