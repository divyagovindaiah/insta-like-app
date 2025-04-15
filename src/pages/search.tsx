import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";

interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  isFollowing: boolean;
}

interface SearchResult {
  users: User[];
  posts: any[];
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult>({
    users: [],
    posts: [],
  });
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<User[]>([]);

  // Mock data for users
  const mockUsers: User[] = [
    {
      id: "1",
      username: "photography_lover",
      name: "Alex Photography",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      isFollowing: false,
    },
    {
      id: "2",
      username: "travel_addict",
      name: "Travel Enthusiast",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=travel",
      isFollowing: true,
    },
    {
      id: "3",
      username: "food_explorer",
      name: "Foodie Adventures",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=food",
      isFollowing: false,
    },
    {
      id: "4",
      username: "fitness_guru",
      name: "Fitness Coach",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fitness",
      isFollowing: false,
    },
    {
      id: "5",
      username: "art_creator",
      name: "Creative Artist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=art",
      isFollowing: true,
    },
  ];

  // Initialize recent searches
  useEffect(() => {
    setRecentSearches([mockUsers[1], mockUsers[4], mockUsers[0]]);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      setLoading(true);

      // Simulate search API call
      setTimeout(() => {
        const filteredUsers = mockUsers.filter(
          (user) =>
            user.username.toLowerCase().includes(query.toLowerCase()) ||
            user.name.toLowerCase().includes(query.toLowerCase()),
        );

        setResults({
          users: filteredUsers,
          posts: [], // We're not implementing post search for this example
        });
        setLoading(false);
      }, 300);
    } else {
      setResults({ users: [], posts: [] });
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResults({ users: [], posts: [] });
  };

  const addToRecentSearches = (user: User) => {
    // Remove if already exists
    const updatedRecent = recentSearches.filter((item) => item.id !== user.id);
    // Add to beginning of array
    setRecentSearches([user, ...updatedRecent.slice(0, 4)]);
  };

  const removeFromRecentSearches = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches(recentSearches.filter((user) => user.id !== userId));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-10 w-full"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="max-w-xl mx-auto py-4 px-4 sm:px-0">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500">Searching...</p>
            </div>
          ) : searchQuery ? (
            // Search results
            <div className="space-y-1">
              {results.users.length > 0 ? (
                results.users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => addToRecentSearches(user)}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.avatar} alt={user.username} />
                        <AvatarFallback>
                          {user.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm text-gray-500">{user.name}</p>
                      </div>
                    </div>
                    <Button
                      variant={user.isFollowing ? "outline" : "default"}
                      size="sm"
                      className="ml-2"
                    >
                      {user.isFollowing ? "Following" : "Follow"}
                    </Button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <SearchIcon className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-gray-500">
                    No results found for "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          ) : (
            // Recent searches
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent</h2>
                {recentSearches.length > 0 && (
                  <Button variant="ghost" size="sm" className="text-blue-500">
                    Clear All
                  </Button>
                )}
              </div>

              {recentSearches.length > 0 ? (
                <div className="space-y-1">
                  {recentSearches.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={user.avatar} alt={user.username} />
                          <AvatarFallback>
                            {user.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.username}</p>
                          <p className="text-sm text-gray-500">{user.name}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => removeFromRecentSearches(user.id, e)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <SearchIcon className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-gray-500">No recent searches</p>
                </div>
              )}
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

export default SearchPage;
