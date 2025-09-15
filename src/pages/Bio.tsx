import { EditableImage } from "@/components/EditableImage";

const isEditMode = import.meta.env.VITE_EDIT_MODE === 'true' || import.meta.env.DEV;

const Bio = () => {
  return (
    <div className="min-h-screen bg-canvas p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="gallery-title text-4xl font-semibold text-foreground mb-8">
            About the Artist
          </h1>
          
          {/* Artist Photo Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-48 h-48 mx-auto p-2 bg-gradient-to-br from-whimsical-accent/20 to-whimsical-secondary/20 rounded-full shadow-whimsical">
                <EditableImage
                  alt="Artist portrait"
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                  showEditControls={isEditMode}
                  placeholder="Add your portrait"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <div className="space-y-6 text-foreground">
              <p className="text-lg leading-relaxed">
                Welcome to my artistic journey. I am a contemporary artist passionate about 
                exploring the intersection of traditional techniques and modern expression. 
                My work focuses on the delicate balance between structure and spontaneity, 
                order and chaos.
              </p>
              
              <p className="leading-relaxed">
                With over a decade of experience in various mediums, I have developed a 
                distinctive style that combines abstract expressionism with minimalist 
                sensibilities. Each piece is an exploration of color, form, and texture, 
                designed to evoke emotion and provoke thought.
              </p>
              
              <p className="leading-relaxed">
                My artistic practice is rooted in the belief that art should be both 
                intellectually stimulating and emotionally resonant. I draw inspiration 
                from nature, architecture, and the human experience, translating these 
                observations into visual narratives that speak to universal themes.
              </p>

              <div className="pt-6 mt-8 border-t border-border">
                <h3 className="gallery-title text-xl font-medium mb-4">Education & Exhibitions</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>• MFA in Fine Arts, Contemporary Art Institute</p>
                  <p>• Featured in numerous solo and group exhibitions</p>
                  <p>• Works in private collections worldwide</p>
                  <p>• Recipient of the Emerging Artist Award 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;