import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, formatDiscount, getStockStatus } from '../utils/helpers';
import { useCartStore, useWishlistStore } from '../store';
import toast from 'react-hot-toast';

interface Props {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: Props) {
  const { addItem } = useCartStore();
  const { isInWishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  const stockStatus = getStockStatus(product.stock);
  const discount = product.originalPrice ? formatDiscount(product.originalPrice, product.price) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock > 0) {
      addItem(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="group bg-secondary rounded-xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(245,166,35,0.1)]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-cyan text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
          )}
          {product.isBestSeller && (
            <span className="bg-magenta text-white text-[10px] font-bold px-2 py-0.5 rounded-full">BEST SELLER</span>
          )}
          {discount > 0 && (
            <span className="bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-{discount}%</span>
          )}
        </div>
        {/* Actions overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView?.(product); }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent transition-colors"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent transition-colors"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            inWishlist ? 'bg-error text-white' : 'bg-white/80 text-primary hover:bg-accent'
          }`}
        >
          <Heart size={14} fill={inWishlist ? 'white' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <Link to={`/product/${product.slug}`} className="block p-4">
        <p className="text-text-muted text-xs uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="text-white font-medium text-sm leading-snug line-clamp-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-text-muted'} />
            ))}
          </div>
          <span className="text-text-muted text-xs">({product.reviewCount})</span>
        </div>
        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-accent font-bold text-lg">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-text-muted text-sm line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        {/* Stock */}
        <p className={`text-xs mt-1.5 ${stockStatus.color}`}>{stockStatus.label}</p>
      </Link>
    </div>
  );
}
