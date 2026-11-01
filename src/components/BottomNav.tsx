import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, Heart, User } from 'lucide-react';
import { useCartStore } from '../store';

export default function BottomNav() {
  const location = useLocation();
  const { getItemCount } = useCartStore();
  const cartCount = getItemCount();

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/products', label: 'Search', icon: <Search size={20} /> },
    { path: '/cart', label: 'Cart', icon: <ShoppingCart size={20} />, badge: cartCount },
    { path: '/wishlist', label: 'Wishlist', icon: <Heart size={20} /> },
    { path: '/account', label: 'Account', icon: <User size={20} /> },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-secondary/95 backdrop-blur-md border-t border-white/10 z-40 safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
              isActive(link.path) ? 'text-accent' : 'text-text-muted'
            }`}
          >
            <div className="relative">
              {link.icon}
              {link.badge ? (
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-accent rounded-full text-[9px] text-primary font-bold flex items-center justify-center">
                  {link.badge}
                </span>
              ) : null}
            </div>
            <span className="text-[10px]">{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
