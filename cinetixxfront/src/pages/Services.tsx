import Header from "../components/Header";
import Footer from "../components/Footer";
import popcornImage from "../assets/popcorn.jpg";
import ticketsImage from "../assets/tickets.jpg";
import moviesImage from "../assets/movies.jpg";
import eventsImage from "../assets/events.jpg";

const Services = () => {
  return (
    <div>
      <Header />
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={popcornImage} alt="Popcorn" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Online Ticket Booking</h2>
                <p className="text-gray-800">Conveniently book your movie tickets online. Choose your seats and showtimes hassle-free.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={ticketsImage} alt="Tickets" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Exclusive Offers</h2>
                <p className="text-gray-800">Unlock special discounts and promotions. Get the best deals for your movie experience.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={moviesImage} alt="Movies" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Latest Releases</h2>
                <p className="text-gray-800">Stay updated with the newest movie releases. Discover the latest films across various genres.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={eventsImage} alt="Events" className="w-full h-64 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Special Events</h2>
                <p className="text-gray-800">Experience exclusive screenings, premieres, and special events. Be part of unforgettable cinematic moments.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
