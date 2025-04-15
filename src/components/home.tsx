import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StoriesCarousel from "./StoriesCarousel";
import PostCard from "./PostCard";
import NavigationBar from "./NavigationBar";

interface Post {
  id: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Check authentication status
  useEffect(() => {
    // Mock authentication check - replace with actual auth logic
    const checkAuth = () => {
      // Simulating an authenticated user
      const authenticated = true; // Replace with actual auth check
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        navigate("/auth");
      }
    };

    checkAuth();
  }, [navigate]);

  // Fetch posts
  useEffect(() => {
    // Mock API call to fetch posts
    const fetchPosts = () => {
      setLoading(true);

      // Simulated API response
      const mockPosts: Post[] = [
        {
          id: "1",
          username: "jane_doe",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
          imageUrl:
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
          caption:
            "Enjoying a beautiful day at the beach! 🏖️ #summer #vacation",
          likes: 243,
          comments: [
            {
              id: "c1",
              username: "john_smith",
              text: "Looks amazing!",
              timestamp: "2h ago",
            },
            {
              id: "c2",
              username: "travel_lover",
              text: "Which beach is this?",
              timestamp: "1h ago",
            },
          ],
          timestamp: "3h ago",
        },
        {
          id: "2",
          username: "food_enthusiast",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=food",
          imageUrl:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
          caption: "Homemade pizza night! 🍕 #foodie #homecooking",
          likes: 187,
          comments: [
            {
              id: "c3",
              username: "chef_mike",
              text: "Recipe please!",
              timestamp: "45m ago",
            },
          ],
          timestamp: "5h ago",
        },
        {
          id: "3",
          username: "travel_addict",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=travel",
          imageUrl:
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
          caption:
            "Mountain views that take your breath away ⛰️ #hiking #adventure",
          likes: 432,
          comments: [
            {
              id: "c4",
              username: "mountain_lover",
              text: "Where is this?",
              timestamp: "2h ago",
            },
            {
              id: "c5",
              username: "photo_pro",
              text: "Great composition!",
              timestamp: "1h ago",
            },
          ],
          timestamp: "1d ago",
        },
      ];

      setPosts(mockPosts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (!isAuthenticated) {
    return null; // Will redirect to auth page via useEffect
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-center">Instagram</h1>
      </header>

      <main className="flex-1 overflow-auto">
        {/* Stories Carousel */}
        <div className="py-4 border-b border-gray-200">
          <StoriesCarousel />
        </div>

        {/* Posts Feed */}
        <div className="max-w-xl mx-auto py-4 px-4 sm:px-0">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500">Loading posts...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Navigation Bar */}
      <div className="sticky bottom-0 z-10">
        <NavigationBar />
      </div>
    </div>
  );
};

export default Home;
