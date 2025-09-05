import { createComment, deleteComment } from "@/api/comments-api";
import { CommentDto, CreateCommentDto } from "@/models/comment.model";
import { PostDto } from "@/models/post.model";
import Image from "next/image";
import React, { SetStateAction, useState } from "react";
import { Dispatch } from "react";
import { toast } from "react-toastify";

interface PostDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPost: PostDto;
  currentUserId: number;
  setPosts: React.Dispatch<React.SetStateAction<PostDto[]>>; // <-- correct
}

const PostDetailsModal: React.FC<PostDetailsModalProps> = ({
  isOpen,
  onClose,
  currentPost,
  setPosts,
  currentUserId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [post, setPost] = useState(currentPost);

  const handleAddComment = async () => {
    if (commentText.trim()) {
      post.id, commentText.trim();

      const comment: CreateCommentDto = {
        text: commentText,
        postId: post.id,
        authorId: currentUserId,
      };
      const craetedComment = await createComment(comment);

      post.comments.push(craetedComment);
      setCommentText("");
    }
    toast.success("Comment created");

    if (!isOpen || !post) return null;
  };
  const onDeleteComment = async (commentId: number) => {
    await deleteComment(commentId);

    setPost((prev) =>
      prev
        ? { ...prev, comments: prev.comments.filter((c) => c.id !== commentId) }
        : prev
    );

    toast.success("Comment deleted");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50 z-10"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="bg-white rounded-md shadow-lg w-10/12 max-w-lg  overflow-auto p-6 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
          <h2 className="text-2xl text-center font-bold mb-2">{post.title}</h2>

          {/* Image */}
          {post.photoUrl ? (
            <div className="w-full h-64 relative p-10 pt-10">
              <Image
                src={`http://localhost:3000${post.photoUrl}`}
                alt={post.title}
                fill
                className="object-contain rounded-md"
              />
            </div>
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md mb-4">
              <span className="text-gray-400">No Image</span>
            </div>
          )}

          {/* Title */}

          {/* Description */}
          <p className="text-gray-700 mb-2">Description: {post.description}</p>

          {/* Content */}
          {post.content && (
            <div className="mb-2">
              <h3 className="font-semibold text-gray-800 mb-1">Content:</h3>
              <p className="text-gray-600">{post.content}</p>
            </div>
          )}

          {/* Author */}
          <p className="text-gray-500 text-sm mt-4">
            Author: <span className="font-medium">{post.author.name}</span>
          </p>

          {/* Comments Section */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Comments</h3>

            {/* Add comment */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 border border-gray-300 rounded-md p-2"
              />
              <button
                onClick={handleAddComment}
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Add
              </button>
            </div>

            {/* Existing comments */}
            <div className="flex flex-col gap-2 max-h-48 overflow-auto">
              {post.comments?.map((comment: CommentDto) => (
                <div
                  key={comment.id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">
                      By: {comment.author.name}
                    </p>
                    <p className="text-sm text-gray-700">{comment.text}</p>
                  </div>

                  {comment.author.id === currentUserId && (
                    <div className="flex items-center  justify-center h-full">
                      <button
                        onClick={() => onDeleteComment(comment.id)}
                        className="text-red-600 text-xs hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetailsModal;
