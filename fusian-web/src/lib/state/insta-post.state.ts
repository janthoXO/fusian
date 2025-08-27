import { create } from "zustand";
import { InstaPost } from "../models/insta-post";

type PostStore = {
  posts: Map<string, InstaPost>;
  loading: boolean;
  error: string | null;
  // Actions
  addAll: (posts: InstaPost[]) => void;
  set: (post: InstaPost) => void; // adds or overwrites
  delete: (postId: string) => void;
  clear: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
};

const initialState = {
  posts: new Map<string, InstaPost>(),
  loading: false,
  error: null,
};

export const usePostStore = create<PostStore>((set, get) => ({
  ...initialState,
  // Actions
  addAll: (posts) => {
    const { posts: currentPosts } = get();
    const newPosts = new Map(currentPosts);
    posts.forEach(post => {
      if (post.id) {
        newPosts.set(post.id, post);
      }
    });
    set({ posts: newPosts, error: null });
  },
  set: (post) => {
    if (!post.id) return;
    const { posts: currentPosts } = get();
    const newPosts = new Map(currentPosts);
    newPosts.set(post.id, post);
    set({ posts: newPosts });
  },
  delete: (postId) => {
    const { posts: currentPosts } = get();
    const newPosts = new Map(currentPosts);
    newPosts.delete(postId);
    set({ posts: newPosts });
  },
  clear: () => set({ posts: new Map<string, InstaPost>(), error: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),
  clearError: () => set({ error: null }),
}));
