import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import heroImg from '../../assets/hero.png';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-neutral-50 px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Content Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-start text-left space-y-6 sm:space-y-8"
        >
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center space-x-2 border border-neutral-200/80 px-3 py-1 rounded-full bg-white shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-neutral-800 uppercase">
              NEW COLLECTION 2025
            </span>
          </div>

          {/* Heading with Fluid Typography */}
          <h1 
            className="font-black text-black leading-[1.05] tracking-tight uppercase"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.8rem)' }}
          >
            BOLD DESIGN.<br />
            <span className="text-neutral-400">BUILT TO LAST.</span>
          </h1>

          {/* Description */}
          <p className="text-neutral-500 text-sm sm:text-lg max-w-md font-normal leading-relaxed">
            Elevate your everyday with pieces that blend style, quality, and function. Designed with a premium minimalist aesthetic.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <Link
              to="/shop"
              className="group h-12 sm:h-14 px-8 bg-black text-white rounded-full flex items-center justify-center space-x-3 font-semibold uppercase tracking-wider text-xs sm:text-sm hover:bg-neutral-900 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-black/10"
            >
              <span>Shop Now</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Customer Reviews Section */}
          <div className="flex items-center space-x-4 pt-4 border-t border-neutral-100 w-full lg:w-auto">
            {/* Customer Avatars */}
            <div className="flex -space-x-3 overflow-hidden">
              {[
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop'
              ].map((url, i) => (
                <img
                  key={i}
                  className="inline-block h-8 w-8 sm:h-10 sm:w-10 rounded-full ring-2 ring-white object-cover"
                  src={url}
                  alt={`Customer ${i + 1}`}
                />
              ))}
            </div>
            {/* Text description */}
            <div className="text-left">
              <div className="text-xs sm:text-sm font-bold text-black uppercase tracking-wider">50K+ Happy Customers</div>
              <div className="text-[10px] sm:text-xs text-neutral-400 font-medium">Top-rated premium sneakers & apparel</div>
            </div>
          </div>
        </motion.div>

        {/* Right Sneaker / Interactive Visual Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative flex items-center justify-center select-none w-full max-w-[280px] xs:max-w-[340px] sm:max-w-[500px] mx-auto"
        >
          {/* Main Visual: Black sneaker image with platform and background */}
          <div className="relative w-full aspect-square flex items-center justify-center">
            <motion.img
              src={heroImg}
              alt="Premium Kapde Wala Black Sneaker"
              className="w-[90%] h-[90%] object-contain drop-shadow-2xl z-10"
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* 360° Interactive Indicator Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/shop?category=SNEAKERS')}
              className="absolute right-4 bottom-12 sm:right-12 sm:bottom-16 z-20 w-12 h-12 sm:w-14 sm:h-14 bg-white text-black rounded-full flex flex-col items-center justify-center shadow-2xl border border-neutral-100 hover:bg-neutral-50 transition-all cursor-pointer group"
              aria-label="View 360 degrees"
            >
              <RotateCcw size={16} className="text-black group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-[8px] font-black uppercase tracking-wider mt-0.5">360°</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
