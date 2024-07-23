import Header from "../components/Header";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import heroVideo from "../assets/hero-video.mp4";

const Home = () => {
  return (
    <div>
      <Header />
      {/* Hero Section */}
      <div className="relative bg-black text-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="relative z-10">
          <div className="container mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">Welcome to Cinetixx</h1>
            <p className="text-lg mb-8">Experience the magic of cinema with Cinetixx. Book your tickets now for the latest movies!</p>
            <a href="services" className="inline-block px-8 py-3 bg-red-600 text-white rounded-full font-semibold shadow-lg hover:bg-red-700 transition duration-300">What we offer</a>
          </div>
        </div>
      </div>
      {/* Movie List */}
      <div id="tickets">
      <MovieList />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
