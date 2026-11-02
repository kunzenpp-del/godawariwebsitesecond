import { Award, Users, Target, Eye, Heart, CheckCircle, Clock, Truck, Shield } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { number: '14+', label: 'Years Experience', icon: <Clock size={24} /> },
    { number: '50+', label: 'Team Members', icon: <Users size={24} /> },
    { number: '5000+', label: 'Happy Clients', icon: <Heart size={24} /> },
    { number: '10000+', label: 'Projects Completed', icon: <Award size={24} /> },
  ];

  const values = [
    { icon: <CheckCircle size={32} />, title: 'Quality', description: 'We never compromise on the quality of our prints and services.' },
    { icon: <Target size={32} />, title: 'Innovation', description: 'Embracing new technologies and methods to serve you better.' },
    { icon: <Shield size={32} />, title: 'Integrity', description: 'Honest and transparent business practices in everything we do.' },
    { icon: <Heart size={32} />, title: 'Customer Focus', description: 'Your satisfaction is our top priority and driving force.' },
  ];

  const whyChooseUs = [
    'State-of-the-art printing equipment',
    'Experienced and skilled team',
    'Competitive pricing',
    'Fast turnaround time',
    'Free design support',
    'Nationwide delivery',
    '100% satisfaction guarantee',
    'Eco-friendly printing options',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-accent/10 via-primary to-magenta/10 dark:from-accent/10 dark:via-primary dark:to-magenta/10 light:from-accent/5 light:via-white light:to-accent/5">
        <div className="max-w-[1440px] mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-[Poppins] font-bold text-white dark:text-white light:text-gray-900 mb-6">
            About <span className="text-accent">Godawari</span> Printing Solution
          </h1>
          <p className="text-xl text-text-secondary dark:text-text-secondary light:text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for premium printing services in Nepal since 2010. We combine cutting-edge technology with traditional craftsmanship to deliver exceptional quality prints.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary dark:bg-secondary light:bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-[Poppins] font-bold text-accent mb-2">{stat.number}</h3>
                <p className="text-text-secondary dark:text-text-secondary light:text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-primary dark:bg-primary light:bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-[Poppins] font-bold text-white dark:text-white light:text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-text-secondary dark:text-text-secondary light:text-gray-600 leading-relaxed">
                <p>
                  Founded in 2010 in the heart of Godawari, Lalitpur, we started as a small printing shop with a big vision. Over the years, we have grown into one of Nepal's leading printing solutions providers, serving thousands of satisfied customers across the country.
                </p>
                <p>
                  Our journey has been marked by continuous innovation, quality improvement, and customer satisfaction. Today, we operate state-of-the-art printing facilities equipped with the latest technology to meet all your printing needs.
                </p>
                <p>
                  From business cards to large format banners, from wedding invitations to corporate packaging, we handle every project with the same dedication and attention to detail that has made us who we are today.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-magenta/20 rounded-3xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <Award size={80} className="text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-[Poppins] font-bold text-white dark:text-white light:text-gray-900 mb-2">
                    Excellence Since 2010
                  </h3>
                  <p className="text-text-secondary dark:text-text-secondary light:text-gray-600">
                    Delivering quality prints that make a difference
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary dark:bg-secondary light:bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary dark:bg-primary light:bg-gray-50 rounded-2xl p-8 border border-white/5 dark:border-white/5 light:border-gray-200">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Target size={28} className="text-accent" />
              </div>
              <h3 className="text-2xl font-[Poppins] font-bold text-white dark:text-white light:text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-text-secondary dark:text-text-secondary light:text-gray-600 leading-relaxed">
                To provide high-quality, affordable printing solutions that help businesses and individuals communicate effectively. We strive to exceed customer expectations through innovation, reliability, and exceptional service.
              </p>
            </div>
            <div className="bg-primary dark:bg-primary light:bg-gray-50 rounded-2xl p-8 border border-white/5 dark:border-white/5 light:border-gray-200">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Eye size={28} className="text-accent" />
              </div>
              <h3 className="text-2xl font-[Poppins] font-bold text-white dark:text-white light:text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-text-secondary dark:text-text-secondary light:text-gray-600 leading-relaxed">
                To be Nepal's most trusted and innovative printing company, setting industry standards for quality, sustainability, and customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-primary dark:bg-primary light:bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-[Poppins] font-bold text-white dark:text-white light:text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-text-secondary dark:text-text-secondary light:text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-secondary dark:bg-secondary light:bg-white rounded-xl p-6 border border-white/5 dark:border-white/5 light:border-gray-200 text-center hover:border-accent/30 transition-all">
                <div className="text-accent mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-[Poppins] font-semibold text-white dark:text-white light:text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-text-secondary dark:text-text-secondary light:text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary dark:bg-secondary light:bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-[Poppins] font-bold text-white dark:text-white light:text-gray-900 mb-6">
                Why Choose Us?
              </h2>
              <p className="text-text-secondary dark:text-text-secondary light:text-gray-600 mb-8 leading-relaxed">
                We're committed to providing the best printing experience possible. Here's what sets us apart from the competition.
              </p>
              <ul className="space-y-3">
                {whyChooseUs.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-text-secondary dark:text-text-secondary light:text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary dark:bg-primary light:bg-gray-50 rounded-xl p-6 text-center">
                <Truck size={40} className="text-accent mx-auto mb-3" />
                <h4 className="text-white dark:text-white light:text-gray-900 font-semibold mb-1">Fast Delivery</h4>
                <p className="text-text-muted text-sm">All over Nepal</p>
              </div>
              <div className="bg-primary dark:bg-primary light:bg-gray-50 rounded-xl p-6 text-center">
                <Shield size={40} className="text-accent mx-auto mb-3" />
                <h4 className="text-white dark:text-white light:text-gray-900 font-semibold mb-1">Quality Guarantee</h4>
                <p className="text-text-muted text-sm">100% satisfaction</p>
              </div>
              <div className="bg-primary dark:bg-primary light:bg-gray-50 rounded-xl p-6 text-center">
                <Clock size={40} className="text-accent mx-auto mb-3" />
                <h4 className="text-white dark:text-white light:text-gray-900 font-semibold mb-1">Quick Turnaround</h4>
                <p className="text-text-muted text-sm">2-3 days delivery</p>
              </div>
              <div className="bg-primary dark:bg-primary light:bg-gray-50 rounded-xl p-6 text-center">
                <Heart size={40} className="text-accent mx-auto mb-3" />
                <h4 className="text-white dark:text-white light:text-gray-900 font-semibold mb-1">24/7 Support</h4>
                <p className="text-text-muted text-sm">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
