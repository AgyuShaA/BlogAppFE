import { CommentDto } from "./comment.model";
import { UserDto } from "./user.model";

export interface PostDto {
  id: number;
  title: string;
  description: string;
  content?: string;
  photoUrl?: string;
  author: UserDto;
  comments: CommentDto[];
  createdAt: string;
  updatedAt: string;
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
