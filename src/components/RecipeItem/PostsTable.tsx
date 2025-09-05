import { PostDto } from "@/models/post.model";
import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import PostDetailsModal from "../modals/PostDetailModal";
import Image from "next/image";

interface PostTableProps {
  posts: PostDto[];
  searchQuery: string;
  handleEditClick: (post: PostDto) => void;
  handleDeleteClick: (post: PostDto) => void;
  currentUserId: number;
}

const PostTable: React.FC<PostTableProps> = ({
  posts,
  searchQuery,
  handleEditClick,
  handleDeleteClick,
  currentUserId,
}) => {
  const [selectedPost, setSelectedPost] = useState<PostDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(isModalOpen);
  const handleViewClick = (post: PostDto) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">
        {searchQuery ? "No posts found." : "No posts available."}
      </p>
    );
  }
  console.log(currentUserId, posts);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
        >
          {/* Image */}
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            {post.photoUrl ? (
              <Image
                src={`http://localhost:3000${post.photoUrl}`}
                alt={post.title}
                fill
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-semibold text-lg">{post.title}</h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-3">
              {post.description}
            </p>
            <p className="text-gray-500 text-xs mt-1">By {post.author.name}</p>

            {/* Toggle content */}
            <button
              onClick={() => handleViewClick(post)}
              className="mt-2 text-indigo-600 text-sm hover:underline"
            >
              Show Details
            </button>

            {/* Actions for owner */}
            {post.author.id === currentUserId && (
              <div className="mt-auto flex gap-2 pt-2 justify-between px-10">
                <button
                  onClick={() => handleEditClick(post)}
                  className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(post)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      {selectedPost && isModalOpen && (
        <PostDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentPost={selectedPost}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
};

export default PostTable;
