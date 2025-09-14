import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

interface Artwork {
  id: number;
  title: string;
  year: string;
  medium: string;
  image: string;
}

const initialArtworks: Artwork[] = [
  {
    id: 1,
    title: "Flowing Forms",
    year: "2024",
    medium: "Mixed Media on Canvas",
    image: artwork1,
  },
  {
    id: 2,
    title: "Geometric Harmony",
    year: "2024",
    medium: "Acrylic on Canvas",
    image: artwork2,
  },
  {
    id: 3,
    title: "Expression in Motion",
    year: "2023",
    medium: "Oil on Canvas",
    image: artwork3,
  },
];

export const EditablePortfolio = () => {
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddArtwork = () => {
    setEditingArtwork({
      id: Date.now(),
      title: "",
      year: "",
      medium: "",
      image: artwork1, // Default image
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
    const file = event.target.files?.[0];
    if (file && editingArtwork) {
      const imageUrl = URL.createObjectURL(file);
      setEditingArtwork({ ...editingArtwork, image: imageUrl });
    }
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
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
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
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <Card key={artwork.id} className="group relative bg-whimsical-soft/30 border-2 border-whimsical-border/50 hover:border-whimsical-primary/50 transition-all duration-300">
              <CardContent className="p-0">
                <div className="gallery-image rounded-lg overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-80 object-cover"
                  />
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
      </div>
    </div>
  );
};