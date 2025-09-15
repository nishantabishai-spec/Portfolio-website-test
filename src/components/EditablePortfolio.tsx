import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ImageViewer } from "@/components/ImageViewer";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const isEditMode = import.meta.env.VITE_EDIT_MODE === 'true' || import.meta.env.DEV;

interface Artwork {
  id: number;
  title: string;
  year: string;
  medium: string;
  images: string[];
}

// ---------------------------
// DYNAMIC IMPORT TRICK
// ---------------------------

// Put all artwork images in src/assets/artworks/
// e.g., src/assets/artworks/artwork-1.jpg
const artworkModules = import.meta.glob('@/assets/*.{jpg,png}', { eager: true, as: 'url'  });


const initialArtworks: Artwork[] = [
  {
    id: 1,
    title: "reeeeee",
    year: "2024",
    medium: "Mixed Media on Canvas",
    images: [artworkModules["house inthe mountainscloseup2.jpg"]],

  },
  {
    id: 2,
    title: "Geometric Harmony",
    year: "2024",
    medium: "Acrylic on Canvas",
    images: [artwork2],
  },
  {
    id: 3,
    title: "Expression in Motion",
    year: "2023",
    medium: "Oil on Canvas",
    images: [artwork3],
  },
];

export const EditablePortfolio = () => {
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewingArtwork, setViewingArtwork] = useState<Artwork | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleAddArtwork = () => {
    setEditingArtwork({
      id: Date.now(),
      title: "",
      year: "",
      medium: "",
      images: [artwork1], // Default image
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditArtwork = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleSaveArtwork = () => {
    if (!editingArtwork) return;

    if (isEditing) {
      setArtworks(artworks.map(art => 
        art.id === editingArtwork.id ? editingArtwork : art
      ));
    } else {
      setArtworks([...artworks, editingArtwork]);
    }

    setIsDialogOpen(false);
    setEditingArtwork(null);
  };

  const handleDeleteArtwork = (id: number) => {
    setArtworks(artworks.filter(art => art.id !== id));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length || !editingArtwork) return;

    const urls = files.map((file) => URL.createObjectURL(file));
    setEditingArtwork({
      ...editingArtwork,
      images: [...(editingArtwork.images || []), ...urls],
    });
    // allow re-adding the same file if needed
    event.currentTarget.value = "";
  };

  const handleRemoveEditingImage = (index: number) => {
    if (!editingArtwork) return;
    const nextImages = [...(editingArtwork.images || [])];
    nextImages.splice(index, 1);
    setEditingArtwork({ ...editingArtwork, images: nextImages });
  };

  const handleViewArtwork = (artwork: Artwork) => {
    setViewingArtwork(artwork);
    setIsViewerOpen(true);
  };

  return (
    <div className="min-h-screen bg-canvas p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="gallery-title text-4xl font-semibold text-foreground mb-4">
              Portfolio
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              A curated collection of contemporary works exploring form, color, and expression 
              through various mediums and techniques.
            </p>
          </div>
          
          {isEditMode && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={handleAddArtwork}
                  className="bg-whimsical-primary hover:bg-whimsical-primary/90 text-white rounded-full p-3 shadow-lg"
                  size="icon"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="gallery-title">
                  {isEditing ? "Edit Artwork" : "Add New Artwork"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingArtwork?.title || ""}
                    onChange={(e) => setEditingArtwork(prev => 
                      prev ? { ...prev, title: e.target.value } : null
                    )}
                    placeholder="Artwork title"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={editingArtwork?.year || ""}
                    onChange={(e) => setEditingArtwork(prev => 
                      prev ? { ...prev, year: e.target.value } : null
                    )}
                    placeholder="2024"
                  />
                </div>
                <div>
                  <Label htmlFor="medium">Medium</Label>
                  <Input
                    id="medium"
                    value={editingArtwork?.medium || ""}
                    onChange={(e) => setEditingArtwork(prev => 
                      prev ? { ...prev, medium: e.target.value } : null
                    )}
                    placeholder="Oil on Canvas"
                  />
                </div>
                <div>
                  <Label htmlFor="image">Images</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Current images: {editingArtwork?.images?.length || 0}
                  </p>
                  {!!(editingArtwork?.images?.length) && (
                    <div className="mt-3 grid grid-cols-3 gap-3">
                      {editingArtwork!.images.map((img, idx) => (
                        <div key={idx} className="relative group rounded-md overflow-hidden border border-whimsical-border/40 bg-whimsical-soft/40">
                          <img
                            src={img}
                            alt={`Preview ${idx + 1}`}
                            className="h-20 w-full object-cover"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute top-1 right-1 h-6 w-6 opacity-90"
                            onClick={() => handleRemoveEditingImage(idx)}
                            aria-label={`Remove image ${idx + 1}`}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Button 
                  onClick={handleSaveArtwork}
                  className="w-full bg-whimsical-secondary hover:bg-whimsical-secondary/90"
                >
                  {isEditing ? "Update" : "Add"} Artwork
                </Button>
              </div>
              </DialogContent>
            </Dialog>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <Card key={artwork.id} className="group relative bg-whimsical-soft/30 border-2 border-whimsical-border/50 hover:border-whimsical-primary/50 transition-all duration-300">
              <CardContent className="p-0">
                <div className="gallery-image rounded-lg overflow-hidden">
                  <img
                    src={artwork.images[0]}
                    alt={artwork.title}
                    className="w-full h-80 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => handleViewArtwork(artwork)}
                  />
                  {artwork.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      +{artwork.images.length - 1} more
                    </div>
                  )}
                  {isEditMode && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-x-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => handleEditArtwork(artwork)}
                        className="bg-whimsical-accent hover:bg-whimsical-accent-hover h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDeleteArtwork(artwork.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="gallery-title text-xl font-medium text-foreground">
                    {artwork.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {artwork.year} • {artwork.medium}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ImageViewer
          artwork={viewingArtwork}
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
        />
      </div>
    </div>
  );
};
