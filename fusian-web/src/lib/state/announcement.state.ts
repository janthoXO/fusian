import { Announcement } from "../models/announcement";
import { create } from "zustand";
import * as Papa from "papaparse";

type AnnouncementStore = {
  announcements: Announcement[];
  todayIndex: number;
};

type AnnouncementCSVEntry = {
  title: string;
  content: string;
  unixtimestamp: number;
};

async function loadAnnouncementsFromCSV(): Promise<Announcement[]> {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, ""); // no trailing slash
  const url = `${base}/announcements.csv`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load announcements.csv: ${res.statusText}`);
  }
  const csv = await res.text();
  const parsed = Papa.parse(csv, { header: true, delimiter: ";" });
  if (parsed.errors.length > 0) {
    throw new Error("Failed to parse CSV");
  }

  let count = 0;
  const announcements = (parsed.data as AnnouncementCSVEntry[]).map((entry) => ({
    id: String(count++),
    title: entry.title,
    content: entry.content,
    timestamp: new Date(entry.unixtimestamp * 1000),
  }));
  return announcements;
}

export const useAnnouncementStore = create<AnnouncementStore>((set) => {
  // start with empty state
  const initialState: AnnouncementStore = {
    announcements: [],
    todayIndex: 0,
  };

  // load announcements from CSV and sort by timestamp
  loadAnnouncementsFromCSV().then((announcements) => {
    announcements.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // Sort by timestamp, highest date first

    // find the index of the last past event
    const now = new Date();
    const todayIndex = announcements.findIndex(
      (announcement) => announcement.timestamp.getTime() <= now.getTime()
    );

    set({
      announcements,
      todayIndex: todayIndex === -1 ? announcements.length : todayIndex, // If no past events, today is at the end
    });
  });

  return initialState;
});
