import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, MessageSquare, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-100/80 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Branding & Description */}
        <div className="space-y-4 col-span-1 md:col-span-2">
          <Link to="/" className="text-xl font-black tracking-[0.25em] text-black">
            KAPDE WALA
          </Link>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-sm font-medium leading-relaxed">
            A premium Indian fashion e-commerce brand blending style, quality, and function. Elevating everyday wear since 2025.
          </p>
          {/* Social Links */}
          <div className="flex items-center space-x-3 pt-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-500 hover:text-black border border-neutral-100 hover:bg-neutral-100 transition-all" aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-500 hover:text-black border border-neutral-100 hover:bg-neutral-100 transition-all" aria-label="Twitter">
              <Twitter size={16} />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-500 hover:text-black border border-neutral-100 hover:bg-neutral-100 transition-all" aria-label="Discord">
              <MessageSquare size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-4">Shop</h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><Link to="/shop" className="text-neutral-500 hover:text-black transition-colors font-medium">All Products</Link></li>
            <li><Link to="/shop?category=SNEAKERS" className="text-neutral-500 hover:text-black transition-colors font-medium">Sneakers</Link></li>
            <li><Link to="/shop?category=CLOTHING" className="text-neutral-500 hover:text-black transition-colors font-medium">Clothing</Link></li>
            <li><Link to="/shop?category=SALE" className="text-red-500 hover:text-red-700 transition-colors font-medium">Sale</Link></li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-900 mb-4">Info</h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><span className="text-neutral-400 font-medium cursor-not-allowed">Terms & Conditions</span></li>
            <li><span className="text-neutral-400 font-medium cursor-not-allowed">Privacy Policy</span></li>
            <li><span className="text-neutral-400 font-medium cursor-not-allowed">Easy Returns FAQ</span></li>
            <li><span className="text-neutral-400 font-medium cursor-not-allowed">Contact Support</span></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-neutral-50 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-xs text-neutral-400 font-medium">
        <div>© {new Date().getFullYear()} KAPDE WALA. All rights reserved.</div>
        <div className="mt-2 sm:mt-0 flex items-center space-x-2">
          <span>Crafted in India</span>
          <span className="text-red-500">❤️</span>
        </div>
      </div>
    </footer>
  );
};
