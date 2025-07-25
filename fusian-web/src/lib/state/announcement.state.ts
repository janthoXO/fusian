import { Announcement } from "../models/announcement";
import { create } from "zustand";

type AnnouncementStore = {
  announcements: Announcement[];
  todayIndex: number;
  setAnnouncements: (announcements: Announcement[]) => void;
};

export const useAnnouncementStore = create<AnnouncementStore>((set) => {
  const announcements = [
    // Future events
    {
      id: "11",
      title: "Summer Dance Camp Registration",
      content:
        "Registration is now open for our intensive summer dance camp. Join us for 3 weeks of amazing workshops!",
      timestamp: new Date(Date.now() + 2592000000), // 30 days from now
    },
    {
      id: "10",
      title: "Summer Dance Camp Registration",
      content:
        "Registration is now open for our intensive summer dance camp. Join us for 3 weeks of amazing workshops!",
      timestamp: new Date(Date.now() + 2592000000), // 30 days from now
    },
    {
      id: "9",
      title: "Annual Dance Competition",
      content: "Our biggest competition of the year is coming up! Categories for all skill levels and ages.",
      timestamp: new Date(Date.now() + 1209600000), // 14 days from now
    },
    {
      id: "8",
      title: "New Member Orientation",
      content:
        "Welcome new members! Join us for an orientation session to learn about Fusian and meet the team.",
      timestamp: new Date(Date.now() + 604800000), // 7 days from now
    },
    {
      id: "7",
      title: "Hip-Hop Workshop with Guest Instructor",
      content:
        "Special workshop this weekend with internationally acclaimed hip-hop choreographer Maya Johnson.",
      timestamp: new Date(Date.now() + 172800000), // 2 days from now
    },
    // Today's event
    {
      id: "6",
      title: "Welcome to Fusian!",
      content:
        "We're excited to have you join our dance community. Get ready for an amazing journey of rhythm, movement, and creativity!",
      timestamp: new Date(), // Today
    },
    // Past events
    {
      id: "5",
      title: "New Hip-Hop Class Started",
      content:
        "Our new beginner-friendly hip-hop class launched successfully! Great turnout and amazing energy.",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: "4",
      title: "Spring Showcase was a Success!",
      content:
        "Thank you to everyone who participated in our spring showcase. It was an incredible night of performances!",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
    },
    {
      id: "3",
      title: "Workshop with Professional Dancers Completed",
      content: "Amazing workshop with guest choreographers from Los Angeles. Participants learned so much!",
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
    },
    {
      id: "2",
      title: "Monthly Dance Battle Results",
      content:
        "Congratulations to all participants in last month's dance battle. The level of talent was incredible!",
      timestamp: new Date(Date.now() - 604800000), // 7 days ago
    },
    {
      id: "1",
      title: "New Studio Equipment Installed",
      content: "We've upgraded our sound system and mirrors! Come check out the improved studio experience.",
      timestamp: new Date(Date.now() - 1209600000), // 14 days ago
    },
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // Sort by timestamp, highest date first

  // find the index of the last past event
  const now = new Date();
  const todayIndex = announcements.findIndex(
    (announcement) => announcement.timestamp.getTime() <= now.getTime()
  );

  return {
    announcements,
    todayIndex: todayIndex === -1 ? announcements.length : todayIndex, // If no past events, today is at the end
    setAnnouncements: (announcements) => set({ announcements }),
  };
});
