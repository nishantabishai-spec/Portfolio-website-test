import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
interface Artwork {
  id: number;
  title: string;
  year: string;
  medium: string;
  images: string[];
}
interface ImageViewerProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}
export const ImageViewer = ({
  artwork,
  isOpen,
  onClose
}: ImageViewerProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [artwork]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen || !artwork) return;
      if (event.key === 'ArrowLeft') {
        setCurrentImageIndex(prev => prev > 0 ? prev - 1 : artwork.images.length - 1);
      } else if (event.key === 'ArrowRight') {
        setCurrentImageIndex(prev => prev < artwork.images.length - 1 ? prev + 1 : 0);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, artwork]);
  if (!artwork) return null;
  const currentImage = artwork.images[currentImageIndex];
  const hasMultipleImages = artwork.images.length > 1;
  const goToPrevious = () => {
    setCurrentImageIndex(prev => prev > 0 ? prev - 1 : artwork.images.length - 1);
  };
  const goToNext = () => {
    setCurrentImageIndex(prev => prev < artwork.images.length - 1 ? prev + 1 : 0);
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="w-[100vw] md:max-w-[95vw] max-h-[95vh] p-4 bg-whimsical-soft/95 backdrop-blur-sm border-2 border-whimsical-border/30 box-border">
    <div className="flex flex-col md:flex-row max-h-[90vh]">

      {/* Image Section */}
      <div className="flex-1 relative flex items-center justify-center bg-gradient-to-br from-whimsical-soft/50 to-whimsical-accent/20 p-2">
        <img
          src={currentImage}
          alt={`${artwork.title} - Image ${currentImageIndex + 1}`}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-fade-in"
          style={{
            filter: 'drop-shadow(0 10px 30px hsl(var(--whimsical-primary) / 0.2))'
          }}
        />
            
            {/* Navigation Arrows - Only show if multiple images */}
            {hasMultipleImages && <>
                <Button variant="secondary" size="icon" className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black shadow-lg" onClick={goToPrevious}>
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <Button variant="secondary" size="icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-black shadow-lg" onClick={goToNext}>
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>}

            {/* Image Counter */}
            {hasMultipleImages && <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {artwork.images.length}
              </div>}
          </div>
          
          {/* Description Panel - Reduced width */}
          <div className="hidden md:flex w-64 bg-whimsical-canvas/90 backdrop-blur border-l-2 border-whimsical-border/30 p-4 flex-col">
            <div className="space-y-2 mb-4">
              <h2 className="gallery-title text-xl font-medium text-foreground">
                {artwork.title}
              </h2>
              <p className="text-whimsical-muted text-sm">
                {artwork.year} • {artwork.medium}
              </p>
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="h-px bg-gradient-to-r from-whimsical-border/50 via-whimsical-primary/30 to-transparent"></div>
              
              <div className="space-y-2 text-muted-foreground">
                <p className="text-xs leading-relaxed">Thiarkas represents a unique exploration of form and color, capturing the essence of contemporary artistic expression.</p>
                
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-whimsical-muted">Created:</span>
                    <span>{artwork.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-whimsical-muted">Medium:</span>
                    <span className="truncate ml-2">{artwork.medium}</span>
                  </div>
                  {hasMultipleImages && <div className="flex justify-between">
                      <span className="text-whimsical-muted">Images:</span>
                      <span>{artwork.images.length}</span>
                    </div>}
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-whimsical-border/30">
              <p className="text-xs text-whimsical-muted text-center">
                {hasMultipleImages && "Use arrow keys or buttons to navigate • "}
                Press ESC to close
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};