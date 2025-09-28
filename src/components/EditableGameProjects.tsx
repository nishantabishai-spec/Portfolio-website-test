import { useState } from "react";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EditableText } from "@/components/EditableText";
import { ImageViewer } from "@/components/ImageViewer";
import { VideoEmbed } from "@/components/VideoEmbed";
import { GifViewer } from "@/components/GifViewer";

const isEditMode = import.meta.env.VITE_EDIT_MODE === 'true' || import.meta.env.DEV;
const artworkModules = import.meta.glob('@/assets/*.{webp,jpg,png}', { eager: true, as: 'url'  });

interface SubProject {
  id: string;
  title: string;
  description: string;
  images: string[];
  year?: string;
  medium?: string;
}

interface GameProject {
  id: string;
  title: string;
  year: string;
  engine: string;
  platform: string;
  description: string;
  type: 'game (unreleased)' | 'prototype' | 'concept' | 'art';
  videos: string[]; // YouTube URLs
  subprojects: SubProject[]; // ← NEW
  gifs: string[];
  links: {
    steam?: string;
    itch?: string;
    github?: string;
    website?: string;
  };
}



const initialProjects: GameProject[] = [
  {
    id: "1",
    title: "Tassena",
    year: "2024-25",
    engine: "Unreal Engine",
    platform: "PC",
    description: "A multi-stylistic 2D precision platformer with an heart-felt story to tell. Tassena, by Par2 Studios, is an upcoming game developed by a small but driven multinational indie team. I am one of the founders of the studio and acted as the lead director, artist, and animator for this game. Tassena was in development for year and a half before numerous factors led to the project being placed in indefinate hiatus. The entire team is still on great terms and we look forward to when the stars might align again.",
    type: "game (unreleased)",
    videos: ["https://youtu.be/W-zFKLONLx8"],
     subprojects: [
      
      
       {
        id: "sub-3",
        title: "Genesis Ledge : Environment Assets and Design",
        description: "Hand-illustrated props and assets used in environment design and assembly",
        images: [artworkModules["/src/assets/Tassena_GenLedgeAsset2.webp"], 
          artworkModules["/src/assets/Tassena_GenLedgeAsset3.webp"], 
          artworkModules["/src/assets/Tassena_GenLedgeAsset1.webp"], 
          artworkModules["/src/assets/Tassena_GenLedgeAsset4.webp"]
       ]
      },
      {
        id: "sub-1",
        title: "The Forest : Environment Assets and Design",
        description: "Hand-illustrated props and assets used in environment design and assembly",
        images: [artworkModules["/src/assets/Tassena_Forest_FloraAssetPack.webp" ],
            artworkModules[ "/src/assets/Tassena_Forest_TreeAssetPack.webp"],
            artworkModules[ "/src/assets/Tassena_Forest_CiviliastionAssetPack.webp"]
          ]
      },
      {
        id: "sub-2",
        title: "Working City : Environment Assets and Design",
        description: "Hand-illustrated props and assets used in environment design and assembly",
        images: [artworkModules["/src/assets/Tassena_Workers_BuildingAssetPack.webp"],
                artworkModules[ "/src/assets/Tassena_Workers_MiscAssetPack.webp"],
                artworkModules[ "/src/assets/Tassena_Workers_MetaleryAssetsPack.webp"], 
                artworkModules["/src/assets/Tassena_Workers_TooleryAssetPack.webp"],
      ]
      },
      {
        id: "sub-4",
        title: "Pixel City : Environment Assets and Design",
        description: "Hand-illustrated props and assets used in environment design and assembly",
        images: [artworkModules["/src/assets/Tassena_PixelAsset3.webp"],
          artworkModules[ "/src/assets/Tassena_PixelAsset1.webp"],
            artworkModules[ "/src/assets/Tassena_PixelAsset4.webp"], 
              artworkModules["/src/assets/Tassena_PixelAsset2.webp"],
        ]
            }
    ],
    gifs: ["https://youtu.be/2s7Il0GWvJ8Y", "https://youtu.be/ydCm3j7quUg" , "https://youtu.be/xgFYilF9PWs", "https://youtu.be/Cm9NiWdzXjo"],
    links: {}
  }
];


export function EditableGameProjects() {
  const [projects, setProjects] = useState<GameProject[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<GameProject | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
const [viewingSubproject, setViewingSubproject] = useState<SubProject | null>(null);
const [isViewerOpen, setIsViewerOpen] = useState(false);


  const handleAddProject = () => {
    const newProject: GameProject = {
      id: Date.now().toString(),
      title: "New Game Project",
      year: new Date().getFullYear().toString(),
      engine: "",
      platform: "",
      description: "",
      type: "game (unreleased)",
      subprojects: [],
      videos: [],
      gifs: [],
      links: {}
    };
    setEditingProject(newProject);
    setIsAddDialogOpen(true);
  };

  const handleEditProject = (project: GameProject) => {
    setEditingProject({ ...project });
    setIsEditDialogOpen(true);
  };

  const handleSaveProject = () => {
    if (!editingProject) return;

    if (isAddDialogOpen) {
      setProjects([...projects, editingProject]);
      setIsAddDialogOpen(false);
    } else {
      setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
      setIsEditDialogOpen(false);
    }
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const getTypeColor = (type: GameProject['type']) => {
    switch (type) {
      case 'game (unreleased)': return 'bg-green-100 text-green-800 border-green-200';
      case 'prototype': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'concept': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'art': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const extractYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-canvas p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <EditableText
            text="Game Design & Art"
            className="text-4xl font-gallery font-bold text-surface-foreground mb-4"
            showEditControls={isEditMode}
          />
          <EditableText
            text="Interactive experiences, prototypes, and digital art that explore the intersection of gameplay, narrative, and visual design."
            className="text-lg text-surface-foreground/80 max-w-3xl mx-auto leading-relaxed"
            showEditControls={isEditMode}
          />
          
          {isEditMode && (
            <Button
              onClick={handleAddProject}
              className="mt-6 bg-whimsical-accent hover:bg-whimsical-accent-hover text-whimsical-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Game Project
            </Button>
          )}
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <Card key={project.id} className="bg-surface border-surface-border shadow-whimsical hover:shadow-whimsical-hover transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-surface-foreground text-3xl font-gallery">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(project.type)}`}>
                        {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                      </span>
                      <span className="text-sm text-surface-foreground/70">
                        {project.year} • {project.engine} • {project.platform}
                      </span>
                    </div>
                  </div>
                  
                  {isEditMode && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditProject(project)}
                        className="h-8 w-8"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteProject(project.id)}
                        className="h-8 w-8 text-destructive border-destructive hover:bg-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-surface-foreground/80 leading-relaxed">
                  {project.description}
                </p>

<div className="mt-3 pt-4">
            <p className="text-xl font-gallery font-bold text-cyan-800">Cinematic trailer: fully animated, sequenced, and edited by me</p>
          </div>

                {/* Videos */}
                {project.videos.length > 0 && (
                  <div className="space-y-2">
                    {project.videos.map((videoUrl, index) => (
                      <VideoEmbed key={index} url={videoUrl} title={`${project.title} Cinematic Trailer`} />
                    ))}
                  </div>
                )}

{project.gifs.length > 0 && (
  <h3 className="text-xl font-gallery leading-none font-bold text-cyan-800">
    Key Roles:
  </h3>
)}
{project.gifs.length > 0 && (
  <h3 className="text-sm text-surface-foreground/80 ">
    <span className="text-s text-pink-600 font-semibold">
      Headed Creative Direction:
    </span>{" "}
    Developed the core concept of each location being created in different but cohesive art styles. Conceptulised 10 unique art styles to be used in the game.
  </h3>
)}

{project.gifs.length > 0 && (
  <h3 className="text-sm text-surface-foreground/80 ">
    <span className="text-m text-pink-700 font-semibold">
      Collaborated across Expertise:
    </span>{" "}
      Worked with the team to bring a unified identity between all aspects of the game. Worked with another artist to bring life to the menus and key assets.
  </h3>
)}

{project.gifs.length > 0 && (
  <h3 className="text-sm text-surface-foreground/80 ">
    <span className="text-m text-pink-800 font-semibold">
     Designed and Assembled Levels:
    </span>{" "}
      Handled a majority of environment asset creation as well as solely planned and assembled all locations in-engine.
  </h3>
)}

{project.gifs.length > 0 && (
  <h3 className="text-sm text-surface-foreground/80 ">
    <span className="text-m text-pink-900 font-semibold">
     Created all In-game and Cinematic Animation:
    </span>{" "}
      Traditionally animated all in-game characters, backgrounds, props, and enemies. Also animated all trailers and marketing content.
  </h3>
)}

               {/* Subprojects */}
{project.subprojects.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols- lg:grid-cols-4 gap-4 py-9 mt-4">
    {project.subprojects.slice(0, 4).map((sub) => (
      <Card key={sub.id} className="group relative cursor-pointer border hover:shadow-lg transition-all">
        <CardContent className="p-0">
          <img
            src={sub.images[0]}
            alt={sub.title}
            className="w-full h-40 object-cover rounded-lg"
            onClick={() => {
              setViewingSubproject(sub);
              setIsViewerOpen(true);
            }}
          />
          {sub.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              +{sub.images.length - 1}
            </div>
          )}
        </CardContent>
        <div className="p-2">
          <h4 className="text-sm font-medium">{sub.title}</h4>
          <p className="text-xs text-muted-foreground">{sub.description}</p>
          {isEditMode && (
            <div className="flex gap-2 mt-1">
              <Button size="icon" onClick={() => {/* handle edit subproject */}}><Edit className="w-3 h-3"/></Button>
              <Button size="icon" onClick={() => {/* handle delete subproject */}}><Trash2 className="w-3 h-3"/></Button>
            </div>
          )}
        </div>
    
      
      </Card>
    ))}
  </div>
)}

{/* Header between subprojects and GIFs */}
{project.gifs.length > 0 && (
  <h3 className="text-xl font-gallery font-bold text-cyan-800">
    Designed, Planned, and Assembled All In-game Environments 
  </h3>
)}


                <div className="grid grid-cols-2 gap-2">
  {project.gifs.map((url, index) => (
    <div key={index} className="w-full aspect-[16/9]">
      <GifViewer src={url} alt={`${project.title} animation`} className="w-full h-full" />
    </div>
  ))}
</div>

{/* Subprojects */}
{project.subprojects.length > 0 && (
  <div className="grid grid-cols-1 md:grid-cols- lg:grid-cols-4 gap-4 py-9 mt-4">
    {project.subprojects.slice(4).map((sub) => (
      <Card key={sub.id} className="group relative cursor-pointer border hover:shadow-lg transition-all">
        <CardContent className="p-0">
          <img
            src={sub.images[0]}
            alt={sub.title}
            className="w-full h-40 object-cover rounded-lg"
            onClick={() => {
              setViewingSubproject(sub);
              setIsViewerOpen(true);
            }}
          />
          {sub.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              +{sub.images.length - 1}
            </div>
          )}
        </CardContent>
        <div className="p-2">
          <h4 className="text-sm font-medium">{sub.title}</h4>
          <p className="text-xs text-muted-foreground">{sub.description}</p>
          {isEditMode && (
            <div className="flex gap-2 mt-1">
              <Button size="icon" onClick={() => {/* handle edit subproject */}}><Edit className="w-3 h-3"/></Button>
              <Button size="icon" onClick={() => {/* handle delete subproject */}}><Trash2 className="w-3 h-3"/></Button>
            </div>
          )}
        </div>
    
      
      </Card>
    ))}
  </div>
)}

                {/* Links */}
                {Object.keys(project.links).length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-surface-border">
                    {Object.entries(project.links).map(([platform, url]) => (
                      <Button
                        key={platform}
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-xs"
                      >
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isAddDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false);
            setIsEditDialogOpen(false);
            setEditingProject(null);
          }
        }}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isAddDialogOpen ? "Add New Game Project" : "Edit Game Project"}
              </DialogTitle>
            </DialogHeader>
            
            {editingProject && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        title: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      value={editingProject.year}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        year: e.target.value
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="engine">Engine</Label>
                    <Input
                      id="engine"
                      value={editingProject.engine}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        engine: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Input
                      id="platform"
                      value={editingProject.platform}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        platform: e.target.value
                      })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="type">Project Type</Label>
                  <Select
                    value={editingProject.type}
                    onValueChange={(value) => setEditingProject({
                      ...editingProject,
                      type: value as GameProject['type']
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="game">Released Game</SelectItem>
                      <SelectItem value="prototype">Prototype</SelectItem>
                      <SelectItem value="concept">Concept</SelectItem>
                      <SelectItem value="art">Digital Art</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      description: e.target.value
                    })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="videos">YouTube Videos (one URL per line)</Label>
                  <Textarea
                    id="videos"
                    value={editingProject.videos.join('\n')}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      videos: e.target.value.split('\n').filter(url => url.trim())
                    })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="gifs">GIF URLs (one URL per line)</Label>
                  <Textarea
                    id="gifs"
                    value={editingProject.gifs.join('\n')}
                    onChange={(e) => setEditingProject({
                      ...editingProject,
                      gifs: e.target.value.split('\n').filter(url => url.trim())
                    })}
                    placeholder="https://media.giphy.com/..."
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="steamLink">Steam Link</Label>
                    <Input
                      id="steamLink"
                      value={editingProject.links.steam || ''}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        links: { ...editingProject.links, steam: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="itchLink">Itch.io Link</Label>
                    <Input
                      id="itchLink"
                      value={editingProject.links.itch || ''}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        links: { ...editingProject.links, itch: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="githubLink">GitHub Link</Label>
                    <Input
                      id="githubLink"
                      value={editingProject.links.github || ''}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        links: { ...editingProject.links, github: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="websiteLink">Website Link</Label>
                    <Input
                      id="websiteLink"
                      value={editingProject.links.website || ''}
                      onChange={(e) => setEditingProject({
                        ...editingProject,
                        links: { ...editingProject.links, website: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      setIsEditDialogOpen(false);
                      setEditingProject(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProject}>
                    Save Project
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

    {viewingSubproject && (
  <ImageViewer
    isOpen={isViewerOpen}
    artwork={{
      id: Number(viewingSubproject.id),
      title: viewingSubproject.title,
      year: viewingSubproject.year || '', // fallback
      medium: viewingSubproject.medium || '', // fallback
      images: viewingSubproject.images,
      description: viewingSubproject.description,
    }}
    onClose={() => setIsViewerOpen(false)}
  />
)}

      </div>
    </div>
  );
}