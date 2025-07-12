// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="min-h-screen w-full overflow-x-hidden relative">
//       {/* Background Image + Overlay */}
//       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584697964192-11e3c0da675c')] bg-cover bg-no-repeat bg-center z-0" />
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-purple-700 to-sky-700 opacity-70 z-0" />

//       {/* Page Content */}
//       <div className="relative z-10 text-white min-h-screen px-4">
//         {/* Custom Animations */}
//         <style>
//           {`
//             @keyframes fadeIn {
//               from { opacity: 0; transform: translateY(20px); }
//               to { opacity: 1; transform: translateY(0); }
//             }

//             @keyframes slideUp {
//               from { opacity: 0; transform: translateY(30px); }
//               to { opacity: 1; transform: translateY(0); }
//             }

//             @keyframes slideFadeIn {
//               from { opacity: 0; transform: translateY(50px) scale(0.95); }
//               to { opacity: 1; transform: translateY(0) scale(1); }
//             }

//             .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
//             .animate-slideUp { animation: slideUp 1s ease-out forwards; }
//             .animate-slideFadeIn { animation: slideFadeIn 1.2s ease-out forwards; }
//           `}
//         </style>

//         <div className="max-w-7xl mx-auto py-10 flex flex-col min-h-screen justify-between font-sans">
//           {/* Hero Header */}
//           <header className="flex flex-col items-center text-center px-6 py-20 animate-fadeIn">
//             <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-xl mb-4 animate-slideUp">
//               <span className="inline-block hover:scale-105 hover:text-yellow-300 transition-transform duration-300">
//                 Welcome to <span className="text-yellow-300">TODO App</span>
//               </span>
//             </h1>
//             <p className="text-white/90 max-w-3xl text-lg mb-8 font-medium animate-fadeIn delay-200 tracking-wide leading-relaxed">
//               <span className="inline-block transition-transform duration-300">
//                 Plan, track, and complete your tasks like a pro. 
//                 <br />
//                 Stay focused with <span className="text-yellow-200 font-semibold">priorities</span>,
//                 <span className="text-yellow-200 font-semibold"> deadlines</span>, and 
//                 <span className="text-yellow-200 font-semibold"> productivity tools</span> – all in one clean interface.
//               </span>
//             </p>
//           </header>

//           {/* Feature Section */}
//           <section className="bg-white/10 backdrop-blur-md py-12 px-6 sm:px-12 rounded-lg">
//             <h2 className="text-center text-3xl font-bold mb-10 drop-shadow-md text-white animate-slideFadeIn">
//               Why Choose Our TODO App?
//             </h2>
//             <div className="grid gap-6 md:grid-cols-3">
//               {[
//                 {
//                   title: "Easy to Use",
//                   desc: "A simple and intuitive interface to manage your tasks effortlessly.",
//                 },
//                 {
//                   title: "Secure",
//                   desc: "Your data is safe with our robust authentication system.",
//                 },
//                 {
//                   title: "Stay Organized",
//                   desc: "Never miss a deadline with our smart scheduling and reminders.",
//                 },
//               ].map((feature, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white/80 text-gray-800 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
//                 >
//                   <h3 className="text-xl font-semibold mb-2 text-purple-700">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-700 font-medium leading-relaxed">
//                     {feature.desc}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Footer */}
//           <footer className="text-center py-5 px-4 bg-black/30 text-white/90 text-sm font-medium mt-10">
//             &copy; 2025 TODO App. All rights reserved.
//           </footer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const features = [
    {
      title: "Easy to Use",
      desc: "A simple and intuitive interface to manage your tasks effortlessly.",
    },
    {
      title: "Secure",
      desc: "Your data is safe with our robust authentication system.",
    },
    {
      title: "Stay Organized",
      desc: "Never miss a deadline with our smart scheduling and reminders.",
    },
  ];

  return (
    <main className="min-h-screen w-full overflow-x-hidden relative font-sans">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584697964192-11e3c0da675c')] bg-cover bg-no-repeat bg-center z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-purple-700 to-sky-700 opacity-70 z-0" />

      <div className="relative z-10 text-white min-h-screen px-4">
        <div className="max-w-7xl mx-auto py-10 flex flex-col min-h-screen justify-between">

          {/* Hero Header */}
          <header className="flex flex-col items-center text-center px-6 py-20">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl font-extrabold drop-shadow-xl mb-4"
            >
              <span className="inline-block hover:scale-105 hover:text-yellow-300 transition-transform duration-300">
                Welcome to <span className="text-yellow-300">TODO App</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white/90 max-w-3xl text-lg mb-8 font-medium tracking-wide leading-relaxed"
            >
              Plan, track, and complete your tasks like a pro. <br />
              Stay focused with <span className="text-yellow-200 font-semibold">priorities</span>,
              <span className="text-yellow-200 font-semibold"> deadlines</span>, and
              <span className="text-yellow-200 font-semibold"> productivity tools</span> – all in one clean interface.
            </motion.p>
          </header>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-md py-12 px-6 sm:px-12 rounded-lg"
          >
            <h2 className="text-center text-3xl font-bold mb-10 drop-shadow-md text-white">
              Why Choose Our TODO App?
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 + 0.6, duration: 0.5 }}
                  className="bg-white/80 text-gray-800 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 motion-reduce:animate-none"
                >
                  <h3 className="text-xl font-semibold mb-2 text-purple-700">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
};

export default Home;
