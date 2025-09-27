import { useState } from "react";
import { Play } from "lucide-react";

interface VideoEmbedProps {
  url: string;
  title?: string;
  className?: string;
}

export function VideoEmbed({ url, title = "Video", className = "" }: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Extract YouTube video ID from URL
  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = extractYouTubeId(url);
  
  if (!videoId) {
    return (
      <div className="bg-surface-muted rounded-lg p-4 text-center text-surface-foreground/70">
        Invalid YouTube URL
      </div>
    );
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      {!isLoaded ? (
        <div 
          className="relative cursor-pointer group"
          onClick={handleLoad}
        >
          <div className="aspect-video relative">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to medium quality thumbnail if maxres doesn't exist
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 hover:bg-red-700 transition-colors rounded-full p-4 group-hover:scale-110 transform transition-transform">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-sm font-medium">{title}</p>
          </div>
        </div>
      ) : (
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}