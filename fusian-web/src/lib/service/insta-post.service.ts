import { InstaPostApi } from "../api/insta-post.api";
import { usePostStore } from "../state/insta-post.state";

export class InstaPostService {
  private api: InstaPostApi;

  constructor(accessToken: string) {
    this.api = new InstaPostApi(accessToken);
  }

  /**
   * Fetch all Instagram posts and update the store
   */
  async fetchPosts(): Promise<void> {
    const { setLoading, setError, addAll, clearError } = usePostStore.getState();
    
    try {
      // Clear any previous errors and set loading state
      clearError();
      setLoading(true);

      // Call the API to fetch posts
      const posts = await this.api.fetchPosts();

      // Update the store with the fetched posts
      addAll(posts);
    } catch (error) {
      // Handle and propagate errors to the store
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch posts";
      setError(errorMessage);
      console.error("Service error:", error);
    } finally {
      // Always clear loading state
      setLoading(false);
    }
  }

  /**
   * Fetch a specific post by ID and add it to the store
   */
  async fetchPostById(postId: string): Promise<void> {
    const { setLoading, setError, set, clearError } = usePostStore.getState();
    
    try {
      clearError();
      setLoading(true);

      const post = await this.api.fetchPostById(postId);
      
      if (post) {
        // Add or overwrite the post in the store
        set(post);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch post";
      setError(errorMessage);
      console.error("Service error:", error);
    } finally {
      setLoading(false);
    }
  }
}
