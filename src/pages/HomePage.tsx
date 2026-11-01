import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Zap, Truck, Shield, Headphones, ChevronRight } from 'lucide-react';
import { products, categories, heroSlides, flashSales } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/helpers';
import { useCartStore } from '../store';
import toast from 'react-hot-toast';
import QuickViewModal from '../components/QuickViewModal';
import { Product } from '../types';

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { addItem } = useCartStore();

  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNew);
  const saleProducts = products.filter(p => p.originalPrice);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
                <Zap size={14} className="text-accent" />
                <span className="text-accent text-xs font-medium">Premium Quality Printing</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-[Poppins] font-bold text-white leading-tight mb-4">
                {heroSlides[activeSlide].title.split(' ').map((word, i) => (
                  <span key={i} className={i === 0 ? 'text-accent' : ''}>{word} </span>
                ))}
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-lg">
                {heroSlides[activeSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/products" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary font-semibold px-6 py-3 rounded-lg transition-all shadow-[0_2px_10px_rgba(245,166,35,0.3)] hover:shadow-[0_4px_20px_rgba(245,166,35,0.5)]">
                  {heroSlides[activeSlide].ctaText} <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-primary font-medium px-6 py-3 rounded-lg transition-all">
                  Get Quote
                </Link>
              </div>
              {/* Slide indicators */}
              <div className="flex gap-2 mt-8">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${i === activeSlide ? 'w-8 bg-accent' : 'w-4 bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-magenta/20 rounded-3xl rotate-6" />
                <div className="absolute inset-4 bg-secondary rounded-2xl overflow-hidden border border-white/10">
                  <img src={products[0].images[0]} alt="Printing" className="w-full h-full object-cover" />
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-secondary border border-white/10 rounded-xl p-3 shadow-xl animate-bounce">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                      <Star size={14} className="text-success fill-success" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">4.9 Rating</p>
                      <p className="text-text-muted text-[10px]">2000+ Reviews</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-secondary border border-white/10 rounded-xl p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <Truck size={14} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">Fast Delivery</p>
                      <p className="text-text-muted text-[10px]">All over Nepal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y border-white/5 bg-secondary/50">
        <div className="max-w-[1440px] mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Truck size={20} />, title: 'Free Delivery', desc: 'Orders above Rs. 2,000' },
              { icon: <Shield size={20} />, title: 'Quality Guarantee', desc: '100% satisfaction' },
              { icon: <Clock size={20} />, title: 'Fast Turnaround', desc: '2-3 days delivery' },
              { icon: <Headphones size={20} />, title: '24/7 Support', desc: 'Always here to help' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{feature.title}</p>
                  <p className="text-text-muted text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-white">Shop by Category</h2>
              <p className="text-text-secondary text-sm mt-1">Find the perfect printing solution for your needs</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-1 text-accent text-sm font-medium hover:underline">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="group bg-secondary border border-white/5 rounded-xl p-4 text-center hover:border-accent/30 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">{cat.icon}</span>
                <p className="text-white text-xs font-medium truncate">{cat.name}</p>
                <p className="text-text-muted text-[10px] mt-0.5">{cat.productCount} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      <section className="py-12 lg:py-16 bg-gradient-to-r from-error/5 via-primary to-magenta/5">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-error/20 rounded-lg flex items-center justify-center">
                <Zap size={20} className="text-error" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-white">Flash Sale</h2>
                <p className="text-text-secondary text-sm">Grab before they're gone!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-text-muted text-xs">Ends in:</span>
              <div className="flex gap-1">
                {['02', '14', '36'].map((t, i) => (
                  <span key={i} className="bg-primary border border-white/10 rounded px-2 py-1 text-accent text-xs font-mono font-bold">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {flashSales.map((sale) => (
              <div key={sale.id} className="bg-secondary rounded-xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all group">
                <div className="relative aspect-square overflow-hidden">
                  <img src={sale.product.images[0]} alt={sale.product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-2 left-2 bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    -{Math.round(((sale.product.price - sale.salePrice) / sale.product.price) * 100)}%
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-white text-xs font-medium line-clamp-2 mb-1">{sale.product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold text-sm">{formatPrice(sale.salePrice)}</span>
                    <span className="text-text-muted text-xs line-through">{formatPrice(sale.product.price)}</span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div className="bg-accent h-1.5 rounded-full" style={{ width: `${sale.soldPercent}%` }} />
                    </div>
                    <p className="text-text-muted text-[10px] mt-1">{sale.soldPercent}% sold</p>
                  </div>
                  <button
                    onClick={() => { addItem(sale.product); toast.success('Added to cart!'); }}
                    className="w-full mt-2 bg-accent/10 border border-accent/30 text-accent text-xs font-medium py-1.5 rounded-lg hover:bg-accent hover:text-primary transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-white">Best Sellers</h2>
              <p className="text-text-secondary text-sm mt-1">Most popular products loved by our customers</p>
            </div>
            <Link to="/products?bestseller=true" className="flex items-center gap-1 text-accent text-sm font-medium hover:underline">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 lg:py-20 bg-secondary/30">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-white">New Arrivals</h2>
              <p className="text-text-secondary text-sm mt-1">Fresh products just added to our collection</p>
            </div>
            <Link to="/products?new=true" className="flex items-center gap-1 text-accent text-sm font-medium hover:underline">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-white">Special Offers</h2>
              <p className="text-text-secondary text-sm mt-1">Great deals on popular products</p>
            </div>
            <Link to="/products?sale=true" className="flex items-center gap-1 text-accent text-sm font-medium hover:underline">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* CMYK Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-white mb-2">Full CMYK Printing</h2>
            <p className="text-text-secondary text-sm">Vibrant colors with professional grade printing technology</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { color: 'bg-[#00BCD4]', label: 'Cyan', desc: 'C', hex: '#00BCD4' },
              { color: 'bg-[#E91E63]', label: 'Magenta', desc: 'M', hex: '#E91E63' },
              { color: 'bg-[#FFEB3B]', label: 'Yellow', desc: 'Y', hex: '#FFEB3B' },
              { color: 'bg-[#0A1628] border border-white/20', label: 'Key (Black)', desc: 'K', hex: '#000000' },
            ].map((cmyk, i) => (
              <div key={i} className="bg-secondary rounded-xl border border-white/5 p-5 text-center hover:-translate-y-1 transition-all duration-300">
                <div className={`w-16 h-16 ${cmyk.color} rounded-full mx-auto mb-3 shadow-lg`} />
                <p className="text-white font-bold text-2xl font-[Poppins]">{cmyk.desc}</p>
                <p className="text-text-secondary text-xs mt-1">{cmyk.label}</p>
                <p className="text-text-muted text-[10px] mt-0.5">{cmyk.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 lg:py-20 bg-secondary/30">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-white mb-2">Our Services</h2>
            <p className="text-text-secondary text-sm">Complete printing solutions for every need</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🖨️', title: 'Digital Printing', desc: 'High-quality digital prints for short runs. Perfect for business cards, flyers, and brochures with fast turnaround.' },
              { icon: '🎨', title: 'Offset Printing', desc: 'Cost-effective for large volume orders. Superior color consistency and quality for bulk printing needs.' },
              { icon: '✨', title: 'Special Finishes', desc: 'Gold foil, embossing, spot UV, die-cutting, and more. Make your prints stand out with premium finishes.' },
              { icon: '📐', title: 'Custom Design', desc: 'Professional graphic design services. Our team creates stunning designs that represent your brand perfectly.' },
              { icon: '📦', title: 'Packaging Solutions', desc: 'Custom packaging boxes, bags, and wraps. Protect and promote your products with branded packaging.' },
              { icon: '🏪', title: 'Signage & Display', desc: 'Indoor and outdoor signage, banners, LED signs, and display solutions for maximum visibility.' },
            ].map((service, i) => (
              <div key={i} className="bg-secondary rounded-xl border border-white/5 p-6 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 group">
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{service.icon}</span>
                <h3 className="text-white font-[Poppins] font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-white mb-2">What Our Customers Say</h2>
            <p className="text-text-secondary text-sm">Trusted by businesses across Nepal</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Rajesh Shrestha', role: 'CEO, TechNepal', text: 'Excellent quality business cards! The matte finish looks very professional. Fast delivery and great customer service.', rating: 5 },
              { name: 'Sita Maharjan', role: 'Event Planner', text: 'We ordered wedding invitations and they were absolutely stunning. The gold foil work is impeccable. Highly recommended!', rating: 5 },
              { name: 'Bikram Tamang', role: 'Marketing Manager', text: 'Great bulk pricing for our marketing materials. The brochures and flyers are top quality. Will definitely order again.', rating: 4 },
            ].map((testimonial, i) => (
              <div key={i} className="bg-secondary rounded-xl border border-white/5 p-6">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className={j < testimonial.rating ? 'text-accent fill-accent' : 'text-text-muted'} />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{testimonial.name}</p>
                    <p className="text-text-muted text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="bg-gradient-to-r from-accent/10 via-secondary to-magenta/10 rounded-2xl border border-white/10 p-8 lg:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-white mb-3">Need Custom Printing?</h2>
            <p className="text-text-secondary max-w-lg mx-auto mb-6">
              Get a free quote for your custom printing needs. Bulk orders, special finishes, and more.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="bg-accent hover:bg-accent-hover text-primary font-semibold px-6 py-3 rounded-lg transition-all">
                Get Free Quote
              </Link>
              <a href="tel:+977015555555" className="border border-accent text-accent hover:bg-accent hover:text-primary font-medium px-6 py-3 rounded-lg transition-all">
                Call: +977-01-5555555
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}
