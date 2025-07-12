import { useState, useEffect } from "react";
import { fetchReviews, submitReview } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState("");
  const [name, setName] = useState("");
  const { user } = useAuth();

  const loadReviews = async () => {
    try {
      const res = await fetchReviews(user.token);
      setReviews(res.data.reverse());
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };

  useEffect(() => {
    if (user?.token) {
      loadReviews();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewInput.trim() || !name.trim()) return;

    const newReview = {
      name,
      reviewText: reviewInput,
    };

    try {
      await submitReview(newReview, user.token);
      setReviewInput("");
      setName("");
      loadReviews();
    } catch (err) {
      console.error("Failed to submit review", err);
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-sky-500 py-10 px-4 text-black font-sans">
      <section className="max-w-5xl mx-auto bg-white/40 backdrop-blur-md rounded-xl shadow-xl p-8">
        <header>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-black mb-8 animate-fadeIn drop-shadow">
            Share Your Experience with TODO App ✍️
          </h2>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 items-center justify-center mb-10"
        >
          <input
            aria-label="Your Name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2.5 text-sm rounded-md w-full md:w-1/5 border border-purple-300 shadow-inner bg-white/80 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />
          <input
            aria-label="Your Review"
            type="text"
            placeholder="Write your review..."
            value={reviewInput}
            onChange={(e) => setReviewInput(e.target.value)}
            className="px-4 py-2.5 text-sm rounded-md w-full md:flex-1 border border-purple-300 shadow-inner bg-white/80 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-purple-700 transition duration-200 shadow-md"
          >
            Submit
          </button>
        </form>

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-center text-gray-800 font-medium">
              No reviews yet. Be the first to share your thoughts!
            </p>
          ) : (
            reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-white/80 border border-purple-200 p-4 rounded shadow hover:shadow-lg transition motion-reduce:animate-none"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-purple-700">
                    {review.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-800">{review.reviewText}</p>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
