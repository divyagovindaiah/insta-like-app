import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { motion } from "framer-motion";

interface PostCardProps {
  username?: string;
  userAvatar?: string;
  imageUrl?: string;
  caption?: string;
  likesCount?: number;
  comments?: Array<{ username: string; text: string }>;
  timestamp?: string;
}

const PostCard = ({
  username = "johndoe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  imageUrl = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
  caption = "Beautiful sunset at the beach! #sunset #beach #vacation",
  likesCount = 124,
  comments = [
    { username: "janedoe", text: "Amazing view! 😍" },
    { username: "mike_smith", text: "Where is this?" },
  ],
  timestamp = "2 hours ago",
}: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likesCount);
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState(comments);

  const handleLike = () => {
    if (!liked) {
      setCurrentLikes(currentLikes + 1);
    } else {
      setCurrentLikes(currentLikes - 1);
    }
    setLiked(!liked);
  };

  const handleDoubleTap = () => {
    if (!liked) {
      setLiked(true);
      setCurrentLikes(currentLikes + 1);
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 1000);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setLocalComments([
        ...localComments,
        { username: "currentuser", text: newComment.trim() },
      ]);
      setNewComment("");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-6 bg-white border border-gray-200">
      <CardHeader className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={userAvatar} alt={username} />
            <AvatarFallback>
              {username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{username}</span>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>

      <div className="relative" onDoubleClick={handleDoubleTap}>
        <img
          src={imageUrl}
          alt="Post content"
          className="w-full object-cover"
          style={{ maxHeight: "500px" }}
        />
        {showHeartAnimation && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Heart className="h-24 w-24 text-white fill-red-500" />
          </motion.div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleLike}
            >
              <Heart
                className={`h-6 w-6 ${liked ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleSave}
          >
            <Bookmark className={`h-6 w-6 ${saved ? "fill-black" : ""}`} />
          </Button>
        </div>

        <div className="font-medium mb-1">{currentLikes} likes</div>

        <div className="mb-2">
          <span className="font-medium mr-2">{username}</span>
          <span>{caption}</span>
        </div>

        {localComments.length > 0 && (
          <button
            className="text-gray-500 text-sm mb-2"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments
              ? "Hide comments"
              : `View all ${localComments.length} comments`}
          </button>
        )}

        {showComments && (
          <div className="space-y-2 mt-2">
            {localComments.map((comment, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium mr-2">{comment.username}</span>
                <span>{comment.text}</span>
              </div>
            ))}
          </div>
        )}

        <div className="text-gray-500 text-xs mt-2">{timestamp}</div>
      </CardContent>

      <CardFooter className="p-4 pt-0 border-t border-gray-100">
        <form
          onSubmit={handleCommentSubmit}
          className="w-full flex items-center"
        >
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 border-none outline-none text-sm"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="text-blue-500 font-medium"
            disabled={!newComment.trim()}
          >
            Post
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
