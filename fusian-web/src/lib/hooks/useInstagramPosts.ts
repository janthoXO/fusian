import { useCallback, useMemo } from "react";
import { usePostStore } from "../state/insta-post.state";
import { InstaPostService } from "../service/insta-post.service";

/**
 * Custom hook for managing Instagram posts
 * Follows Zustand best practices by separating service logic from React hooks
 */
export const useInstagramPosts = (accessToken?: string) => {
  const { posts: postsMap, loading, error } = usePostStore();

  // Convert Map to array for easier consumption in components
  const posts = useMemo(() => Array.from(postsMap.values()), [postsMap]);

  // Create service instance only when needed (memoized)
  const service = useMemo(
    () => (accessToken ? new InstaPostService(accessToken) : null),
    [accessToken]
  );

  // Memoize the async functions to prevent unnecessary re-renders
  const fetchPosts = useCallback(async () => {
    if (!service) {
      console.warn("Cannot fetch posts: No access token provided");
      return;
    }
    await service.fetchPosts();
  }, [service]);

  // Helper to get a specific post by ID
  const getPost = useCallback((postId: string) => {
    return postsMap.get(postId);
  }, [postsMap]);

  return {
    posts, // Array for easy iteration in components
    postsMap, // Map for efficient lookups
    loading,
    error,
    fetchPosts,
    getPost,
    isReady: !!service,
  };
};
