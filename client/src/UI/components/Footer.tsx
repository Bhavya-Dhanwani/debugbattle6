import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

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
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-500 hover:text-black border border-neutral-100 hover:bg-neutral-100 transition-all" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
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
