import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchVal.trim())}`);
      setIsSearchOpen(false);
      setSearchVal('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-100/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo - KAPDE WALA */}
        <Link 
          to="/" 
          className="text-lg sm:text-2xl font-black tracking-[0.25em] text-black hover:opacity-80 transition-opacity whitespace-nowrap"
          aria-label="KAPDE WALA Home"
        >
          KAPDE WALA
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Desktop navigation">
          <Link to="/shop" className="text-sm font-medium tracking-wider uppercase text-neutral-600 hover:text-black transition-colors">Shop</Link>
          <Link to="/shop?category=CLOTHING" className="text-sm font-medium tracking-wider uppercase text-neutral-600 hover:text-black transition-colors">Collections</Link>
          <Link to="/shop?category=SNEAKERS" className="text-sm font-medium tracking-wider uppercase text-neutral-600 hover:text-black transition-colors">New Arrivals</Link>
          <span className="text-sm font-medium tracking-wider uppercase text-neutral-400 cursor-not-allowed">Brands</span>
          <Link to="/shop?category=SALE" className="text-sm font-medium tracking-wider uppercase text-red-500 hover:text-red-700 transition-colors">Sale</Link>
        </nav>

        {/* Right Icon Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Search Toggle */}
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} className="flex items-center border border-neutral-200 rounded-full px-3 py-1 bg-neutral-50">
              <input
                type="text"
                placeholder="Search..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="bg-transparent text-sm focus:outline-none w-28 sm:w-40 text-neutral-800"
                autoFocus
              />
              <button type="submit" className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black">
                <Search size={16} />
              </button>
              <button 
                type="button" 
                onClick={() => setIsSearchOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-black"
                aria-label="Close search"
              >
                <X size={16} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-11 h-11 flex items-center justify-center text-neutral-800 hover:text-black transition-colors rounded-full hover:bg-neutral-50"
              aria-label="Open search bar"
            >
              <Search size={20} />
            </button>
          )}

          {/* User Account Link */}
          <Link
            to={isAuthenticated ? "/profile" : "/profile"}
            className="w-11 h-11 flex items-center justify-center text-neutral-800 hover:text-black transition-colors rounded-full hover:bg-neutral-50"
            aria-label="User Account"
          >
            <User size={20} />
          </Link>

          {/* Cart Trigger */}
          <Link
            to="/cart"
            className="w-11 h-11 flex items-center justify-center text-neutral-800 hover:text-black transition-colors rounded-full hover:bg-neutral-50 relative"
            aria-label={`Shopping Cart, ${itemCount} items`}
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-11 h-11 flex md:hidden items-center justify-center text-neutral-800 hover:text-black transition-colors rounded-full hover:bg-neutral-50"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 sm:top-20 z-40 bg-white border-t border-neutral-100 flex flex-col justify-between p-6 animate-fade-in">
          <nav className="flex flex-col space-y-6 text-lg font-medium tracking-wide" aria-label="Mobile navigation">
            <Link 
              to="/shop" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-50 text-neutral-800 hover:text-black"
            >
              Shop All
            </Link>
            <Link 
              to="/shop?category=CLOTHING" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-50 text-neutral-800 hover:text-black"
            >
              Collections
            </Link>
            <Link 
              to="/shop?category=SNEAKERS" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-50 text-neutral-800 hover:text-black"
            >
              New Arrivals
            </Link>
            <Link 
              to="/shop?category=SALE" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-neutral-50 text-red-500 hover:text-red-700"
            >
              Sale
            </Link>
          </nav>
          
          <div className="border-t border-neutral-100 pt-6">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-4">
                <div className="text-sm text-neutral-500">
                  Logged in as <span className="font-semibold text-neutral-800">{user?.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full h-11 flex items-center justify-center space-x-2 border border-black text-black font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-50"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full h-11 bg-black text-white flex items-center justify-center font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-900"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
