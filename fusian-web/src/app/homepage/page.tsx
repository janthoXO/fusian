"use client";

import { AnnouncementCard } from "@/components/announcement.card";
import { useAnnouncementStore } from "@/lib/state/announcement.state";

export default function Homepage() {
  const { announcements, todayIndex } = useAnnouncementStore();

  // Show only the first 3 announcements
  const displayedAnnouncements = announcements.slice(todayIndex - 3, todayIndex);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-6">
          Fusian Dance Crew
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Where passion meets rhythm. Join our dance crew and express yourself through the art of movement.
        </p>
      </section>

      {/* Instagram Section */}

      {/* Announcement Section */}
      <section className="py-12">
        <div className="flex flex-col gap-y-2">
          {displayedAnnouncements.map((announcement) => AnnouncementCard({ announcement: announcement }))}
        </div>
      </section>
    </div>
  );
}
