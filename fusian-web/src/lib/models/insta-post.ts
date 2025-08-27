export type InstaPost = {
    id?: string;
    url: string;
    mediaUrl?: string;
    mediaType?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    caption?: string;
    timestamp?: string;
}