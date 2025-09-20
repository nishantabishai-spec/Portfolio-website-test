import artwork1 from "@/assets/profilepic2.jpg";

const isEditMode = import.meta.env.VITE_EDIT_MODE === 'false' || import.meta.env.DEV;

const Bio = () => {
 return <div className="min-h-screen bg-canvas p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="gallery-title text-4xl font-semibold text-foreground mb-8">About Me</h1>
          
          {/* Artist Photo Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-48 h-48 mx-auto p-2 bg-gradient-to-br from-whimsical-accent/20 to-whimsical-secondary/20 rounded-full shadow-whimsical">
                <img src={artwork1} alt="Artist portrait" className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg" />
              </div>
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <div className="space-y-6 text-foreground">
              <p className="text-lg leading-relaxed">






            </p>
              
              <p className="leading-relaxed">My journey starts from simply scribbling horrendous doodles in the corners of middle school exam papers, to then actively developing my skill in high school, and now spending the past 4 years finding myself in who I want to be as an artist. A gross oversimplification, my journey has really been wrought in beauty, trauma, love, and plenty of failure. I have found that who I am now as an artist is influenced by anything and everything. I yearn to discover new art, new music, new places, new people, new experiences, new you name it. I find the world full of the deepest of pains and the most miraculous of joys. Art is my way of understanding, valuing, and reflecting it all back into the world. </p>
              
              <p className="leading-relaxed">
               My artistic practice is defined by two core ideas : discovery and depth. I absolutely refuse to confine my work and creativity into the box of just a single art style. Throughout my life I have constantly found myself studying, experimenting, and developing new styles and ways to express my art. However, over past few years I have found a new aspect of discovery that I brought a sense of wholeness to my artistic practice... depth. I shifted my focus towards taking a few visual languages I already have and pushing to see how full and rich they can truly become. I delved into the technique, form, composition, and feelings of these styles to find my way to mastering them. Thus my artistic practice is the unity between the exploration of new visual languages by which to express myself and the pursuit of mastery over my core art styles.  
              </p>

            
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Bio;
