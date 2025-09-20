import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditableImageProps {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  showEditControls?: boolean;
  placeholder?: string;
  onImageChange?: (imageUrl: string) => void;
}

export const EditableImage = ({
  src,
  alt,
  className,
  containerClassName,
  showEditControls = true,
  placeholder = "Click to add image",
  onImageChange
}: EditableImageProps) => {
  const [imageUrl, setImageUrl] = useState(src || "@/components/profilepic.png"
);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      onImageChange?.(url);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={cn("relative group", containerClassName)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={alt}
          className={cn("object-cover", className)}
        />
      ) : (
        <div className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground border-2 border-dashed border-border",
          className
        )}>
          <div className="text-center p-4">
            <Upload className="mx-auto h-8 w-8 mb-2" />
            <p className="text-sm">{placeholder}</p>
          </div>
        </div>
      )}
      
      {showEditControls && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          
          {isHovered && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="secondary"
                size="icon"
                onClick={handleEditClick}
                className="bg-white/90 hover:bg-white text-black"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};