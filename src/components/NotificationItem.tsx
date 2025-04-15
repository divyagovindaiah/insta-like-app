import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  username: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

const NotificationItem = ({ notification, onClick }: NotificationItemProps) => {
  const { type, username, userAvatar, content, timestamp, read } = notification;

  const getTypeIcon = () => {
    switch (type) {
      case "like":
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-red-500 fill-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
        );
      case "comment":
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-blue-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        );
      case "follow":
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-green-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" x2="19" y1="8" y2="14" />
              <line x1="22" x2="16" y1="11" y2="11" />
            </svg>
          </div>
        );
      case "mention":
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-purple-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-start p-4 hover:bg-gray-50 cursor-pointer transition-colors",
        !read && "bg-blue-50",
      )}
    >
      <Avatar className="h-10 w-10 mr-3">
        <AvatarImage src={userAvatar} alt={username} />
        <AvatarFallback>
          {username.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium">
            <span className="font-semibold">{username}</span> {content}
          </p>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
            {timestamp}
          </span>
        </div>
      </div>
      <div className="ml-3">{getTypeIcon()}</div>
    </div>
  );
};

export default NotificationItem;
