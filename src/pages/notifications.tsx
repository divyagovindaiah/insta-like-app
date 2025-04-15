import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Bell, BellOff } from "lucide-react";
import NotificationItem, { Notification } from "@/components/NotificationItem";
import NavigationBar from "@/components/NavigationBar";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching notifications
    const fetchNotifications = () => {
      setLoading(true);
      // Mock data
      const mockNotifications: Notification[] = [
        {
          id: "1",
          type: "like",
          username: "jane_doe",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
          content: "liked your photo",
          timestamp: "2m ago",
          read: false,
        },
        {
          id: "2",
          type: "comment",
          username: "photo_enthusiast",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=photo",
          content: "commented: 'Amazing shot! What camera did you use?'",
          timestamp: "15m ago",
          read: false,
        },
        {
          id: "3",
          type: "follow",
          username: "travel_addict",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=travel",
          content: "started following you",
          timestamp: "1h ago",
          read: true,
        },
        {
          id: "4",
          type: "mention",
          username: "mountain_lover",
          userAvatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=mountain",
          content: "mentioned you in a comment",
          timestamp: "3h ago",
          read: true,
        },
        {
          id: "5",
          type: "like",
          username: "food_enthusiast",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=food",
          content: "liked your comment",
          timestamp: "5h ago",
          read: true,
        },
      ];

      setNotifications(mockNotifications);
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const filteredNotifications = notifications.filter((notification) => {
    // Filter by search query
    const matchesSearch =
      notification.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by tab
    const matchesTab =
      activeTab === "all" || (activeTab === "unread" && !notification.read);

    return matchesSearch && matchesTab;
  });

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-blue-500"
            >
              Mark all as read
            </Button>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="max-w-xl mx-auto py-4 px-4 sm:px-0">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 w-full"
            />
          </div>

          {/* Tabs */}
          <Tabs
            defaultValue="all"
            onValueChange={setActiveTab}
            className="mb-4"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">
                All
                <span className="ml-1 text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-0.5">
                  {notifications.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <span className="ml-1 text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Notifications List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-500">Loading notifications...</p>
              </div>
            ) : filteredNotifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={() => handleNotificationClick(notification.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-40 p-4 text-center">
                {searchQuery ? (
                  <>
                    <Search className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-500">
                      No matching notifications found
                    </p>
                  </>
                ) : activeTab === "unread" ? (
                  <>
                    <BellOff className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-500">No unread notifications</p>
                  </>
                ) : (
                  <>
                    <Bell className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-500">No notifications yet</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Navigation Bar */}
      <div className="sticky bottom-0 z-10">
        <NavigationBar />
      </div>
    </div>
  );
};

export default NotificationsPage;
