import {
  createPost,
  deletePost,
  searchPosts,
  updatePost,
} from "@/api/posts-api";
import { CreatePostDto, PostDto, UpdatePostDto } from "@/models/post.model";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import PostTable from "../RecipeItem/PostsTable";
import CreatePostModal from "../modals/CreatePostModal";
import UpdatePostModal from "../modals/UpdatePostModal";
import DeletePostModal from "../modals/DeletePostModal";
// import CreatePostModal from "@/components/modals/CreatePostModal";
// import UpdatePostModal from "@/components/modals/UpdatePostModal";
// import DeletePostModal from "@/components/modals/DeletePostModal";

interface PostListProps {
  posts: PostDto[];
  setPosts: Dispatch<SetStateAction<PostDto[]>>;
  currentUserId: number;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  setPosts,
  currentUserId,
}) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostDto | null>(null);
  const [postToEdit, setPostToEdit] = useState<PostDto | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<PostDto[]>(posts);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [showMyPostsOnly, setShowMyPostsOnly] = useState(false);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  useEffect(() => {
    let filtered = posts;

    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(queryLower) ||
          (p.description && p.description.toLowerCase().includes(queryLower))
      );
    }

    if (showMyPostsOnly) {
      filtered = filtered.filter((p) => p.author.id === currentUserId);
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, showMyPostsOnly, currentUserId]);

  const toggleCreateModal = () => setIsCreateOpen((prev) => !prev);

  const onCreatePost = async (post: CreatePostDto) => {
    try {
      const response = await createPost(post);
      toast.success("Post created successfully");
      setIsCreateOpen(false);
      setPosts((prev) => [...prev, response]);

      if (
        searchQuery &&
        (response.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (response.description &&
            response.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())))
      ) {
        setFilteredPosts((prev) => [...prev, response]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create post.");
    }
  };

  const onUpdatePost = async (post: UpdatePostDto) => {
    if (!postToEdit?.id) return;
    try {
      const response = await updatePost(postToEdit.id, post);
      toast.success("Post updated successfully");
      setIsUpdateOpen(false);

      setPosts((prev) =>
        prev.map((p) => (p.id === postToEdit.id ? { ...p, ...response } : p))
      );

      setFilteredPosts((prev) =>
        prev.map((p) => (p.id === postToEdit.id ? { ...p, ...response } : p))
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update post.");
    }
  };

  const onDelete = async (postId: number) => {
    try {
      await deletePost(postId);
      toast.success("Post deleted successfully");
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      setFilteredPosts((prev) => prev.filter((p) => p.id !== postId));
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("An error occurred while deleting the post.");
      setIsDeleteOpen(false);
    }
  };

  const handleEditClick = (post: PostDto) => {
    setPostToEdit(post);
    setSelectedPost(post);
    setIsUpdateOpen(true);
  };

  const handleDeleteClick = (post: PostDto) => {
    setPostToEdit(post);
    setSelectedPost(post);
    setIsDeleteOpen(true);
  };

  const debouncedSearch = (query: string) => {
    setIsSearchLoading(true);
    setTimeout(async () => {
      if (!query) {
        const filtered = showMyPostsOnly
          ? posts.filter((p) => p.author.id === currentUserId)
          : posts;
        setFilteredPosts(filtered);
        setSearchError(null);
        setIsSearchLoading(false);
        return;
      }

      try {
        const results = await searchPosts(query);
        const filtered = showMyPostsOnly
          ? results.filter((p) => p.author.id === currentUserId)
          : results;

        setFilteredPosts(filtered);
        setSearchError(null);
      } catch (error) {
        console.error(error);
        setSearchError("Failed to search posts");
        setFilteredPosts([]);
      } finally {
        setIsSearchLoading(false);
      }
    }, 300);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredPosts(posts);
    setSearchError(null);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-md shadow-md">
      <div className="flex flex-col justify-between items-center mb-4 sm:flex-row gap-3">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Posts</h2>

        <div className="flex items-center mt-2 sm:mt-0 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by title or description..."
              className="w-full sm:w-64 px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {isSearchLoading && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <FiLoader className="animate-spin text-gray-500" size={20} />
              </div>
            )}
            {searchQuery && !isSearchLoading && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <label className="ml-4 flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={showMyPostsOnly}
            onChange={(e) => setShowMyPostsOnly(e.target.checked)}
            className="w-4 h-4"
          />
          Show only my posts
        </label>

        <button
          onClick={toggleCreateModal}
          className="ml-0 sm:ml-4 mt-2 sm:mt-0 px-3 py-2 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm sm:text-base"
        >
          Add Post
        </button>
      </div>

      <PostTable
        currentUserId={currentUserId}
        posts={filteredPosts}
        searchQuery={searchQuery}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />

      {searchError && (
        <p className="text-red-500 text-sm mb-4">{searchError}</p>
      )}

      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={onCreatePost}
      />

      {selectedPost && (
        <UpdatePostModal
          isOpen={isUpdateOpen}
          onClose={() => {
            setIsUpdateOpen(false);
            setSelectedPost(null);
          }}
          onSave={onUpdatePost}
          postData={selectedPost}
        />
      )}

      {selectedPost && (
        <DeletePostModal
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
            setSelectedPost(null);
          }}
          onDelete={onDelete}
          postData={selectedPost}
        />
      )}
    </div>
  );
};

export default PostList;
