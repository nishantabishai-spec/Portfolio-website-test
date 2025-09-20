import heroBackground from "@/assets/NishantVelavan_DeepGrove_W_W.webp";
const Home = () => {
  return <div className="min-h-screen relative">
      <div className="hero-bg relative h-[125vh] flex items-center justify-center z-0" style={{
      backgroundImage: `url(${heroBackground})`
    }}>
        <div className="fixed inset-0 flex flex-col items-center justify-center z-10 px-8 text-center">
          <h1 className="gallery-title text-7xl md:text-7xl font-bold mb-6 text-teal-950">Nishant Velavan</h1>
          <p className="text-xl leading-relaxed max-w-3xl mx-auto font-semibold md:text-2xl text-center text-cyan-950">Jack-of-all-styles in a world of whimsy, expression, and detail
</p>
          <div className="mt-3 pt-4">
            <p className="text-base font-bold text-cyan-950">'A weeping world outside my window, I paint what little light I can'</p>
          </div>
        </div>
      </div>
    </div>;
};
export default Home;