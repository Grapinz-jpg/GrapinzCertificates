import React from 'react';
import { motion } from 'framer-motion';

const courses = [
  { id: 1, title: 'Graphics Designing', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=500&auto=format&fit=crop' },
  { id: 2, title: 'Video Editing', img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=500&auto=format&fit=crop' },
  { id: 3, title: 'Digital Marketing', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop' },
  { id: 4, title: 'Programming', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500&auto=format&fit=crop' },
  { id: 5, title: '3D Animation', img: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=500&auto=format&fit=crop' },
  { id: 6, title: 'UI/UX Design', img: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=500&auto=format&fit=crop' },
];

const CourseSlider = () => {
  return (
    <section className="py-12 bg-[#0f172a] overflow-hidden">
      <div className="container mx-auto px-6 mb-8">
        <h2 className="text-2xl font-bold text-white border-l-4 border-cyan-500 pl-4 uppercase tracking-widest">
          Explore Our Specialized Courses
        </h2>
      </div>

      {/* Infinite Scrolling Slider */}
      <div className="flex overflow-hidden group">
        <motion.div 
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: [0, -1800] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...courses, ...courses].map((course, index) => (
            <div 
              key={index} 
              className="relative w-72 h-48 rounded-2xl overflow-hidden border border-gray-800 flex-shrink-0 group/card cursor-pointer"
            >
              <img 
                src={course.img} 
                alt={course.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-6">
                <h3 className="text-white font-bold text-lg">{course.title}</h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CourseSlider;