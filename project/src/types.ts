export interface Video {
  id: string;
  url: string;
  title: string;
  author: string;
  likes: number;
  description: string;
  thumbnail: string;
  comments: number;
  shares: number;
  isLiked?: boolean;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
  isEphemeral: boolean;
}

export interface VideoComment {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: number;
  likes: number;
}