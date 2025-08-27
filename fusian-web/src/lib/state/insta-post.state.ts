import { create } from "zustand";
import { InstaPost } from "../models/insta-post";
import * as Papa from "papaparse";

type PostStore = {
  posts: InstaPost[];
};

async function loadPostsFromCSV(): Promise<InstaPost[]> {
  const res = await fetch("/insta-posts.csv");
  if (!res.ok) {
    throw new Error(`Failed to load insta-posts.csv: ${res.statusText}`);
  }
  const csv = await res.text();
  const parsed = Papa.parse(csv, { header: true, delimiter: ";" });
  console.log(parsed);
  if (parsed.errors.length > 0) {
    throw new Error("Failed to parse CSV");
  }

  var count = 0;
  const posts = (parsed.data as any[]).map((row) => ({
    id: String(count++),
    html: row.html as string,
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
