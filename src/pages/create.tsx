import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, X, Upload } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;

    setIsSubmitting(true);

    try {
      // Simulate API call to create post
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate back to home after successful post
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-gray-500"
          >
            Cancel
          </Button>
          <h1 className="text-xl font-bold">New Post</h1>
          <Button
            disabled={!selectedImage || isSubmitting}
            onClick={handleSubmit}
            className="text-blue-500"
            variant="ghost"
          >
            {isSubmitting ? "Posting..." : "Share"}
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="max-w-xl mx-auto py-4 px-4 sm:px-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {selectedImage ? (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full rounded-md object-cover"
                  style={{ maxHeight: "500px" }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full h-8 w-8"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center">
                <div className="flex flex-col items-center">
                  <Image className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Drag photos here
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    or click to select from your device
                  </p>
                  <Label
                    htmlFor="image-upload"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer"
                  >
                    Select from device
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
              />
            </div>
          </form>
        </div>
      </main>

      {/* Navigation Bar */}
      <div className="sticky bottom-0 z-10">
        <NavigationBar />
      </div>
    </div>
  );
};

export default CreatePostPage;
