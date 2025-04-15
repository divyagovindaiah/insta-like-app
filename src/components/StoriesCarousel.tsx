import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface Story {
  id: string;
  username: string;
  avatarUrl: string;
  viewed: boolean;
}

interface StoriesCarouselProps {
  stories?: Story[];
  onStoryClick?: (storyId: string) => void;
}

const StoriesCarousel = ({
  stories = [
    {
      id: "1",
      username: "user1",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
      viewed: false,
    },
    {
      id: "2",
      username: "user2",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=user2",
      viewed: true,
    },
    {
      id: "3",
      username: "user3",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=user3",
      viewed: false,
    },
    {
      id: "4",
      username: "user4",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=user4",
      viewed: true,
    },
    {
      id: "5",
      username: "user5",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=user5",
      viewed: false,
    },
    {
      id: "6",
      username: "user6",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=user6",
      viewed: true,
    },
    {
      id: "7",
      username: "user7",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=user7",
      viewed: false,
    },
    {
      id: "8",
      username: "user8",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=user8",
      viewed: true,
    },
  ],
  onStoryClick = () => {},
}: StoriesCarouselProps) => {
  return (
    <div className="w-full bg-background border-b border-border py-4">
      <ScrollArea className="w-full">
        <div className="flex space-x-4 px-4">
          {stories.map((story) => (
            <StoryAvatar
              key={story.id}
              story={story}
              onClick={() => onStoryClick(story.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

interface StoryAvatarProps {
  story: Story;
  onClick: () => void;
}

const StoryAvatar = ({ story, onClick }: StoryAvatarProps) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <button onClick={onClick} className="relative focus:outline-none">
        <div
          className={`rounded-full p-[2px] ${story.viewed ? "bg-gray-300" : "bg-gradient-to-tr from-yellow-400 to-pink-600"}`}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Avatar className="h-16 w-16 border-2 border-background">
              <AvatarImage src={story.avatarUrl} alt={story.username} />
              <AvatarFallback>
                {story.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
      </button>
      <span className="text-xs truncate w-16 text-center">
        {story.username}
      </span>
    </div>
  );
};

export default StoriesCarousel;
