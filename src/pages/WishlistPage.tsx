import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlistStore, useCartStore } from '../store';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-20 text-center">
        <Heart size={64} className="text-text-muted mx-auto mb-4" />
        <h2 className="text-2xl font-[Poppins] font-bold text-white mb-2">Your Wishlist is Empty</h2>
        <p className="text-text-secondary mb-6">Save your favorite products here</p>
        <Link to="/products" className="bg-accent hover:bg-accent-hover text-primary font-semibold px-6 py-3 rounded-lg inline-block transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-[Poppins] font-bold text-white">My Wishlist</h1>
          <p className="text-text-secondary text-sm mt-1">{items.length} items saved</p>
        </div>
        <button onClick={() => { clearWishlist(); toast.success('Wishlist cleared'); }} className="text-error text-sm hover:underline">
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {items.map((product) => (
          <div key={product.id} className="bg-secondary rounded-xl border border-white/5 overflow-hidden group hover:border-accent/30 transition-all">
            <Link to={`/product/${product.slug}`}>
              <div className="relative aspect-square overflow-hidden">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </Link>
            <div className="p-4">
              <Link to={`/product/${product.slug}`}>
                <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-accent transition-colors">{product.name}</h3>
              </Link>
              <p className="text-accent font-bold text-lg mt-2">{formatPrice(product.price)}</p>
              {product.originalPrice && (
                <p className="text-text-muted text-sm line-through">{formatPrice(product.originalPrice)}</p>
              )}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => { addItem(product); toast.success('Added to cart!'); }}
                  className="flex-1 bg-accent hover:bg-accent-hover text-primary text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <ShoppingCart size={12} /> Add to Cart
                </button>
                <button
                  onClick={() => { removeItem(product.id); toast.success('Removed from wishlist'); }}
                  className="w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center text-text-muted hover:text-error hover:border-error transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
