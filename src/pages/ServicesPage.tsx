import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: '🖨️',
      title: 'Digital Printing',
      description: 'High-quality digital prints for short runs. Perfect for business cards, flyers, brochures, and marketing materials with fast turnaround.',
      features: ['Quick turnaround (24-48 hours)', 'Full color CMYK printing', 'Various paper stocks', 'Small to medium quantities', 'Cost-effective for short runs'],
    },
    {
      icon: '🎨',
      title: 'Offset Printing',
      description: 'Cost-effective for large volume orders. Superior color consistency and quality for bulk printing needs like catalogs, magazines, and packaging.',
      features: ['Best for 500+ quantities', 'Exceptional color accuracy', 'Wide range of paper options', 'Special inks (Pantone)', 'Economical for large runs'],
    },
    {
      icon: '✨',
      title: 'Special Finishes',
      description: 'Make your prints stand out with premium finishes. Gold foil, embossing, spot UV, die-cutting, and more luxury options.',
      features: ['Gold/Silver foil stamping', 'Embossing & Debossing', 'Spot UV coating', 'Die-cutting & shaping', 'Soft-touch lamination'],
    },
    {
      icon: '📐',
      title: 'Custom Design',
      description: 'Professional graphic design services. Our team creates stunning designs that represent your brand perfectly and communicate your message.',
      features: ['Logo design', 'Brand identity', 'Marketing materials', 'Packaging design', 'Unlimited revisions'],
    },
    {
      icon: '📦',
      title: 'Packaging Solutions',
      description: 'Custom packaging boxes, bags, and wraps. Protect and promote your products with branded packaging that makes an impression.',
      features: ['Custom box design', 'Product packaging', 'Gift boxes', 'Paper bags', 'Eco-friendly options'],
    },
    {
      icon: '🏪',
      title: 'Signage & Display',
      description: 'Indoor and outdoor signage, banners, LED signs, and display solutions for maximum visibility and brand presence.',
      features: ['Vinyl banners', 'LED sign boards', 'Acrylic signs', 'Roll-up stands', 'Vehicle wraps'],
    },
    {
      icon: '💳',
      title: 'Business Cards',
      description: 'Premium business cards in various finishes. Make a lasting first impression with high-quality cards that reflect your professionalism.',
      features: ['Matte & Glossy finish', 'Metallic cards', 'Rounded corners', 'Spot UV', 'Premium paper stocks'],
    },
    {
      icon: '💒',
      title: 'Wedding & Events',
      description: 'Elegant wedding invitations, event materials, and celebration prints. Make your special day memorable with beautiful designs.',
      features: ['Wedding invitations', 'Event programs', 'Menu cards', 'Place cards', 'Thank you cards'],
    },
  ];

  const process = [
    { step: '01', title: 'Consultation', description: 'Discuss your requirements and get expert advice' },
    { step: '02', title: 'Design', description: 'Create or refine your design with our team' },
    { step: '03', title: 'Proof', description: 'Review and approve the digital proof' },
    { step: '04', title: 'Production', description: 'We print with precision and care' },
    { step: '05', title: 'Delivery', description: 'Fast delivery to your doorstep' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-accent/10 via-primary to-cyan/10 dark:from-accent/10 dark:via-primary dark:to-cyan/10 light:from-accent/5 light:via-white light:to-cyan/5">
        <div className="max-w-[1440px] mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[Poppins] font-bold text-white dark:text-white light:text-gray-900 mb-6">
            Our <span className="text-accent">Services</span>
          </h1>
          <p className="text-xl text-text-secondary dark:text-text-secondary light:text-gray-600 max-w-3xl mx-auto">
            Comprehensive printing solutions for every need. From business cards to large format prints, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-primary dark:bg-primary light:bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-secondary dark:bg-secondary light:bg-white rounded-2xl p-8 border border-white/5 dark:border-white/5 light:border-gray-200 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-5xl mb-4 block">{service.icon}</span>
                <h3 className="text-2xl font-[Poppins] font-bold text-white dark:text-white light:text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-text-secondary dark:text-text-secondary light:text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-secondary dark:bg-secondary light:bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-[Poppins] font-bold text-white dark:text-white light:text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-text-secondary dark:text-text-secondary light:text-gray-600 max-w-2xl mx-auto">
              Simple, transparent, and efficient. Here's how we work with you from start to finish.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-primary font-bold text-xl">
                  {step.step}
                </div>
                <h3 className="text-lg font-[Poppins] font-semibold text-white dark:text-white light:text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm">
                  {step.description}
                </p>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-accent/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary dark:bg-primary light:bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="bg-gradient-to-r from-accent/10 via-secondary to-magenta/10 dark:from-accent/10 dark:via-secondary dark:to-magenta/10 light:from-accent/5 light:via-white light:to-magenta/5 rounded-2xl border border-white/10 dark:border-white/10 light:border-gray-200 p-8 lg:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-[Poppins] font-bold text-white dark:text-white light:text-gray-900 mb-3">
              Ready to Start Your Project?
            </h2>
            <p className="text-text-secondary dark:text-text-secondary light:text-gray-600 max-w-lg mx-auto mb-6">
              Get a free quote for your printing needs. Our team is ready to help you bring your vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/quote"
                className="bg-accent hover:bg-accent-hover text-primary font-semibold px-6 py-3 rounded-lg transition-all flex items-center gap-2"
              >
                Get Free Quote <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="border border-accent text-accent hover:bg-accent hover:text-primary font-medium px-6 py-3 rounded-lg transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
