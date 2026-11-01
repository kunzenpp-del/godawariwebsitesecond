import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield, RotateCcw, ChevronRight, Check } from 'lucide-react';
import { products, reviews } from '../data/mockData';
import { formatPrice, formatDiscount, getStockStatus } from '../utils/helpers';
import { useCartStore, useWishlistStore } from '../store';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const { addItem } = useCartStore();
  const { isInWishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl text-white font-bold mb-4">Product Not Found</h2>
        <Link to="/products" className="text-accent hover:underline">← Back to Products</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const stockStatus = getStockStatus(product.stock);
  const discount = product.originalPrice ? formatDiscount(product.originalPrice, product.price) : 0;
  const productReviews = reviews.filter(r => r.productId === product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, Object.keys(selectedVariant).length > 0 ? selectedVariant : undefined);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link to="/" className="hover:text-accent">Home</Link>
        <ChevronRight size={12} />
        <Link to="/products" className="hover:text-accent">Products</Link>
        <ChevronRight size={12} />
        <Link to={`/products?category=${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-accent">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="text-text-secondary truncate">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary border border-white/5 mb-3">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-error text-white text-sm font-bold px-3 py-1 rounded-full">-{discount}% OFF</span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-accent' : 'border-white/10'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            {product.isNew && <span className="bg-cyan text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>}
            {product.isBestSeller && <span className="bg-magenta text-white text-[10px] font-bold px-2 py-0.5 rounded-full">BEST SELLER</span>}
          </div>
          <p className="text-accent text-sm uppercase tracking-wider mb-1">{product.category}</p>
          <h1 className="text-2xl md:text-3xl font-[Poppins] font-bold text-white mb-3">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-text-muted'} />
              ))}
            </div>
            <span className="text-text-secondary text-sm">{product.rating} ({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent font-bold text-3xl">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-text-muted text-xl line-through">{formatPrice(product.originalPrice)}</span>
                <span className="bg-success/20 text-success text-xs font-bold px-2 py-0.5 rounded-full">Save {formatPrice(product.originalPrice - product.price)}</span>
              </>
            )}
          </div>

          <p className="text-text-secondary leading-relaxed mb-6">{product.description}</p>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-success' : 'bg-error'}`} />
            <span className={`text-sm ${stockStatus.color}`}>{stockStatus.label}</span>
          </div>

          {/* Variants */}
          {product.variants?.map((variant) => (
            <div key={variant.id} className="mb-4">
              <label className="text-white text-sm font-medium mb-2 block">{variant.name}</label>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedVariant({ ...selectedVariant, [variant.id]: option })}
                    className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                      selectedVariant[variant.id] === option
                        ? 'bg-accent text-primary border-accent font-medium'
                        : 'bg-white/5 text-text-secondary border-white/10 hover:border-accent/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Bulk Pricing */}
          {product.bulkPricing && (
            <div className="bg-primary/50 border border-white/5 rounded-xl p-4 mb-5">
              <h4 className="text-white text-sm font-medium mb-2">💰 Bulk Pricing</h4>
              <div className="grid grid-cols-3 gap-2">
                {product.bulkPricing.map((bp, i) => (
                  <div key={i} className="bg-secondary rounded-lg p-2 text-center">
                    <p className="text-text-muted text-[10px]">{bp.minQty}-{bp.maxQty} pcs</p>
                    <p className="text-accent text-sm font-bold">{formatPrice(bp.pricePerUnit)}/pc</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center border border-white/10 rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-text-secondary hover:text-white">
                <Minus size={16} />
              </button>
              <span className="px-4 text-white font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-text-secondary hover:text-white">
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-accent hover:bg-accent-hover text-primary font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_2px_10px_rgba(245,166,35,0.3)] disabled:opacity-50"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button
              onClick={() => {
                if (inWishlist) { removeWishlist(product.id); toast.success('Removed from wishlist'); }
                else { addWishlist(product); toast.success('Added to wishlist'); }
              }}
              className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all ${
                inWishlist ? 'bg-error border-error text-white' : 'border-white/10 text-text-secondary hover:border-accent hover:text-accent'
              }`}
            >
              <Heart size={18} fill={inWishlist ? 'white' : 'none'} />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: <Truck size={16} />, text: 'Free Delivery' },
              { icon: <Shield size={16} />, text: 'Quality Guarantee' },
              { icon: <RotateCcw size={16} />, text: 'Easy Returns' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 bg-primary/50 rounded-lg p-2.5">
                <span className="text-accent">{f.icon}</span>
                <span className="text-text-secondary text-xs">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex border-b border-white/10 mb-6">
          {(['description', 'specs', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium capitalize transition-colors relative ${
                activeTab === tab ? 'text-accent' : 'text-text-muted hover:text-white'
              }`}
            >
              {tab === 'reviews' ? `Reviews (${product.reviewCount})` : tab === 'specs' ? 'Specifications' : 'Description'}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="text-text-secondary leading-relaxed max-w-3xl">
            <p>{product.description}</p>
            <p className="mt-4">All our products are printed using state-of-the-art equipment with premium quality materials. We ensure color accuracy, sharp details, and consistent quality across all prints.</p>
          </div>
        )}

        {activeTab === 'specs' && product.specifications && (
          <div className="max-w-xl">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key} className="border-b border-white/5">
                    <td className="py-3 text-text-muted text-sm">{key}</td>
                    <td className="py-3 text-white text-sm font-medium flex items-center gap-2"><Check size={14} className="text-success" /> {value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-3xl">
            {productReviews.length > 0 ? (
              <div className="space-y-4">
                {productReviews.map((review) => (
                  <div key={review.id} className="bg-primary/50 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent text-xs font-bold">
                          {review.userName.charAt(0)}
                        </div>
                        <span className="text-white text-sm font-medium">{review.userName}</span>
                      </div>
                      <span className="text-text-muted text-xs">{review.createdAt}</span>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? 'text-accent fill-accent' : 'text-text-muted'} />
                      ))}
                    </div>
                    <p className="text-text-secondary text-sm">{review.comment}</p>
                    <p className="text-text-muted text-xs mt-2">{review.helpful} people found this helpful</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-muted">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-[Poppins] font-bold text-white mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
