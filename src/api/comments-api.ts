import {
  CommentDto,
  CreateCommentDto,
  UpdateCommentDto,
} from "@/models/comment.model";
import { API_URL, LOCAL_STORAGE_TOKEN } from "../../api";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LOCAL_STORAGE_TOKEN);
};

const fetchWithAuth = async (url: string, options: RequestInit) => {
  const token = getToken();
  if (!token) throw new Error("User not authenticated");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok)
    throw new Error(`API request failed: ${response.statusText}`);
  return await response.json();
};

export const createComment = async (
  createCommentDto: CreateCommentDto
): Promise<CommentDto> => {
  return fetchWithAuth(`${API_URL}/comments`, {
    method: "POST",
    body: JSON.stringify(createCommentDto),
  });
};

export const updateComment = async (
  commentId: number,
  updateCommentDto: UpdateCommentDto
): Promise<CommentDto> => {
  return fetchWithAuth(`${API_URL}/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify(updateCommentDto),
  });
};

export const deleteComment = async (commentId: number) => {
  return fetchWithAuth(`${API_URL}/comments/${commentId}`, {
    method: "DELETE",
  });
};

export const getCommentsForPost = async (
  postId: number
): Promise<CommentDto[]> => {
  return fetchWithAuth(`${API_URL}/posts/${postId}/comments`, {
    method: "GET",
  });
};
