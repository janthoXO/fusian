import { InstaPost } from "../models/insta-post";

type InstagramPostResponse = {
  id: string;
  media_url: string;
  permalink: string;
  media_type: string;
  caption: string;
  timestamp: string;
};

export class InstaPostApi {
  private baseUrl: string;
  private accessToken: string;

  constructor(accessToken: string) {
    this.baseUrl = "https://graph.instagram.com";
    this.accessToken = accessToken;
  }

  /**
   * Fetch Instagram posts for the authenticated user
   */
  async fetchPosts(): Promise<InstaPost[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/me/media?fields=id,media_url,permalink,media_type,caption&access_token=${this.accessToken}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const data = await response.json();

      // Transform the Instagram API response to our InstaPost model
      const posts: InstaPost[] =
        data.data?.map((item: InstagramPostResponse) => ({
          id: item.id,
          url: item.permalink || item.media_url,
          mediaUrl: item.media_url,
          mediaType: item.media_type,
          caption: item.caption,
          timestamp: item.timestamp,
        })) || [];

      return posts;
    } catch (error) {
      console.error("Error fetching Instagram posts:", error);
      // TODO remove mock and throw error
      // throw error;
      return [
        {
          id: "mock-id",
          url: "https://example.com/mock-post",
          mediaUrl: "https://example.com/mock-media",
          mediaType: "IMAGE",
          caption: "This is a mock post",
          timestamp: new Date().toISOString(),
        },
        {
          id: "mock-id-2",
          url: "https://example.com/mock-post-2",
          mediaUrl: "https://example.com/mock-media-2",
          mediaType: "IMAGE",
          caption: "This is a mock post 2",
          timestamp: new Date().toISOString(),
        },
      ];
    }
  }

  /**
   * Fetch a specific Instagram post by ID
   */
  async fetchPostById(postId: string): Promise<InstaPost | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${postId}?fields=id,media_url,permalink,media_type,caption&access_token=${this.accessToken}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        id: data.id,
        url: data.permalink || data.media_url,
        mediaUrl: data.media_url,
        mediaType: data.media_type,
        caption: data.caption,
        timestamp: data.timestamp,
      };
    } catch (error) {
      console.error(`Error fetching Instagram post ${postId}:`, error);
      throw error;
    }
  }
}
