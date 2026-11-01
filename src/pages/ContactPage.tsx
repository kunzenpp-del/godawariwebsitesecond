import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-[Poppins] font-bold text-white mb-3">Get in Touch</h1>
        <p className="text-text-secondary max-w-lg mx-auto">Have questions about our printing services? Need a custom quote? We're here to help!</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          {[
            { icon: <MapPin size={20} />, title: 'Visit Us', info: 'Godawari-12, Lalitpur, Nepal', sub: 'Open for walk-ins' },
            { icon: <Phone size={20} />, title: 'Call Us', info: '+977-01-5555555', sub: '+977-9841234567' },
            { icon: <Mail size={20} />, title: 'Email Us', info: 'info@godawariprinting.com', sub: 'orders@godawariprinting.com' },
            { icon: <Clock size={20} />, title: 'Working Hours', info: 'Sun - Fri: 9:00 AM - 6:00 PM', sub: 'Saturday: 10:00 AM - 4:00 PM' },
          ].map((item, i) => (
            <div key={i} className="bg-secondary rounded-xl border border-white/5 p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-white font-medium text-sm">{item.title}</p>
                <p className="text-text-secondary text-sm mt-0.5">{item.info}</p>
                <p className="text-text-muted text-xs mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}

          {/* Map placeholder */}
          <div className="bg-secondary rounded-xl border border-white/5 overflow-hidden h-48 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={32} className="text-accent mx-auto mb-2" />
              <p className="text-text-muted text-sm">Godawari, Lalitpur, Nepal</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-secondary rounded-xl border border-white/5 p-6">
            <h2 className="text-xl font-[Poppins] font-bold text-white mb-4">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-text-secondary text-xs mb-1 block">Your Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent"
                    placeholder="Ram Bahadur"
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-xs mb-1 block">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-xs mb-1 block">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent"
                    placeholder="+977-98XXXXXXXX"
                  />
                </div>
                <div>
                  <label className="text-text-secondary text-xs mb-1 block">Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                    className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-accent"
                  >
                    <option value="">Select subject</option>
                    <option value="quote">Request a Quote</option>
                    <option value="order">Order Inquiry</option>
                    <option value="bulk">Bulk Order</option>
                    <option value="custom">Custom Printing</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-text-secondary text-xs mb-1 block">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  rows={5}
                  className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>
              <button type="submit" className="bg-accent hover:bg-accent-hover text-primary font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
