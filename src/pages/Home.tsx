import heroBackground from "@/assets/NishantVelavan_house2_W.jpg";
const Home = () => {
  return <div className="min-h-screen relative">
      <div className="hero-bg min-h-screen flex items-center justify-center" style={{
      backgroundImage: `url(${heroBackground})`
    }}>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
          <h1 className="gallery-title text-6xl md:text-7xl font-bold text-foreground mb-6">Nishant Velavan</h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Contemporary works exploring the boundaries between 
            form and expression, tradition and innovation.
          </p>
          <div className="mt-8 pt-4">
            <p className="text-muted-foreground">
              Scroll through the navigation to explore my portfolio
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default Home;