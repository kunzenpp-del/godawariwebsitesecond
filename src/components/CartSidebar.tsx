import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store';
import { formatPrice } from '../utils/helpers';

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getSubtotal, getItemCount } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-50" onClick={toggleCart} />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-secondary z-50 animate-slide-in flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-accent" />
            <h2 className="text-white font-[Poppins] font-semibold">Cart ({getItemCount()})</h2>
          </div>
          <button onClick={toggleCart} className="p-2 text-text-secondary hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-text-muted mb-4" />
              <p className="text-text-secondary mb-2">Your cart is empty</p>
              <p className="text-text-muted text-sm mb-4">Add some products to get started</p>
              <Link to="/products" onClick={toggleCart} className="bg-accent hover:bg-accent-hover text-primary font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${JSON.stringify(item.selectedVariant)}`} className="flex gap-3 bg-primary/50 rounded-xl p-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-sm font-medium truncate">{item.product.name}</h3>
                    <p className="text-accent text-sm font-semibold mt-0.5">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/20 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/20 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeItem(item.product.id)} className="text-text-muted hover:text-error transition-colors">
                      <Trash2 size={14} />
                    </button>
                    <span className="text-white text-xs">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary text-sm">Subtotal</span>
              <span className="text-white font-semibold">{formatPrice(getSubtotal())}</span>
            </div>
            <p className="text-text-muted text-xs">Shipping calculated at checkout</p>
            <Link
              to="/checkout"
              onClick={toggleCart}
              className="block w-full bg-accent hover:bg-accent-hover text-primary font-semibold text-center py-3 rounded-lg transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/cart"
              onClick={toggleCart}
              className="block w-full border border-accent text-accent hover:bg-accent hover:text-primary font-medium text-center py-3 rounded-lg transition-colors"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
