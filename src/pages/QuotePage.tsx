import { useState } from 'react';
import { Upload, Send, CheckCircle } from 'lucide-react';
import { products } from '../data/mockData';
import toast from 'react-hot-toast';

export default function QuotePage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    product: '',
    width: '',
    height: '',
    length: '',
    unit: 'inches',
    quantity: '',
    quantity_2: '',
    quantity_3: '',
    comments: '',
  });
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.first_name || !formData.last_name || !formData.phone || !formData.product || !formData.quantity) {
      toast.error('Please fill all required fields');
      return;
    }

    // In production, this would send to the backend API
    // For now, we'll just show success
    console.log('Quote request:', { ...formData, designFile: designFile?.name });
    
    setSubmitted(true);
    toast.success('Quote request submitted successfully!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDesignFile(e.target.files[0]);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-success" />
          </div>
          <h2 className="text-3xl font-[Poppins] font-bold text-white dark:text-white light:text-gray-900 mb-4">
            Quote Request Submitted!
          </h2>
          <p className="text-text-secondary dark:text-text-secondary light:text-gray-600 mb-6">
            Thank you for your quote request. Our team will review your requirements and get back to you within 24 hours.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                product: '',
                width: '',
                height: '',
                length: '',
                unit: 'inches',
                quantity: '',
                quantity_2: '',
                quantity_3: '',
                comments: '',
              });
              setDesignFile(null);
            }}
            className="bg-accent hover:bg-accent-hover text-primary font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-[Poppins] font-bold text-white dark:text-white light:text-gray-900 mb-4">
            Get a Free Quote
          </h1>
          <p className="text-text-secondary dark:text-text-secondary light:text-gray-600 max-w-2xl mx-auto">
            Fill out the form below and we'll provide you with a detailed quote for your printing needs.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-secondary dark:bg-secondary light:bg-white rounded-2xl border border-white/5 dark:border-white/5 light:border-gray-200 p-6 md:p-8">
          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-xl font-[Poppins] font-semibold text-white dark:text-white light:text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm mb-1 block">
                  First Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                  required
                  className="w-full bg-primary dark:bg-primary light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg px-3 py-2.5 text-sm text-white dark:text-white light:text-gray-900 placeholder-text-muted focus:outline-none focus:border-accent"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm mb-1 block">
                  Last Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                  required
                  className="w-full bg-primary dark:bg-primary light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg px-3 py-2.5 text-sm text-white dark:text-white light:text-gray-900 placeholder-text-muted focus:outline-none focus:border-accent"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm mb-1 block">
                  Phone <span className="text-error">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="w-full bg-primary dark:bg-primary light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg px-3 py-2.5 text-sm text-white dark:text-white light:text-gray-900 placeholder-text-muted focus:outline-none focus:border-accent"
                  placeholder="+977-98XXXXXXXX"
                />
              </div>
              <div>
                <label className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-primary dark:bg-primary light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg px-3 py-2.5 text-sm text-white dark:text-white light:text-gray-900 placeholder-text-muted focus:outline-none focus:border-accent"
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>

          {/* Product Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-[Poppins] font-semibold text-white dark:text-white light:text-gray-900 mb-4">
              Product
            </h3>
            <div>
              <label className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm mb-1 block">
                Select Product <span className="text-error">*</span>
              </label>
              <select
                value={formData.product}
                onChange={(e) => setFormData({...formData, product: e.target.value})}
                required
                className="w-full bg-primary dark:bg-primary light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg px-3 py-2.5 text-sm text-white dark:text-white light:text-gray-900 focus:outline-none focus:border-accent"
              >
                <option value="">Choose a product</option>
                <option value="Business Cards">Business Cards</option>
                <option value="Banners & Flex">Banners & Flex</option>
                <option value="Brochures & Flyers">Brochures & Flyers</option>
                <option value="Stickers & Labels">Stickers & Labels</option>
                <option value="Packaging">Packaging</option>
                <option value="Wedding Cards">Wedding Cards</option>
                <option value="Signage">Signage</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Size */}
          <div className="mb-8">
            <h3 className="text-xl font-[Poppins] font-semibold text-white dark:text-white light:text-gray-900 mb-4">
              Size (Optional)
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm mb-1 block">
                  Width
                </label>
                <input
                  type="number"
                  value={formData.width}
                  onChange={(e) => setFormData({...formData, width: e.target.value})}
                  className="w-full bg-primary dark:bg-primary light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg px-3 py-2.5 text-sm text-white dark:text-white light:text-gray-900 placeholder-text-muted focus:outline-none focus:border-accent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm mb-1 block">
                  Height
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                  className="w-full bg-primary dark:bg-primary light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg px-3 py-2.5 text-sm text-white dark:text-white light:text-gray-900 placeholder-text-muted focus:outline-none focus:border-accent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm mb-1 block">
                  Length
                </label>
                <input
                  type="number"
                  value={formData.length}
                  onChange={(e) => setFormData({...formData, length: e.target.value})}
                  className="w-full bg-primary dark:bg-primary light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg px-3 py-2.5 text-sm text-white dark:text-white light:text-gray-900 placeholder-text-muted focus:outline-none focus:border-accent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm mb-1 block">
                  Unit
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  className="w-full bg-primary dark:bg-primary light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg px-3 py-2.5 text-sm text-white dark:text-white light:text-gray-900 focus:outline-none focus:border-accent"
                >
                  <option value="inches">Inches</option>
                  <option value="cm">Cm</option>
                  <option value="mm">Mm</option>
                  <option value="feet">Feet</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-xl font-[Poppins] font-semibold text-white dark:text-white light:text-gray-900 mb-4">
              Quantity
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm mb-1 block">
                  Quantity <span className="text-error">*</span>
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  required
                  min="1"
                  className="w-full bg-primary dark:bg-primary light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg px-3 py-2.5 text-sm text-white dark:text-white light:text-gray-900 placeholder-text-muted focus:outline-none focus:border-accent"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm mb-1 block">
                  Quantity 2 (Optional)
                </label>
                <input
                  type="number"
                  value={formData.quantity_2}
                  onChange={(e) => setFormData({...formData, quantity_2: e.target.value})}
                  min="1"
                  className="w-full bg-primary dark:bg-primary light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg px-3 py-2.5 text-sm text-white dark:text-white light:text-gray-900 placeholder-text-muted focus:outline-none focus:border-accent"
                  placeholder="500"
                />
              </div>
              <div>
                <label className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm mb-1 block">
                  Quantity 3 (Optional)
                </label>
                <input
                  type="number"
                  value={formData.quantity_3}
                  onChange={(e) => setFormData({...formData, quantity_3: e.target.value})}
                  min="1"
                  className="w-full bg-primary dark:bg-primary light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg px-3 py-2.5 text-sm text-white dark:text-white light:text-gray-900 placeholder-text-muted focus:outline-none focus:border-accent"
                  placeholder="1000"
                />
              </div>
            </div>
          </div>

          {/* Design File Upload */}
          <div className="mb-8">
            <h3 className="text-xl font-[Poppins] font-semibold text-white dark:text-white light:text-gray-900 mb-4">
              Design File (Optional)
            </h3>
            <div className="border-2 border-dashed border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="design-file"
                onChange={handleFileChange}
                accept=".ai,.psd,.pdf,.jpg,.jpeg,.png"
                className="hidden"
              />
              <label htmlFor="design-file" className="cursor-pointer">
                <Upload size={32} className="text-accent mx-auto mb-2" />
                <p className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm mb-1">
                  {designFile ? designFile.name : 'Click to upload your design file'}
                </p>
                <p className="text-text-muted text-xs">
                  Accepted formats: AI, PSD, PDF, JPG, PNG (Max 10MB)
                </p>
              </label>
            </div>
          </div>

          {/* Additional Comments */}
          <div className="mb-8">
            <h3 className="text-xl font-[Poppins] font-semibold text-white dark:text-white light:text-gray-900 mb-4">
              Additional Comments
            </h3>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({...formData, comments: e.target.value})}
              rows={4}
              className="w-full bg-primary dark:bg-primary light:bg-gray-50 border border-white/10 dark:border-white/10 light:border-gray-300 rounded-lg px-3 py-2.5 text-sm text-white dark:text-white light:text-gray-900 placeholder-text-muted focus:outline-none focus:border-accent resize-none"
              placeholder="Any special requirements or instructions..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent-hover text-primary font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Send size={18} /> Submit Quote Request
          </button>
        </form>
      </div>
    </div>
  );
}
