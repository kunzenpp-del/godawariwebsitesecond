import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, ChevronDown, Package } from 'lucide-react';
import { useCartStore, useWishlistStore, useAuthStore } from '../store';
import { categories } from '../data/mockData';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const { getItemCount, toggleCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { isAuthenticated, user } = useAuthStore();
  const cartCount = getItemCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur-md border-b border-white/5">
      {/* Top bar */}
      <div className="bg-accent/10 border-b border-accent/20">
        <div className="max-w-[1440px] mx-auto px-4 py-1.5 flex items-center justify-between text-xs text-text-secondary">
          <span>📞 +977-01-5555555 | ✉️ info@godawariprinting.com</span>
          <span className="hidden md:block">🚚 Free delivery on orders above Rs. 2,000</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-[1440px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-lg font-[Poppins]">GP</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-[Poppins] font-bold text-sm leading-tight">Godawari</h1>
              <p className="text-text-muted text-xs">Printing Solution</p>
            </div>
          </Link>

          {/* Search bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent">
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Nav actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search toggle - Mobile */}
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="md:hidden p-2 text-text-secondary hover:text-accent">
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 text-text-secondary hover:text-accent transition-colors">
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent rounded-full text-[10px] text-primary font-bold flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button onClick={toggleCart} className="relative p-2 text-text-secondary hover:text-accent transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent rounded-full text-[10px] text-primary font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User */}
            <Link to={isAuthenticated ? '/account' : '/login'} className="hidden sm:flex items-center gap-1 p-2 text-text-secondary hover:text-accent transition-colors">
              <User size={20} />
              {isAuthenticated && <span className="text-xs">{user?.name?.split(' ')[0]}</span>}
            </Link>

            {/* Mobile menu toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-text-secondary hover:text-accent">
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {isSearchOpen && (
          <form onSubmit={handleSearch} className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent"
                autoFocus
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                <Search size={18} />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Bottom nav - Categories */}
      <div className="hidden lg:block border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center gap-6 py-2">
            <div className="relative" onMouseEnter={() => setShowCategories(true)} onMouseLeave={() => setShowCategories(false)}>
              <button className="flex items-center gap-1.5 text-sm text-white font-medium hover:text-accent transition-colors">
                <Package size={16} />
                All Categories
                <ChevronDown size={14} />
              </button>
              {showCategories && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-secondary rounded-lg shadow-xl border border-white/10 py-2 z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span className="ml-auto text-xs text-text-muted">({cat.productCount})</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/products" className="text-sm text-text-secondary hover:text-accent transition-colors">All Products</Link>
            <Link to="/products?new=true" className="text-sm text-text-secondary hover:text-accent transition-colors">New Arrivals</Link>
            <Link to="/products?bestseller=true" className="text-sm text-text-secondary hover:text-accent transition-colors">Best Sellers</Link>
            <Link to="/products?sale=true" className="text-sm text-text-secondary hover:text-accent transition-colors flex items-center gap-1">
              🔥 Flash Sale
            </Link>
            <Link to="/bulk-order" className="text-sm text-text-secondary hover:text-accent transition-colors">Bulk Orders</Link>
            <Link to="/contact" className="text-sm text-text-secondary hover:text-accent transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-secondary border-t border-white/5 animate-fade-in">
          <div className="px-4 py-4 space-y-2">
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block py-2 text-text-secondary hover:text-accent">All Products</Link>
            <Link to="/products?new=true" onClick={() => setIsMenuOpen(false)} className="block py-2 text-text-secondary hover:text-accent">New Arrivals</Link>
            <Link to="/products?bestseller=true" onClick={() => setIsMenuOpen(false)} className="block py-2 text-text-secondary hover:text-accent">Best Sellers</Link>
            <Link to="/products?sale=true" onClick={() => setIsMenuOpen(false)} className="block py-2 text-text-secondary hover:text-accent">🔥 Flash Sale</Link>
            <Link to="/bulk-order" onClick={() => setIsMenuOpen(false)} className="block py-2 text-text-secondary hover:text-accent">Bulk Orders</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block py-2 text-text-secondary hover:text-accent">Contact</Link>
            <hr className="border-white/10" />
            <p className="text-xs text-text-muted uppercase tracking-wider pt-2">Categories</p>
            {categories.slice(0, 6).map((cat) => (
              <Link key={cat.id} to={`/products?category=${cat.slug}`} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm text-text-secondary hover:text-accent">
                <span>{cat.icon}</span> {cat.name}
              </Link>
            ))}
            <hr className="border-white/10" />
            {isAuthenticated ? (
              <Link to="/account" onClick={() => setIsMenuOpen(false)} className="block py-2 text-text-secondary hover:text-accent">My Account</Link>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block py-2 text-text-secondary hover:text-accent">Login / Register</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
