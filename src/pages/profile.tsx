import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Grid, Settings } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";
import PostCard from "@/components/PostCard";

interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: any[];
}

const ProfilePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock user data
  const user = {
    username: "user_profile",
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    bio: "Photography enthusiast | Travel lover | Food explorer",
    postsCount: 42,
    followers: 1024,
    following: 315,
  };

  useEffect(() => {
    // Simulate fetching posts
    const fetchPosts = () => {
      setLoading(true);
      // Mock data
      const mockPosts: Post[] = [
        {
          id: "1",
          imageUrl:
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&q=80",
          caption: "Beach day! 🏖️",
          likes: 120,
          comments: [],
        },
        {
          id: "2",
          imageUrl:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
          caption: "Dinner time 🍕",
          likes: 89,
          comments: [],
        },
        {
          id: "3",
          imageUrl:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&q=80",
          caption: "Mountain views ⛰️",
          likes: 210,
          comments: [],
        },
        {
          id: "4",
          imageUrl:
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&q=80",
          caption: "Abstract art",
          likes: 56,
          comments: [],
        },
        {
          id: "5",
          imageUrl:
            "https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?w=500&q=80",
          caption: "City lights",
          likes: 178,
          comments: [],
        },
        {
          id: "6",
          imageUrl:
            "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80",
          caption: "Nature walk",
          likes: 145,
          comments: [],
        },
      ];

      setPosts(mockPosts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{user.username}</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="max-w-xl mx-auto py-4 px-4 sm:px-0">
          {/* Profile Info */}
          <div className="flex items-center mb-6">
            <Avatar className="h-20 w-20 mr-6">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback>
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <Button className="ml-4">Edit Profile</Button>
              </div>
              <div className="flex space-x-6 mb-2">
                <div className="text-center">
                  <span className="font-semibold">{user.postsCount}</span>
                  <p className="text-sm text-gray-500">Posts</p>
                </div>
                <div className="text-center">
                  <span className="font-semibold">{user.followers}</span>
                  <p className="text-sm text-gray-500">Followers</p>
                </div>
                <div className="text-center">
                  <span className="font-semibold">{user.following}</span>
                  <p className="text-sm text-gray-500">Following</p>
                </div>
              </div>
              <p className="text-sm">{user.bio}</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="grid" className="mb-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">
                <Grid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="posts">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="grid">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <p className="text-gray-500">Loading posts...</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="aspect-square overflow-hidden"
                    >
                      <img
                        src={post.imageUrl}
                        alt={post.caption}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="posts">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <p className="text-gray-500">Loading posts...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      username={user.username}
                      userAvatar={user.avatar}
                      imageUrl={post.imageUrl}
                      caption={post.caption}
                      likesCount={post.likes}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Navigation Bar */}
      <div className="sticky bottom-0 z-10">
        <NavigationBar />
      </div>
    </div>
  );
};

export default ProfilePage;
