import { UserDto } from "./user.model";

export interface CommentDto {
  id: number;
  text: string;
  author: UserDto; // Who wrote the comment
  postId: number; // ID of the post
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface CreateCommentDto {
  text: string;
  postId: number;
  authorId: number;
}

export interface UpdateCommentDto {
  text?: string;
}
