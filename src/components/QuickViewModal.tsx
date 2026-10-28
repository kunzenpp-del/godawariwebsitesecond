import { X, ShoppingCart, Heart, Star, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../types';
import { formatPrice, formatDiscount, getStockStatus } from '../utils/helpers';
import { useCartStore, useWishlistStore } from '../store';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({});
  const { addItem } = useCartStore();
  const { isInWishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  const stockStatus = getStockStatus(product.stock);
  const discount = product.originalPrice ? formatDiscount(product.originalPrice, product.price) : 0;

  const handleAddToCart = () => {
    addItem(product, quantity, Object.keys(selectedVariant).length > 0 ? selectedVariant : undefined);
    toast.success(`${product.name} added to cart!`);
    onClose();
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-secondary rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <X size={16} />
        </button>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto md:h-full">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none" />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-error text-white text-xs font-bold px-2.5 py-1 rounded-full">-{discount}%</span>
            )}
          </div>
          {/* Details */}
          <div className="p-6">
            <p className="text-accent text-xs uppercase tracking-wider mb-1">{product.category}</p>
            <h2 className="text-white font-[Poppins] font-semibold text-xl mb-2">{product.name}</h2>
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-text-muted'} />
                ))}
              </div>
              <span className="text-text-muted text-sm">({product.reviewCount} reviews)</span>
            </div>
            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent font-bold text-2xl">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-text-muted text-lg line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">{product.shortDescription}</p>
            {/* Stock */}
            <p className={`text-sm mb-4 ${stockStatus.color}`}>{stockStatus.label} ({product.stock} available)</p>
            {/* Variants */}
            {product.variants?.map((variant) => (
              <div key={variant.id} className="mb-3">
                <label className="text-white text-xs font-medium mb-1.5 block">{variant.name}</label>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedVariant({ ...selectedVariant, [variant.id]: option })}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                        selectedVariant[variant.id] === option
                          ? 'bg-accent text-primary border-accent'
                          : 'bg-white/5 text-text-secondary border-white/10 hover:border-accent/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {/* Quantity */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-white text-xs font-medium">Quantity:</span>
              <div className="flex items-center border border-white/10 rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-text-secondary hover:text-white">
                  <Minus size={14} />
                </button>
                <span className="px-3 text-white text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-text-secondary hover:text-white">
                  <Plus size={14} />
                </button>
              </div>
            </div>
            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-accent hover:bg-accent-hover text-primary font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-colors ${
                  inWishlist ? 'bg-error border-error text-white' : 'border-white/10 text-text-secondary hover:border-accent hover:text-accent'
                }`}
              >
                <Heart size={16} fill={inWishlist ? 'white' : 'none'} />
              </button>
            </div>
            <Link to={`/product/${product.slug}`} onClick={onClose} className="block text-center text-accent text-sm mt-3 hover:underline">
              View Full Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
