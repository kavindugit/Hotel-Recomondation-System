// src/pages/Home.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [naturalInput, setNaturalInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const featuredHotels = [
    {
      id: 1,
      name: 'Luxury Beach Resort',
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      rating: 4.8,
      starRating: 5,
      pricePerNight: 15000,
      amenities: ['pool', 'spa', 'wifi'],
    },
    {
      id: 2,
      name: 'Mountain View Inn',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      rating: 4.5,
      starRating: 4,
      pricePerNight: 8000,
      amenities: ['wifi', 'parking', 'restaurant'],
    },
    {
      id: 3,
      name: 'City Skyline Hotel',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      rating: 4.7,
      starRating: 3,
      pricePerNight: 5000,
      amenities: ['wifi', 'gym'],
    },
  ];

  const parseNaturalLanguage = (text) => {
    const requirements = {
      starRating: null,
      maxPrice: null,
      amenities: [],
    };

    // Simple NLU parser (case-insensitive)
    const lowerText = text.toLowerCase();
    const starMatch = lowerText.match(/(\d+)\s*star/);
    if (starMatch) requirements.starRating = parseInt(starMatch[1]);

    const priceMatch = lowerText.match(/under\s*\$?(\d+)/) || lowerText.match(/price\s*below\s*\$?(\d+)/);
    if (priceMatch) requirements.maxPrice = parseInt(priceMatch[1]) * 100; // Convert to INR approx.

    const amenityKeywords = ['pool', 'spa', 'wifi', 'parking', 'restaurant', 'gym'];
    amenityKeywords.forEach((amenity) => {
      if (lowerText.includes(amenity)) requirements.amenities.push(amenity);
    });

    return requirements;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const parsedRequirements = parseNaturalLanguage(naturalInput);

    // Mock recommendation logic based on parsed requirements
    const filteredHotels = featuredHotels.filter((hotel) => {
      const matchesStarRating = parsedRequirements.starRating
        ? hotel.starRating >= parsedRequirements.starRating
        : true;
      const matchesPrice = parsedRequirements.maxPrice
        ? hotel.pricePerNight <= parsedRequirements.maxPrice
        : true;
      const matchesAmenities = parsedRequirements.amenities.length
        ? parsedRequirements.amenities.every((amenity) => hotel.amenities.includes(amenity))
        : true;
      return matchesStarRating && matchesPrice && matchesAmenities;
    });

    setRecommendations(filteredHotels);

    // Uncomment to integrate with a real backend (e.g., NLP API or FastAPI)
    /*
    try {
      const response = await axios.post('http://your-fastapi-url/recommend', { query: naturalInput });
      setRecommendations(response.data.hotels);
    } catch (error) {
      console.error('Recommendation failed:', error);
    }
    */
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-green-100 to-blue-200">
      {/* Hero Section */}
      <motion.section
        className="relative py-20 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.h1
          className="relative text-5xl font-bold text-white mb-4"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Discover Your Perfect Stay
        </motion.h1>
        <motion.p
          className="relative text-xl text-gray-200 mb-8"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Tell us what you need, and we’ll recommend the best hotels
        </motion.p>
        <motion.form
          onSubmit={handleSearch}
          className="relative max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <textarea
            value={naturalInput}
            onChange={(e) => setNaturalInput(e.target.value)}
            placeholder="e.g., I want a 4-star hotel with a pool and under $100"
            className="w-full h-24 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none mb-4"
            required
          />
          <motion.button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Recommendations
          </motion.button>
        </motion.form>
      </motion.section>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <section className="py-16 bg-gray-50">
          <motion.h2
            className="text-3xl font-bold text-gray-800 text-center mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Recommended Hotels for Your Needs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {recommendations.map((hotel) => (
              <motion.div
                key={hotel.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{hotel.name}</h3>
                  <p className="text-gray-600">₹{hotel.pricePerNight}/night</p>
                  <p className="text-yellow-500">★ {hotel.rating}</p>
                  <Link to={`/hotel/${hotel.id}`} className="text-teal-600 hover:underline mt-2 inline-block">
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Hotels Section */}
      <section className="py-16 bg-white">
        <motion.h2
          className="text-3xl font-bold text-gray-800 text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Featured Hotels
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {featuredHotels.map((hotel) => (
            <motion.div
              key={hotel.id}
              className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{hotel.name}</h3>
                <p className="text-gray-600">₹{hotel.pricePerNight}/night</p>
                <p className="text-yellow-500">★ {hotel.rating}</p>
                <Link to={`/hotel/${hotel.id}`} className="text-teal-600 hover:underline mt-2 inline-block">
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        className="py-12 text-center bg-teal-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Stay?</h2>
        <Link to="/login" className="bg-white text-teal-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
          Log In to Book
        </Link>
      </motion.section>
    </div>
  );
};

export default Home;