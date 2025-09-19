import heroBackground from "@/assets/hero-background.jpg";
const Home = () => {
  return <div className="min-h-screen relative">
      <div className="hero-bg min-h-screen flex items-center justify-center" style={{
      backgroundImage: `url(${heroBackground})`
    }}>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
          <h1 className="gallery-title text-6xl md:text-7xl font-bold mb-6 text-teal-800">Nishant Velavan</h1>
          <p className="text-xl leading-relaxed max-w-2xl mx-auto md:text-2xl text-center text-cyan-900">Jack-of-all-styles in a world of whimsy, expression, and detail


 In each moment</p>
          <div className="mt-8 pt-4">
            <p className="text-base text-cyan-800">A weeping world outside my window, I paint what little light I can</p>
          </div>
        </div>
      </div>
    </div>;
};
export default Home;