import { API_URL, LOCAL_STORAGE_TOKEN } from "../../api";
import { PostDto, CreatePostDto, UpdatePostDto } from "@/models/post.model";

const getToken = () =>
  typeof window !== "undefined"
    ? localStorage.getItem(LOCAL_STORAGE_TOKEN)
    : null;

const fetchWithAuth = async (url: string, options: RequestInit) => {
  const token = getToken();
  if (!token) throw new Error("User not authenticated");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok)
    throw new Error(`API request failed: ${response.statusText}`);
  return response.json();
};

export const createPost = async (data: CreatePostDto) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  if (data.content) formData.append("content", data.content);
  if (data.image) {
    formData.append("image", data.image);
  }

  return fetchWithAuth(`${API_URL}/posts`, {
    method: "POST",
    body: formData,
  });
};

// Update a post (with optional new image)
export const updatePost = async (
  postId: number,
  updatePostDto: UpdatePostDto,
  imageFile?: File
): Promise<PostDto> => {
  const formData = new FormData();
  Object.entries(updatePostDto).forEach(([key, value]) => {
    if (value !== undefined && value !== null)
      // eslint-disable-next-line
      formData.append(key, value as any);
  });
  if (imageFile) formData.append("image", imageFile);

  return fetchWithAuth(`${API_URL}/posts/${postId}`, {
    method: "PATCH",
    body: formData,
  });
};

// Delete a post
export const deletePost = async (postId: number) => {
  return fetchWithAuth(`${API_URL}/posts/${postId}`, { method: "DELETE" });
};

// Get all posts
export const getAllPosts = async (): Promise<PostDto[]> => {
  return fetchWithAuth(`${API_URL}/posts`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

// Get posts by user
export const getPostsByUserId = async (userId: number): Promise<PostDto[]> => {
  return fetchWithAuth(`${API_URL}/posts/user/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

// Search posts
export const searchPosts = async (query: string): Promise<PostDto[]> => {
  return fetchWithAuth(
    `${API_URL}/posts/search?query=${encodeURIComponent(query)}`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );
};
