import { create } from "zustand";
import { InstaPost } from "../models/insta-post";
import * as Papa from "papaparse";

type PostStore = {
  posts: InstaPost[];
};

type InstaPostCSVEntry = {
  html: string;
};

async function loadPostsFromCSV(): Promise<InstaPost[]> {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, ""); // no trailing slash
  const url = `${base}/insta-posts.csv`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load insta-posts.csv: ${res.statusText}`);
  }
  const csv = await res.text();
  const parsed = Papa.parse(csv, { header: true, delimiter: ";" });
  console.log(parsed);
  if (parsed.errors.length > 0) {
    throw new Error("Failed to parse CSV");
  }

  let count = 0;
  const posts = (parsed.data as InstaPostCSVEntry[]).map((entry) => ({
    id: String(count++),
    html: entry.html,
  }));
  return posts;
}

export const usePostStore = create<PostStore>((set) => {
  const initialState: PostStore = {
    posts: [],
  };

  // Load posts from CSV
  loadPostsFromCSV().then((posts) => {
    set({ posts });
  });

  return initialState;
});
