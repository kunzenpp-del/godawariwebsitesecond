import { useState } from 'react';
import { BarChart3, Package, Users, ShoppingCart, TrendingUp, AlertTriangle, Eye, Edit, Trash2, Plus, Search, Filter } from 'lucide-react';
import { products } from '../data/mockData';
import { formatPrice, formatDate, getStatusColor } from '../utils/helpers';
import { useOrderStore } from '../store';
import { Link } from 'react-router-dom';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { orders } = useOrderStore();

  const stats = [
    { label: 'Total Revenue', value: 'Rs. 4,56,780', change: '+12.5%', icon: <TrendingUp size={18} />, color: 'text-success' },
    { label: 'Total Orders', value: orders.length.toString(), change: '+8.2%', icon: <ShoppingCart size={18} />, color: 'text-cyan' },
    { label: 'Total Products', value: products.length.toString(), change: '+3', icon: <Package size={18} />, color: 'text-accent' },
    { label: 'Total Customers', value: '1,234', change: '+24', icon: <Users size={18} />, color: 'text-magenta' },
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={16} /> },
    { id: 'products', label: 'Products', icon: <Package size={16} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={16} /> },
    { id: 'customers', label: 'Customers', icon: <Users size={16} /> },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-[Poppins] font-bold text-white">Admin Dashboard</h1>
          <p className="text-text-muted text-sm">Manage your store</p>
        </div>
        <Link to="/account" className="text-accent text-sm hover:underline">← Back to Account</Link>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <nav className="bg-secondary rounded-xl border border-white/5 p-3 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'dashboard' && (
            <div>
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-secondary rounded-xl border border-white/5 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center ${stat.color}`}>{stat.icon}</span>
                      <span className="text-success text-xs font-medium">{stat.change}</span>
                    </div>
                    <p className="text-white text-xl font-bold">{stat.value}</p>
                    <p className="text-text-muted text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts placeholder */}
              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-secondary rounded-xl border border-white/5 p-5">
                  <h3 className="text-white font-semibold mb-4">Sales Overview (Last 7 days)</h3>
                  <div className="flex items-end gap-2 h-40">
                    {[65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-accent/20 rounded-t-sm relative" style={{ height: `${h}%` }}>
                          <div className="absolute inset-0 bg-gradient-to-t from-accent to-accent/60 rounded-t-sm" />
                        </div>
                        <span className="text-text-muted text-[10px]">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-secondary rounded-xl border border-white/5 p-5">
                  <h3 className="text-white font-semibold mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {orders.slice(0, 4).map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm">#{order.id}</p>
                          <p className="text-text-muted text-xs">{order.shippingAddress.fullName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-accent text-sm font-medium">{formatPrice(order.total)}</p>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full capitalize ${getStatusColor(order.status)}`}>{order.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Alerts */}
              <div className="bg-secondary rounded-xl border border-white/5 p-5">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-yellow-400" /> Low Stock Alerts
                </h3>
                <div className="space-y-2">
                  {products.filter(p => p.stock < 100).map((p) => (
                    <div key={p.id} className="flex items-center justify-between bg-primary/50 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="w-8 h-8 rounded object-cover" />
                        <span className="text-white text-sm">{p.name}</span>
                      </div>
                      <span className="text-yellow-400 text-sm font-medium">{p.stock} left</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Products ({products.length})</h2>
                <button className="bg-accent hover:bg-accent-hover text-primary font-medium text-sm px-4 py-2 rounded-lg flex items-center gap-1">
                  <Plus size={14} /> Add Product
                </button>
              </div>
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input type="text" placeholder="Search products..." className="w-full bg-secondary border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent" />
                </div>
                <button className="flex items-center gap-1 bg-secondary border border-white/10 rounded-lg px-3 py-2 text-sm text-text-secondary">
                  <Filter size={14} /> Filter
                </button>
              </div>
              <div className="bg-secondary rounded-xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Product</th>
                        <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Category</th>
                        <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Price</th>
                        <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Stock</th>
                        <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Rating</th>
                        <th className="text-right text-text-muted text-xs font-medium px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img src={product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                              <div>
                                <p className="text-white text-sm font-medium truncate max-w-[200px]">{product.name}</p>
                                <p className="text-text-muted text-xs">{formatDate(product.createdAt)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-text-secondary text-sm">{product.category}</td>
                          <td className="px-4 py-3 text-white text-sm font-medium">{formatPrice(product.price)}</td>
                          <td className="px-4 py-3">
                            <span className={`text-sm ${product.stock < 50 ? 'text-yellow-400' : 'text-success'}`}>{product.stock}</span>
                          </td>
                          <td className="px-4 py-3 text-text-secondary text-sm">⭐ {product.rating}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button className="p-1.5 text-text-muted hover:text-accent rounded"><Eye size={14} /></button>
                              <button className="p-1.5 text-text-muted hover:text-accent rounded"><Edit size={14} /></button>
                              <button className="p-1.5 text-text-muted hover:text-error rounded"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Orders ({orders.length})</h2>
              <div className="bg-secondary rounded-xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Order ID</th>
                        <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Customer</th>
                        <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Total</th>
                        <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Status</th>
                        <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Payment</th>
                        <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Date</th>
                        <th className="text-right text-text-muted text-xs font-medium px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                          <td className="px-4 py-3 text-accent text-sm font-medium">{order.id}</td>
                          <td className="px-4 py-3 text-white text-sm">{order.shippingAddress.fullName}</td>
                          <td className="px-4 py-3 text-white text-sm font-medium">{formatPrice(order.total)}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${getStatusColor(order.status)}`}>{order.status}</span>
                          </td>
                          <td className="px-4 py-3 text-text-secondary text-sm uppercase">{order.paymentMethod}</td>
                          <td className="px-4 py-3 text-text-muted text-sm">{formatDate(order.createdAt)}</td>
                          <td className="px-4 py-3 text-right">
                            <button className="text-accent text-xs hover:underline">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Customers</h2>
              <div className="bg-secondary rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Customer</th>
                      <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Email</th>
                      <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Orders</th>
                      <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Total Spent</th>
                      <th className="text-left text-text-muted text-xs font-medium px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Rajesh Shrestha', email: 'rajesh@email.com', orders: 5, spent: 24990, status: 'VIP' },
                      { name: 'Sita Maharjan', email: 'sita@email.com', orders: 3, spent: 12500, status: 'Regular' },
                      { name: 'Bikram Tamang', email: 'bikram@email.com', orders: 1, spent: 4500, status: 'New' },
                      { name: 'Anita Poudel', email: 'anita@email.com', orders: 8, spent: 45000, status: 'VIP' },
                      { name: 'Prakash Gurung', email: 'prakash@email.com', orders: 2, spent: 8900, status: 'Regular' },
                    ].map((customer, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent text-xs font-bold">
                              {customer.name.charAt(0)}
                            </div>
                            <span className="text-white text-sm">{customer.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-text-secondary text-sm">{customer.email}</td>
                        <td className="px-4 py-3 text-white text-sm">{customer.orders}</td>
                        <td className="px-4 py-3 text-accent text-sm font-medium">{formatPrice(customer.spent)}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            customer.status === 'VIP' ? 'bg-accent/20 text-accent' : customer.status === 'Regular' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                          }`}>{customer.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
