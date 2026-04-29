import React from 'react';

const coursesData = [
  {
    title: "UI UX Designing",
    desc: "65-Day Intensive industry-standard design mastery.",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800"
  },
  {
    title: "VFX & 3D Animation",
    desc: "Mastering Blender, Maya, and ZBrush for cinema.",
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800"
  },
  {
    title: "Web Development",
    desc: "Full-stack programming with modern frameworks.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800"
  },
  {
    title: "Digital Marketing",
    desc: "SEO, SEM, and Social Media strategic growth.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800"
  },
  {
    title: "Adobe Master Course",
    desc: "Professional Video & Photo editing excellence.",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800"
  },
  {
    title: "Programming (Java/IoT)",
    desc: "Backend logic and smart device integration.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800"
  }
];

const Courses = () => {
  return (
    <div className="bg-slate-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
            OUR DOMAIN EXPERTISE
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Industry-focused programs with real-world learning. 
            <span className="hidden sm:inline"> Master in-demand skills with our intensive courses.</span>
          </p>
        </div>

        {/* 
          PERFECT GRID: 3 columns on large screens, 2 on tablets, 1 on mobile
          Automatically creates 2 rows for 6 cards with consistent vertical layout
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {coursesData.map((course, index) => (
            <div
              key={index}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1"
            >
              {/* IMAGE CONTAINER with fixed aspect ratio 2:3 (portrait/vertical) */}
              <div className="relative w-full overflow-hidden bg-gray-900">
                <div style={{ aspectRatio: '3/2' }}>
                  <img
                    src={course.img}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                {/* Optional gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* CONTENT SECTION - vertical text layout */}
              <div className="p-5 flex flex-col gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {course.desc}
                </p>
                
                {/* Button container with flex to ensure proper spacing */}
                <div className="mt-3">
                  <a
                    href="https://api.whatsapp.com/send?phone=918270661266"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <button className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-800">
                      Enroll Now →
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: subtle footer note */}
        <div className="text-center mt-12 text-gray-500 text-xs">
          Limited seats available • Start your learning journey today
        </div>
      </div>
    </div>
  );
};

export default Courses;