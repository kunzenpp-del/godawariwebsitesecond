import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, Heart, MapPin, Settings, LogOut, ChevronRight, Star, Clock } from 'lucide-react';
import { useAuthStore, useOrderStore, useWishlistStore } from '../store';
import { formatPrice, formatDate, getStatusColor } from '../utils/helpers';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const { user, logout, isAuthenticated } = useAuthStore();
  const { orders } = useOrderStore();
  const { items: wishlistItems } = useWishlistStore();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Please login to view your account</h2>
        <Link to="/login" className="bg-accent hover:bg-accent-hover text-primary font-semibold px-6 py-3 rounded-lg inline-block">
          Login
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: <Package size={16} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={16} />, badge: wishlistItems.length },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={16} /> },
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-secondary rounded-xl border border-white/5 p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold text-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-medium text-sm">{user?.name}</p>
                <p className="text-text-muted text-xs">{user?.email}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    activeTab === tab.id ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  <span className="flex-1 text-left">{tab.label}</span>
                  {tab.badge ? <span className="bg-accent text-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{tab.badge}</span> : null}
                  <ChevronRight size={14} className="text-text-muted" />
                </button>
              ))}
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-error hover:bg-error/10 transition-colors">
                <LogOut size={16} /> Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-[Poppins] font-bold text-white mb-4">My Orders</h2>
              {orders.length === 0 ? (
                <div className="bg-secondary rounded-xl border border-white/5 p-8 text-center">
                  <Package size={40} className="text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary">No orders yet</p>
                  <Link to="/products" className="text-accent text-sm hover:underline mt-2 inline-block">Start Shopping →</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-secondary rounded-xl border border-white/5 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div>
                          <p className="text-white font-medium text-sm">Order #{order.id}</p>
                          <p className="text-text-muted text-xs">{formatDate(order.createdAt)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <span className="text-accent font-bold text-sm">{formatPrice(order.total)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-text-muted text-xs">
                          <Clock size={12} />
                          <span>{order.paymentMethod.toUpperCase()}</span>
                          {order.trackingNumber && <span className="ml-2">Tracking: {order.trackingNumber}</span>}
                        </div>
                        <button className="text-accent text-xs hover:underline">View Details →</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              <h2 className="text-xl font-[Poppins] font-bold text-white mb-4">My Wishlist ({wishlistItems.length})</h2>
              {wishlistItems.length === 0 ? (
                <div className="bg-secondary rounded-xl border border-white/5 p-8 text-center">
                  <Heart size={40} className="text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary">Your wishlist is empty</p>
                  <Link to="/products" className="text-accent text-sm hover:underline mt-2 inline-block">Browse Products →</Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlistItems.map((product) => (
                    <Link key={product.id} to={`/product/${product.slug}`} className="bg-secondary rounded-xl border border-white/5 overflow-hidden group hover:border-accent/30 transition-all">
                      <img src={product.images[0]} alt={product.name} className="w-full aspect-square object-cover" />
                      <div className="p-3">
                        <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-accent">{product.name}</h3>
                        <p className="text-accent font-bold mt-1">{formatPrice(product.price)}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star size={10} className="text-accent fill-accent" />
                          <span className="text-text-muted text-xs">{product.rating}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <h2 className="text-xl font-[Poppins] font-bold text-white mb-4">Saved Addresses</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-secondary rounded-xl border border-accent/30 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full">Default</span>
                    <button className="text-text-muted text-xs hover:text-accent">Edit</button>
                  </div>
                  <p className="text-white text-sm font-medium">Home</p>
                  <p className="text-text-secondary text-xs mt-1">Baneshwor, Ward 10</p>
                  <p className="text-text-secondary text-xs">Kathmandu, Bagmati Province</p>
                  <p className="text-text-muted text-xs mt-1">+977-9841234567</p>
                </div>
                <div className="bg-secondary rounded-xl border border-white/5 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-white/5 text-text-muted text-xs px-2 py-0.5 rounded-full">Office</span>
                    <button className="text-text-muted text-xs hover:text-accent">Edit</button>
                  </div>
                  <p className="text-white text-sm font-medium">Office</p>
                  <p className="text-text-secondary text-xs mt-1">Pulchowk, Ward 5</p>
                  <p className="text-text-secondary text-xs">Lalitpur, Bagmati Province</p>
                  <p className="text-text-muted text-xs mt-1">+977-9841234567</p>
                </div>
                <button className="bg-secondary/50 border border-dashed border-white/10 rounded-xl p-4 flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-colors">
                  + Add New Address
                </button>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-[Poppins] font-bold text-white mb-4">Profile Settings</h2>
              <div className="bg-secondary rounded-xl border border-white/5 p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-text-secondary text-xs mb-1 block">Full Name</label>
                    <input type="text" defaultValue={user?.name} className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="text-text-secondary text-xs mb-1 block">Email</label>
                    <input type="email" defaultValue={user?.email} className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="text-text-secondary text-xs mb-1 block">Phone</label>
                    <input type="tel" placeholder="+977-98XXXXXXXX" className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="text-text-secondary text-xs mb-1 block">Date of Birth</label>
                    <input type="date" className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent" />
                  </div>
                </div>
                <button className="mt-4 bg-accent hover:bg-accent-hover text-primary font-semibold py-2.5 px-5 rounded-lg transition-colors text-sm">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-[Poppins] font-bold text-white mb-4">Settings</h2>
              <div className="bg-secondary rounded-xl border border-white/5 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">Email Notifications</p>
                    <p className="text-text-muted text-xs">Receive order updates via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-accent w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">SMS Notifications</p>
                    <p className="text-text-muted text-xs">Receive order updates via SMS</p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-accent w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-medium">Marketing Emails</p>
                    <p className="text-text-muted text-xs">Receive promotional offers and newsletters</p>
                  </div>
                  <input type="checkbox" className="accent-accent w-4 h-4" />
                </div>
                <hr className="border-white/5" />
                <div>
                  <p className="text-white text-sm font-medium mb-2">Change Password</p>
                  <div className="space-y-2 max-w-sm">
                    <input type="password" placeholder="Current password" className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent" />
                    <input type="password" placeholder="New password" className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent" />
                    <input type="password" placeholder="Confirm new password" className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent" />
                  </div>
                  <button className="mt-3 bg-accent hover:bg-accent-hover text-primary font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
