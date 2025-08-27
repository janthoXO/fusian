"use client";

import { AnnouncementCard } from "@/components/announcement.card";
import { PostCard } from "@/components/post.card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useInstagramPosts } from "@/lib/hooks/useInstagramPosts";
import { useAnnouncementStore } from "@/lib/state/announcement.state";
import { useEffect } from "react";

export default function Homepage() {
  const { posts, fetchPosts } = useInstagramPosts("<ACCESS_TOKEN>");
  const { announcements, todayIndex } = useAnnouncementStore();

  useEffect(() => {
    // Fetch posts when the component mounts
    fetchPosts();
  }, []);

  // Show only the first 3 announcements
  const displayedAnnouncements = announcements.slice(todayIndex - 3, todayIndex);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="my-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-6">
          Fusian Dance Crew
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Where passion meets rhythm. Join our dance crew and express yourself through the art of movement.
        </p>
      </section>

      {/* Instagram Section */}
      <section className="flex flex-row py-10 justify-center">
        <Carousel
          className="w-full"
        >
          <CarouselContent className="m-3">
            {posts?.map((post) => (
              <CarouselItem key={post.id} className="max-w-xs lg:max-w-3xs">
                <div className="h-96">
                  <PostCard key={post.id} post={post}></PostCard>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Announcement Section */}
      <section className="my-10">
        <div className="flex flex-col gap-y-2">
          {displayedAnnouncements.map((announcement) => AnnouncementCard({ announcement: announcement }))}
        </div>
      </section>
    </div>
  );
}
