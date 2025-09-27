import { useState, useRef } from "react";
import { Play, Pause, Maximize2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GifViewerProps {
  src: string;
  alt: string;
  className?: string;
}

export function GifViewer({ src, alt = "", className = "" }: GifViewerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staticFrame, setStaticFrame] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
  const youtubeId = isYouTube
    ? src.split(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)[1]
    : null;

  const handlePlayPause = () => {
    if (!isYouTube) {
      if (isPlaying) {
        // Capture frame for GIF
        if (imgRef.current && canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            canvasRef.current.width = imgRef.current.naturalWidth;
            canvasRef.current.height = imgRef.current.naturalHeight;
            ctx.drawImage(imgRef.current, 0, 0);
            setStaticFrame(canvasRef.current.toDataURL());
          }
        }
      } else {
        setStaticFrame(null);
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (isYouTube && youtubeId) {
    return (
      <div className={className}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}`}
          title={alt}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <>
      <div className={`relative group rounded-lg overflow-hidden bg-surface-muted ${className}`}>
        {/* Hidden canvas for frame capture */}
        <canvas ref={canvasRef} className="hidden" />
        
        {/* Display either GIF or static frame */}
        {staticFrame ? (
          <img
            src={staticFrame}
            alt={alt}
            className="w-full h-auto object-cover"
          />
        ) : (
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className="w-full h-auto object-cover"
            crossOrigin="anonymous"
          />
        )}
        
        {/* Controls overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors">
          <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePlayPause}
              className="bg-black/70 hover:bg-black/80 text-white border-none"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="bg-black/70 hover:bg-black/80 text-white border-none"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          <div className="relative">
            <img
              src={src}
              alt={alt}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}