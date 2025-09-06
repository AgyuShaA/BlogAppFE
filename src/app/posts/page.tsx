"use client";

import { getAllPosts } from "@/api/posts-api";
import PostList from "@/components/PostList/PostsList";
import PrivateRoute from "@/components/PrivateRoute";

import { PostDto } from "@/models/post.model";

import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function DashboardContent() {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const user = useAppSelector((state) => state.user.data);
  useEffect(() => {
    const FetchPosts = async () => {
      if (user?.id) {
        const posts = await getAllPosts();

        if (posts.length) {
          setPosts(posts);
        }
      }
    };
    if (!user) return;

    FetchPosts();
  }, [user?.id, user]);
  const router = useRouter();
  if (!user) return;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">BlogApp</h1>
            </div>
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">{user?.name}</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <PostList posts={posts} setPosts={setPosts} currentUserId={user.id} />
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <DashboardContent />
    </PrivateRoute>
  );
}
