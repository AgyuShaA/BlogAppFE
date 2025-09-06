import { UserDto } from "./user.model";

export interface CommentDto {
  id: number;
  text: string;
  author: UserDto;
  postId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentDto {
  text: string;
  postId: number;
  authorId: number;
}

export interface UpdateCommentDto {
  text?: string;
}
