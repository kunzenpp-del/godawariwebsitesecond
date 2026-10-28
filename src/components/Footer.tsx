import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg font-[Poppins]">GP</span>
              </div>
              <div>
                <h3 className="text-white font-[Poppins] font-bold text-sm">Godawari</h3>
                <p className="text-text-muted text-xs">Printing Solution</p>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Your trusted partner for premium printing services in Nepal. Quality prints, fast delivery, and competitive prices.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent hover:bg-white/10 transition-all">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent hover:bg-white/10 transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent hover:bg-white/10 transition-all">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-text-secondary hover:text-accent hover:bg-white/10 transition-all">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-[Poppins] font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {['About Us', 'Our Services', 'Portfolio', 'Blog', 'Careers', 'FAQ'].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-text-secondary text-sm hover:text-accent transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-[Poppins] font-semibold text-sm mb-4">Products</h4>
            <ul className="space-y-2.5">
              {['Business Cards', 'Banners & Flex', 'Brochures', 'Stickers', 'Packaging', 'Wedding Cards', 'Signage'].map((link) => (
                <li key={link}>
                  <Link to="/products" className="text-text-secondary text-sm hover:text-accent transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-[Poppins] font-semibold text-sm mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm">Godawari-12, Lalitpur, Nepal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent shrink-0" />
                <span className="text-text-secondary text-sm">+977-01-5555555</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent shrink-0" />
                <span className="text-text-secondary text-sm">info@godawariprinting.com</span>
              </li>
            </ul>
            {/* Newsletter */}
            <div className="mt-5">
              <p className="text-text-secondary text-xs mb-2">Subscribe for 10% off first order</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-primary border border-white/10 rounded-l-lg px-3 py-2 text-xs text-white placeholder-text-muted focus:outline-none focus:border-accent"
                />
                <button className="bg-accent hover:bg-accent-hover text-primary font-medium text-xs px-3 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-10 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-text-muted text-xs">Payment Methods:</span>
              <div className="flex gap-2">
                {['eSewa', 'Khalti', 'COD', 'Bank'].map((method) => (
                  <span key={method} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-text-secondary">{method}</span>
                ))}
              </div>
            </div>
            <p className="text-text-muted text-xs">© 2024 Godawari Printing Solution. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
