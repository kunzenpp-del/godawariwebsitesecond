import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCartStore } from '../store';
import { formatPrice } from '../utils/helpers';
import { useState } from 'react';
import { coupons } from '../data/mockData';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getDiscount, getTotal, coupon, setCoupon, getItemCount } = useCartStore();
  const [couponCode, setCouponCode] = useState('');

  const applyCoupon = () => {
    const found = coupons.find(c => c.code === couponCode.toUpperCase());
    if (found) {
      if (getSubtotal() < found.minOrderAmount) {
        toast.error(`Minimum order amount is Rs. ${found.minOrderAmount}`);
      } else {
        setCoupon(found);
        toast.success(`Coupon applied! You saved Rs. ${getDiscount()}`);
      }
    } else {
      toast.error('Invalid coupon code');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="text-text-muted mx-auto mb-4" />
        <h2 className="text-2xl font-[Poppins] font-bold text-white mb-2">Your Cart is Empty</h2>
        <p className="text-text-secondary mb-6">Add some products to get started</p>
        <Link to="/products" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary font-semibold px-6 py-3 rounded-lg transition-colors">
          Browse Products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-[Poppins] font-bold text-white mb-6">Shopping Cart ({getItemCount()} items)</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.product.id}-${JSON.stringify(item.selectedVariant)}`} className="bg-secondary rounded-xl border border-white/5 p-4 flex gap-4">
              <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg" />
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.slug}`} className="text-white font-medium text-sm hover:text-accent transition-colors line-clamp-2">
                  {item.product.name}
                </Link>
                <p className="text-text-muted text-xs mt-0.5">{item.product.category}</p>
                {item.selectedVariant && (
                  <p className="text-text-muted text-xs mt-1">
                    {Object.entries(item.selectedVariant).map(([k, v]) => `${k}: ${v}`).join(', ')}
                  </p>
                )}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-white/10 rounded-lg">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 text-text-secondary hover:text-white">
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-white text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 text-text-secondary hover:text-white">
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-accent font-bold">{formatPrice(item.product.price * item.quantity)}</span>
                    <button onClick={() => removeItem(item.product.id)} className="text-text-muted hover:text-error transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-secondary rounded-xl border border-white/5 p-5 sticky top-24">
            <h3 className="text-white font-[Poppins] font-semibold text-lg mb-4">Order Summary</h3>
            
            {/* Coupon */}
            <div className="mb-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-primary border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent"
                  />
                </div>
                <button onClick={applyCoupon} className="bg-accent/10 border border-accent/30 text-accent px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent hover:text-primary transition-colors">
                  Apply
                </button>
              </div>
              {coupon && (
                <div className="flex items-center justify-between mt-2 bg-success/10 border border-success/20 rounded-lg px-3 py-1.5">
                  <span className="text-success text-xs">✓ {coupon.code} applied</span>
                  <button onClick={() => setCoupon(null)} className="text-text-muted text-xs hover:text-error">Remove</button>
                </div>
              )}
              <p className="text-text-muted text-[10px] mt-1.5">Try: WELCOME10, PRINT200, BULK15</p>
            </div>

            <div className="space-y-2.5 border-t border-white/5 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-white">{formatPrice(getSubtotal())}</span>
              </div>
              {getDiscount() > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-success">Discount</span>
                  <span className="text-success">-{formatPrice(getDiscount())}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Shipping</span>
                <span className="text-white">{getSubtotal() >= 2000 ? 'Free' : formatPrice(100)}</span>
              </div>
              <div className="border-t border-white/5 pt-2.5 flex justify-between">
                <span className="text-white font-semibold">Total</span>
                <span className="text-accent font-bold text-xl">{formatPrice(getTotal() + (getSubtotal() >= 2000 ? 0 : 100))}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-accent hover:bg-accent-hover text-primary font-semibold text-center py-3 rounded-lg mt-4 transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link to="/products" className="block text-center text-text-secondary text-sm mt-3 hover:text-accent">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
