import { CommentDto } from "./comment.model";
import { UserDto } from "./user.model";

export interface PostDto {
  id: number;
  title: string;
  description: string;
  content?: string;
  photoUrl?: string; // optional
  author: UserDto; // who created the post
  comments: CommentDto[]; // all comments for this post
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
export interface CreatePostDto {
  title: string;
  description: string;
  content: string;
  image: File;
}

export interface UpdatePostDto {
  title?: string;
  description?: string;
  content?: string;
  image?: File;
}
