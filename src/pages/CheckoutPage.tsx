import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, CreditCard, Truck, MapPin, ShieldCheck } from 'lucide-react';
import { useCartStore, useOrderStore, useAuthStore } from '../store';
import { formatPrice, generateOrderId } from '../utils/helpers';
import { provinces, districts } from '../data/mockData';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getSubtotal, getDiscount, getTotal, clearCart, coupon } = useCartStore();
  const { addOrder } = useOrderStore();
  const { isAuthenticated } = useAuthStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '', phone: '', province: '', district: '', city: '', ward: '', street: '', email: '',
    paymentMethod: 'cod', notes: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-accent hover:underline">← Continue Shopping</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.fullName || !formData.phone || !formData.province || !formData.district || !formData.city) {
        toast.error('Please fill all required fields');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Place order
      const newOrderId = generateOrderId();
      addOrder({
        id: newOrderId,
        items,
        total: getTotal(),
        status: 'pending',
        paymentMethod: formData.paymentMethod,
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          province: formData.province,
          district: formData.district,
          city: formData.city,
          ward: formData.ward,
          street: formData.street,
        },
        createdAt: new Date().toISOString(),
      });
      setOrderId(newOrderId);
      setOrderPlaced(true);
      clearCart();
      toast.success('Order placed successfully!');
    }
  };

  const shippingCost = getSubtotal() >= 2000 ? 0 : 100;
  const finalTotal = getTotal() + shippingCost;

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-[Poppins] font-bold text-white mb-2">Order Placed Successfully!</h2>
        <p className="text-text-secondary mb-2">Thank you for your order</p>
        <p className="text-accent font-bold text-lg mb-6">Order #{orderId}</p>
        <div className="bg-secondary rounded-xl border border-white/5 p-4 mb-6 text-left">
          <p className="text-text-secondary text-sm mb-1">Payment Method: <span className="text-white capitalize">{formData.paymentMethod}</span></p>
          <p className="text-text-secondary text-sm mb-1">Total: <span className="text-accent font-bold">{formatPrice(finalTotal)}</span></p>
          {coupon && <p className="text-text-secondary text-sm">Coupon: <span className="text-success">{coupon.code}</span></p>}
        </div>
        <p className="text-text-muted text-sm mb-6">You will receive an email confirmation shortly.</p>
        <div className="flex flex-col gap-3">
          <Link to="/account/orders" className="bg-accent hover:bg-accent-hover text-primary font-semibold py-3 rounded-lg transition-colors">
            View Orders
          </Link>
          <Link to="/products" className="border border-accent text-accent hover:bg-accent hover:text-primary font-medium py-3 rounded-lg transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-[Poppins] font-bold text-white mb-6">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center justify-center mb-8">
        {['Shipping', 'Payment', 'Review'].map((label, i) => (
          <div key={label} className="flex items-center">
            <div className={`flex items-center gap-2 ${step > i + 1 ? 'text-success' : step === i + 1 ? 'text-accent' : 'text-text-muted'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                step > i + 1 ? 'bg-success border-success text-white' : step === i + 1 ? 'bg-accent border-accent text-primary' : 'border-white/20 text-text-muted'
              }`}>
                {step > i + 1 ? <Check size={14} /> : i + 1}
              </div>
              <span className="text-sm font-medium hidden sm:block">{label}</span>
            </div>
            {i < 2 && <div className={`w-12 sm:w-20 h-0.5 mx-2 ${step > i + 1 ? 'bg-success' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="bg-secondary rounded-xl border border-white/5 p-6">
              <h3 className="text-white font-[Poppins] font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-accent" /> Shipping Address
              </h3>
              {!isAuthenticated && (
                <div className="bg-primary/50 border border-white/5 rounded-lg p-3 mb-4">
                  <p className="text-text-secondary text-sm">
                    Guest checkout. <Link to="/login" className="text-accent hover:underline">Login</Link> for faster checkout.
                  </p>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-text-secondary text-xs mb-1 block">Full Name *</label>
                  <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent" placeholder="Ram Bahadur" />
                </div>
                <div>
                  <label className="text-text-secondary text-xs mb-1 block">Phone *</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent" placeholder="+977-98XXXXXXXX" />
                </div>
                <div>
                  <label className="text-text-secondary text-xs mb-1 block">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="text-text-secondary text-xs mb-1 block">Province *</label>
                  <select value={formData.province} onChange={(e) => setFormData({...formData, province: e.target.value, district: ''})} className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent">
                    <option value="">Select Province</option>
                    {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-text-secondary text-xs mb-1 block">District *</label>
                  <select value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent" disabled={!formData.province}>
                    <option value="">Select District</option>
                    {formData.province && districts[formData.province]?.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-text-secondary text-xs mb-1 block">City/Municipality *</label>
                  <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent" placeholder="Kathmandu" />
                </div>
                <div>
                  <label className="text-text-secondary text-xs mb-1 block">Ward No.</label>
                  <input type="text" value={formData.ward} onChange={(e) => setFormData({...formData, ward: e.target.value})} className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent" placeholder="10" />
                </div>
                <div>
                  <label className="text-text-secondary text-xs mb-1 block">Street Address</label>
                  <input type="text" value={formData.street} onChange={(e) => setFormData({...formData, street: e.target.value})} className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent" placeholder="Tole, Street" />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-text-secondary text-xs mb-1 block">Order Notes (optional)</label>
                <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent h-20 resize-none" placeholder="Any special instructions..." />
              </div>
              <button type="submit" className="mt-6 bg-accent hover:bg-accent-hover text-primary font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
                <Truck size={16} /> Continue to Payment
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="bg-secondary rounded-xl border border-white/5 p-6">
              <h3 className="text-white font-[Poppins] font-semibold text-lg mb-4 flex items-center gap-2">
                <CreditCard size={18} className="text-accent" /> Payment Method
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when you receive your order', icon: '💵' },
                  { id: 'esewa', name: 'eSewa', desc: 'Pay with your eSewa wallet', icon: '🟢' },
                  { id: 'khalti', name: 'Khalti', desc: 'Pay with Khalti digital wallet', icon: '🟣' },
                  { id: 'bank', name: 'Bank Transfer', desc: 'Direct bank transfer', icon: '🏦' },
                ].map((method) => (
                  <label key={method.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === method.id ? 'border-accent bg-accent/5' : 'border-white/10 hover:border-white/20'
                  }`}>
                    <input type="radio" name="payment" value={method.id} checked={formData.paymentMethod === method.id} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} className="accent-accent" />
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{method.name}</p>
                      <p className="text-text-muted text-xs">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              {formData.paymentMethod === 'bank' && (
                <div className="mt-4 bg-primary/50 border border-white/5 rounded-lg p-4">
                  <p className="text-white text-sm font-medium mb-2">Bank Details:</p>
                  <p className="text-text-secondary text-xs">Bank: Nepal Bank Limited</p>
                  <p className="text-text-secondary text-xs">Account: Godawari Printing Solution</p>
                  <p className="text-text-secondary text-xs">Account No: 01234567890</p>
                  <p className="text-text-muted text-xs mt-2">Please include order number in transfer reference</p>
                </div>
              )}
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setStep(1)} className="border border-white/10 text-text-secondary hover:text-white py-3 px-5 rounded-lg transition-colors">
                  ← Back
                </button>
                <button type="submit" className="flex-1 bg-accent hover:bg-accent-hover text-primary font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <ShieldCheck size={16} /> Review Order
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="bg-secondary rounded-xl border border-white/5 p-6">
              <h3 className="text-white font-[Poppins] font-semibold text-lg mb-4">Order Review</h3>
              {/* Items */}
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 bg-primary/50 rounded-lg p-3">
                    <img src={item.product.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-white text-sm">{item.product.name}</p>
                      <p className="text-text-muted text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-accent text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              {/* Shipping */}
              <div className="bg-primary/50 rounded-lg p-3 mb-4">
                <p className="text-white text-sm font-medium mb-1">Ship to:</p>
                <p className="text-text-secondary text-xs">{formData.fullName}, {formData.phone}</p>
                <p className="text-text-secondary text-xs">{formData.street}, Ward {formData.ward}, {formData.city}, {formData.district}</p>
                <p className="text-text-secondary text-xs">{formData.province}</p>
              </div>
              {/* Payment */}
              <div className="bg-primary/50 rounded-lg p-3 mb-4">
                <p className="text-white text-sm font-medium">Payment: <span className="text-accent capitalize">{formData.paymentMethod}</span></p>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="border border-white/10 text-text-secondary hover:text-white py-3 px-5 rounded-lg transition-colors">
                  ← Back
                </button>
                <button type="submit" className="flex-1 bg-accent hover:bg-accent-hover text-primary font-bold py-3 rounded-lg transition-colors">
                  Place Order - {formatPrice(finalTotal)}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-secondary rounded-xl border border-white/5 p-5 sticky top-24">
            <h3 className="text-white font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-text-secondary truncate mr-2">{item.product.name} × {item.quantity}</span>
                  <span className="text-white shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/5 pt-3 space-y-2">
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
                <span className="text-white">{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
              </div>
              <div className="border-t border-white/5 pt-2 flex justify-between">
                <span className="text-white font-semibold">Total</span>
                <span className="text-accent font-bold text-lg">{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
