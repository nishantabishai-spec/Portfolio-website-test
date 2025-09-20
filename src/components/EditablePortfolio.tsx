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
  description: string;
}

// ---------------------------
// DYNAMIC IMPORT TRICK
// ---------------------------

// Put all artwork images in src/assets/artworks/
// e.g., src/assets/artworks/artwork-1.jpg
const artworkModules = import.meta.glob('@/assets/*.{webp,jpg,png}', { eager: true, as: 'url'  });


const initialArtworks: Artwork[] = [
  {
    id: 1,
    title: "Serenity : Up in Smoke",
    year: "2025",
    medium: "Book Cover - Personal Project",
    description: "Concept Book Cover inspired by a hill near my house. Digitally painted it over the course of two days. A big emphasis was placed on creating a whimsical and tranquil tone, as well as detailed rendering in foliage.",
    images: [artworkModules["/src/assets/NishantVelavan_houseinthemountains23_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_houseinthemountains22_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_houseinthemountains2_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_houseinthemountainscloseup3_W_W.webp"],
  ],
}
  ,
  {
    id: 2,
    title: "Taro : Man's Weirdest Fren",
    year: "2025",
    medium: "Cinematic Study - Personal Project",
    description: "Cinematic study artwork made with animation potential in mind. Conceptualised and illustrated in 4 hours, keeping a focus on engaging composition, vibrant lighting, and expressive characters",
    images: [artworkModules["/src/assets/NishantVelavan_manandcat_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_ManandCat_Crop_W.webp"],
              artworkModules["/src/assets/NishantVelavan_manandcat_SketchW_W.webp"],       
  ],
  },
  {
    id: 3,
    title: "Nobe Ody's Poetry: A Step Further",
    year: "2025",
    medium: "Illustrated Writing - Personal Project",
    description: "Introspective piece featuring both poetry and illustration by me. A big focus was placed on the connection between the feelings of the writing and the artwork.",
    images: [artworkModules["/src/assets/NishantVelavan_DistantLonging_poem_2025_W.webp"],
              artworkModules["/src/assets/NishantVelavan_ADistantLonging_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_FieldsofLonging_CLean_W_W.webp"],       
              artworkModules["/src/assets/NishantVelavNishantVelavan_DistantLonging_Clean_2025_W_W.webp"],
            ],
  },
 {
    id: 4,
    title: "A Home I Wish was My Memory",
    year: "2025",
    medium: "Location Design - Personal Project",
    description: "Concept artwork made with animation background potential in mind. The framing was done to intentionally feel like a moment from a story not yet told. ",
    images: [artworkModules["/src/assets/NishantVelavan_house2_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_house2_CropW_W.webp"],
              artworkModules["/src/assets/NishantVelavan_house2_SketchW_W.webp"],       
            ],
  },
   {
    id: 5,
    title: "Whispers of a Bluejay",
    year: "2025",
    medium: "Book Cover - Personal Project",
    description: "Concept Book focused on exploration of rendering technique as well as speed. Painted entirely in an 2 hours, what was supposed to be a simple practice artwork turned into something to be rather proud of.",
    images: [artworkModules["/src/assets/NishantVelavan_WVBirds1_W.webp"],
              artworkModules["/src/assets/NishantVelavan_WVBirds1.1_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_WVBirds1.2_W_W.webp"],       
              artworkModules["/src/assets/NishantVelavan_WVBirds1.3_W_W.webp"],
            ],
  },

{
    id: 6,
    title: "Tassena: A style-blended Journey",
    year: "2025",
    medium: "Key Art | Tassena",
    description: "Key promotional art for the game Tassena. The artwork was used to headline promotional and crowdfunding ventures. Created by blending styles from the game cohesively to bring across a feeling of grandeur, drama, and curiosity.",
    images: [artworkModules["/src/assets/NishantVelavan_Tassena_Keyart2_ThePeopleV2_W.webp"],
              artworkModules["/src/assets/NishantVelavan_Tassena_Keyart2_ThePeople4k_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_Tassena_Keyart2_ThePeopleV3_W_W.webp"],       
              artworkModules["/src/assets/NishantVelavan_Tassena_ThePeople_Crop_W.webp"],
              artworkModules["/src/assets/NishantVelavan_Tassena_ThePeople_Crop2_W.webp"],
            ],
  },

{
    id: 7,
    title: "A Stream For One to Heal",
    year: "2025",
    medium: "Cinematic Study - Personal Project",
    description: "A cinematic study made during a time of grief and failure. The level of detail and focus on the background is a direct reflection of the emotions of that time seeping into each brushstroke.",
    images: [artworkModules["/src/assets/NishantVelavan_Unknown01_Full_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_Unknown01_Cove0_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_Unknown01_Cove03_W_W.webp"],       
              artworkModules["/src/assets/NishantVelavan_Unknown01_Crop_W_W.webp"],
            ],
  },


{
    id: 8,
    title: "Tassena: Pins & Stickers",
    year: "2025",
    medium: "Stickers and Enamel Pin Mockups | Tassena",
    description: "Merch mockups for the game Tassena. These mockups were used in displaying incentives and potential to investors and crowdfunding.",
    images: [artworkModules["/src/assets/NishantVelavan_EnamelPins_mockups_W.webp"],
              artworkModules["/src/assets/NishantVelavan_EnamelPins_mockups_Crop_W.webp"],
              artworkModules["/src/assets/NishantVelavan_Sticker_Mockup3_W.webp"],
              artworkModules["/src/assets/NishantVelavan_Sticker_Mockup3_Crop_W.webp"],
            ],
  },

{
    id: 9,
    title: "Skyward Cemetary",
    year: "2025",
    medium: "Character Design - Personal Project",
    description: "Concept Character key art for an OC. This piece aimed to find the harmony between the soft rendering of my backgrounds with characters emphasized prominent linework.",
    images: [artworkModules["/src/assets/NishantVelavan_falling_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_falling2_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_FallingToInfinity_WIP_W.webp"],       
            ],
  },

{
    id: 10,
    title: "Ballad at the End of the World",
    year: "2025",
    medium: "Book Cover - Personal Project",
    description: "Concept book cover vaguely inspired by a conversation with a friend. The illustration explores my soft and painterly style paired with a much darker color palette.",
    images: [artworkModules["/src/assets/NishantVelavan_Keysintheburning2_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_Keysintheburning_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_Keysintheburning_crop_W.webp"],       
            ],
  },

  {
    id: 11,
    title: "A Quaint Summer Morning",
    year: "2025",
    medium: "Book Cover - Personal Project",
    description: "Concept book cover made during... well... a rather quaint summer morning :D The illustration began as a simple profile study but then evolved as the warms mellow of the day took more real estate in my mind.",
    images: [artworkModules["/src/assets/NishantVelavan_quaintsummer_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_quaintsummer_CleanW_W.webp"],
              artworkModules["/src/assets/NishantVelavan_QuaintSummer_Sketch_W.webp"],       
            ],
  },

  {
    id: 12,
    title: "Nobe Ody's Poetry: What You Need",
    year: "2025",
    medium: "Illustrated Writing - Personal Project",
    description: "Introspective piece featuring both poetry and illustration by me. The background maintains a lighter precence in order to elevate the poem rather than fight with it.",
    images: [artworkModules["/src/assets/NishantVelavan_NishantVelavan_MellowBirds_Poem_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_NishantVelavan_MellowBirds_Clean_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_MellowBirds_CleanAlt_W.webp"],       
            ],
  },

  {
    id: 13,
    title: "Feelings in Welkin Reflection",
    year: "2025",
    medium: "Cinematic Study - Personal Project",
    description: "A cinematic study illustrated to feel like concept stills from animations yet untold. The artworks push stong focal composition to highlight the weight of the moment, while the backgrounds define the emotion and intensity.",
    images: [artworkModules["/src/assets/NishantVelavan_sunlitwindmill_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_onboat_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_sunlitwindmill_BG_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_sunlitwindmill_AltW_W.webp"],
              artworkModules["/src/assets/NishantVelavan_sunlitwindmill_SketchW_W.webp"],       
            ],
  },

   {
    id: 14,
    title: "Justa : Cloud Study",
    year: "2024",
    medium: "Technique Exploration",
    description: "A very technical study of into rendering clouds to understand form as well as creating varying weight from the same subject.",
    images: [artworkModules["/src/assets/NishantVelavan_Maybethebutterfliesareasleepv4_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_MaybetheKaolaBearshaveeyesV2_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_Maybethebutterfliesareasleepv1_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_MaybetheKaolaBearshaveeyesV3_W_W.webp"],       
            ],
  },

   {
    id: 15,
    title: "Justa : Forest Study",
    year: "2024",
    medium: "Technique Exploration",
    description: "A study of forests with a focus on understanding rendering texture as well as relaying a cohesive tone.",
    images: [artworkModules["/src/assets/NishantVelavan_A_Moment_In_The_Forest_result_W.webp"],
              artworkModules["/src/assets/NishantVelavan_TheForest3_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_TheForest2_result_W.webp"],
              artworkModules["/src/assets/NishantVelavan_TheForest1_result_W.webp"],      
            ],
  },

   {
    id: 16,
    title: "OpenBill : Fortress to the Stars",
    year: "2025",
    medium: "Book Cover - Personal Project",
    description: "Book cover project made right after 'whispers of a Bluejay'. The design simply captures the very first idea of a story that came to mind when looking at references of an openbill stork :)",
    images: [artworkModules["/src/assets/NishantVelavan_WVBirds2_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_WVBirds2.1_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_WVBirds2.3_W_W.webp"],      
            ],
  },

  {
    id: 17,
    title: "Justa : Sketch and Colour Study",
    year: "2024",
    medium: "Technique Exploration",
    description: "A style and technique study into harmonizing between a watercolour feeling and sketchy, rough linework. They also reflect skill in planning and drafting, highlighting parts of process of rough sketcht to final work",
    images: [artworkModules["/src/assets/NishantVelavan_WorkersVillageTest5_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_WorkersVillageTest1Sketch1_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_WorkersVillageTest7_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_WorkersVillageTest2_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_WorkersVillageTest7Sketch_W_W.webp"],       
            ],
  },

  {
    id: 18,
    title: "Tassena : Physical Artbook",
    year: "2025",
    medium: "Artbook Mockup | Tassena",
    description: "Deluxe physical artbook mockups for the game Tassena. These mockups were used in displaying incentives and potential to investors and crowdfunding",
    images: [artworkModules["/src/assets/NishantVelavan_DeluxeArtBook_Mockup_Front_W.webp"],
              artworkModules["/src/assets/NishantVelavan_DeluxeArtBook_Mockup_Back_W.webp"],
              artworkModules["/src/assets/NishantVelavan_DeluxeArtBook_Mockup_Open_W.webp"],
              artworkModules["/src/assets/NishantVelavan_DigitalArtbook_Mockup_Front_W.webp"],      
            ],
  },

  {
    id: 19,
    title: "Tassena : Character Cutouts",
    year: "2024",
    medium: "Character Designs | In-game Assets | Tassena ",
    description: "Character design cutouts used in various ways such as in-game dialogue popups, promotional works, and overall visual direction.",
    images: [artworkModules["/src/assets/NishantVelavan_Tasse_Cutout_W.webp"],
              artworkModules["/src/assets/NishantVelavan_Other_Cutout_W.webp"],
              artworkModules["/src/assets/NishantVelavan_Noci_Cutout_W.webp"],
              artworkModules["/src/assets/NishantVelavan_Tassena_KickstarterTiles_W.webp"],     
            ],
  },

  {
    id: 20,
    title: "Tassena : A kaleidoscope Cove",
    year: "2024",
    medium: "Key art | Tassena",
    description: "Key promotional art for the game Tassena. These were used in general art direct, posters, social media, in-person events, and crowdfunding ventures.",
    images: [artworkModules["/src/assets/NishantVelavan_Tassena_Demo1_Posterbase1_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_Tassena_KeyArt2_OnACliff_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_TasseInWater_W_W.webp"],      
            ],
  },

 {
    id: 21,
    title: "Justa : Style Study",
    year: "2024",
    medium: "Technique Exploration",
    description: "More experimental illustration that still fits into the same overall tone of my current core style. A big focus was on finding a harmony between soft color palettes overlayed with hypersaturated linework and etching. This would later evolve into a style used in other work.",
    images: [artworkModules["/src/assets/NishantVelavan_cottageonahillv2.3_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_cottageonahillv2_W_W.webp"],
              artworkModules["/src/assets/NishantVelavan_cottageonahillWIP1_W_W.webp"],      
            ],
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
      description: "",
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
              Portfolio <p className="text-foreground text-2xl leading-relaxed max-w-2xl">
              A Curated Collection of Works Across Various Projects
            </p>
            </h1>
             <p className="text-muted-foreground text-m leading-relaxed max-w-2xl">
              All artworks were hand illustrated on Photoshop a/o Krita
            </p>
             <p className="text-muted-foreground text-m leading-relaxed max-w-2xl">
              No AI was used in the making of any artworks
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
