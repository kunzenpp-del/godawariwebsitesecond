import { Product, Category, Review, HeroSlide, FlashSale } from '../types';

export const categories: Category[] = [
  { id: 1, name: 'Business Cards', slug: 'business-cards', icon: '💳', subcategories: [{ name: 'Standard', slug: 'standard' }, { name: 'Premium', slug: 'premium' }, { name: 'Metallic', slug: 'metallic' }], productCount: 24 },
  { id: 2, name: 'Banners & Flex', slug: 'banners-flex', icon: '🏳️', subcategories: [{ name: 'Vinyl Banners', slug: 'vinyl' }, { name: 'Roll-up Banners', slug: 'rollup' }, { name: 'Flex Printing', slug: 'flex' }], productCount: 18 },
  { id: 3, name: 'Brochures & Flyers', slug: 'brochures-flyers', icon: '📄', subcategories: [{ name: 'Bi-fold', slug: 'bifold' }, { name: 'Tri-fold', slug: 'trifold' }, { name: 'Flyers', slug: 'flyers' }], productCount: 15 },
  { id: 4, name: 'Stickers & Labels', slug: 'stickers-labels', icon: '🏷️', subcategories: [{ name: 'Die-cut', slug: 'diecut' }, { name: 'Roll Labels', slug: 'roll' }, { name: 'Sheet Labels', slug: 'sheet' }], productCount: 32 },
  { id: 5, name: 'Packaging', slug: 'packaging', icon: '📦', subcategories: [{ name: 'Boxes', slug: 'boxes' }, { name: 'Bags', slug: 'bags' }, { name: 'Wrapping', slug: 'wrapping' }], productCount: 21 },
  { id: 6, name: 'Stationery', slug: 'stationery', icon: '✏️', subcategories: [{ name: 'Letterheads', slug: 'letterheads' }, { name: 'Envelopes', slug: 'envelopes' }, { name: 'Notebooks', slug: 'notebooks' }], productCount: 28 },
  { id: 7, name: 'Wedding & Events', slug: 'wedding-events', icon: '💒', subcategories: [{ name: 'Invitations', slug: 'invitations' }, { name: 'Menus', slug: 'menus' }, { name: 'Place Cards', slug: 'placecards' }], productCount: 16 },
  { id: 8, name: 'Signage', slug: 'signage', icon: '🪧', subcategories: [{ name: 'Acrylic', slug: 'acrylic' }, { name: 'LED', slug: 'led' }, { name: 'Metal', slug: 'metal' }], productCount: 12 },
];

export const products: Product[] = [
  {
    id: 1, name: 'Premium Business Cards - Matte Finish', slug: 'premium-business-cards-matte',
    description: 'High-quality matte finish business cards printed on 350gsm premium card stock. Perfect for professionals who want to make a lasting impression. Available in various sizes and finishes.',
    shortDescription: '350gsm matte business cards with premium finish',
    price: 499, originalPrice: 699, images: ['https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600', 'https://images.unsplash.com/photo-1572502742900-a2e4b6e7545c?w=600'],
    category: 'Business Cards', subcategory: 'Premium', tags: ['business', 'cards', 'matte', 'premium'],
    stock: 500, rating: 4.8, reviewCount: 124, isBestSeller: true,
    variants: [
      { id: 'size', name: 'Size', options: ['Standard (3.5x2")', 'Square (2.5x2.5")', 'Mini (3x1.5")'], priceModifier: 0 },
      { id: 'finish', name: 'Finish', options: ['Matte', 'Glossy', 'Soft Touch'], priceModifier: 100 },
    ],
    bulkPricing: [
      { minQty: 100, maxQty: 249, pricePerUnit: 4.99 },
      { minQty: 250, maxQty: 499, pricePerUnit: 3.99 },
      { minQty: 500, maxQty: 999, pricePerUnit: 2.99 },
    ],
    specifications: { 'Paper Weight': '350gsm', 'Finish': 'Matte', 'Print': 'Double-sided CMYK', 'Turnaround': '2-3 days' },
    createdAt: '2024-01-15'
  },
  {
    id: 2, name: 'Vinyl Banner - Custom Size', slug: 'vinyl-banner-custom',
    description: 'Durable vinyl banners perfect for outdoor and indoor advertising. Weather-resistant with vibrant colors. Available in any custom size.',
    shortDescription: 'Custom size vinyl banners for indoor/outdoor use',
    price: 150, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600'],
    category: 'Banners & Flex', subcategory: 'Vinyl', tags: ['banner', 'vinyl', 'outdoor', 'advertising'],
    stock: 1000, rating: 4.6, reviewCount: 89, isNew: true,
    bulkPricing: [{ minQty: 1, maxQty: 4, pricePerUnit: 150 }, { minQty: 5, maxQty: 9, pricePerUnit: 130 }, { minQty: 10, maxQty: 99, pricePerUnit: 110 }],
    specifications: { 'Material': '13oz Vinyl', 'Resolution': '720 DPI', 'Grommets': 'Included', 'Turnaround': '1-2 days' },
    createdAt: '2024-02-01'
  },
  {
    id: 3, name: 'Tri-fold Brochure - Full Color', slug: 'tri-fold-brochure',
    description: 'Professional tri-fold brochures printed on premium paper with full-color printing on both sides. Perfect for marketing materials.',
    shortDescription: 'Full color tri-fold brochures on premium paper',
    price: 15, originalPrice: 20, images: ['https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600'],
    category: 'Brochures & Flyers', subcategory: 'Tri-fold', tags: ['brochure', 'trifold', 'marketing', 'full-color'],
    stock: 2000, rating: 4.5, reviewCount: 67,
    bulkPricing: [{ minQty: 100, maxQty: 499, pricePerUnit: 15 }, { minQty: 500, maxQty: 999, pricePerUnit: 12 }, { minQty: 1000, maxQty: 5000, pricePerUnit: 9 }],
    specifications: { 'Paper': '170gsm Art Paper', 'Size': 'A4 (folded to A6)', 'Print': 'Full color both sides', 'Turnaround': '3-4 days' },
    createdAt: '2024-01-20'
  },
  {
    id: 4, name: 'Die-Cut Stickers - Custom Shape', slug: 'die-cut-stickers-custom',
    description: 'Custom die-cut stickers in any shape and size. Weather-resistant vinyl with vibrant colors. Perfect for branding and packaging.',
    shortDescription: 'Custom shape die-cut stickers on vinyl',
    price: 5, images: ['https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600'],
    category: 'Stickers & Labels', subcategory: 'Die-cut', tags: ['sticker', 'diecut', 'custom', 'vinyl'],
    stock: 5000, rating: 4.7, reviewCount: 156, isBestSeller: true,
    bulkPricing: [{ minQty: 50, maxQty: 99, pricePerUnit: 5 }, { minQty: 100, maxQty: 499, pricePerUnit: 3.5 }, { minQty: 500, maxQty: 999, pricePerUnit: 2.5 }],
    specifications: { 'Material': 'Vinyl', 'Finish': 'Glossy/Matte', 'Adhesive': 'Permanent', 'Turnaround': '2-3 days' },
    createdAt: '2024-01-10'
  },
  {
    id: 5, name: 'Wedding Invitation Card - Royal', slug: 'wedding-invitation-royal',
    description: 'Elegant royal wedding invitation cards with gold foil stamping. Premium quality card stock with intricate designs.',
    shortDescription: 'Royal wedding invitations with gold foil',
    price: 45, originalPrice: 65, images: ['https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600'],
    category: 'Wedding & Events', subcategory: 'Invitations', tags: ['wedding', 'invitation', 'royal', 'gold'],
    stock: 300, rating: 4.9, reviewCount: 203, isBestSeller: true,
    specifications: { 'Paper': '300gsm Textured', 'Finish': 'Gold Foil', 'Size': '5x7 inches', 'Envelope': 'Included' },
    createdAt: '2024-02-10'
  },
  {
    id: 6, name: 'Acrylic Sign Board - LED Backlit', slug: 'acrylic-sign-led',
    description: 'Premium acrylic sign boards with LED backlighting. Perfect for shop signage and office branding.',
    shortDescription: 'LED backlit acrylic sign boards',
    price: 8500, originalPrice: 12000, images: ['https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600'],
    category: 'Signage', subcategory: 'LED', tags: ['signage', 'acrylic', 'led', 'shop'],
    stock: 50, rating: 4.7, reviewCount: 34, isNew: true,
    specifications: { 'Material': '5mm Acrylic', 'Lighting': 'LED Edge-lit', 'Size': 'Custom', 'Installation': 'Included' },
    createdAt: '2024-03-01'
  },
  {
    id: 7, name: 'Custom Packaging Box', slug: 'custom-packaging-box',
    description: 'Custom printed packaging boxes for your products. Full-color printing with your brand design.',
    shortDescription: 'Custom printed product packaging boxes',
    price: 35, images: ['https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600'],
    category: 'Packaging', subcategory: 'Boxes', tags: ['packaging', 'box', 'custom', 'branding'],
    stock: 1000, rating: 4.4, reviewCount: 45,
    bulkPricing: [{ minQty: 50, maxQty: 99, pricePerUnit: 35 }, { minQty: 100, maxQty: 499, pricePerUnit: 28 }, { minQty: 500, maxQty: 999, pricePerUnit: 22 }],
    specifications: { 'Material': 'Corrugated Board', 'Print': 'Full Color CMYK', 'Size': 'Custom', 'Finish': 'Matte/Glossy' },
    createdAt: '2024-02-15'
  },
  {
    id: 8, name: 'Letterhead - Premium', slug: 'letterhead-premium',
    description: 'Professional letterheads printed on premium bond paper. Clean design with your company branding.',
    shortDescription: 'Premium letterheads on bond paper',
    price: 8, images: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600'],
    category: 'Stationery', subcategory: 'Letterheads', tags: ['letterhead', 'stationery', 'professional', 'bond'],
    stock: 3000, rating: 4.3, reviewCount: 78,
    bulkPricing: [{ minQty: 100, maxQty: 499, pricePerUnit: 8 }, { minQty: 500, maxQty: 999, pricePerUnit: 6 }, { minQty: 1000, maxQty: 5000, pricePerUnit: 4 }],
    specifications: { 'Paper': '100gsm Bond', 'Size': 'A4', 'Print': 'Full Color', 'Turnaround': '2-3 days' },
    createdAt: '2024-01-25'
  },
  {
    id: 9, name: 'Roll-up Banner Stand', slug: 'rollup-banner-stand',
    description: 'Professional roll-up banner stands with premium print quality. Includes carrying case and stand.',
    shortDescription: 'Complete roll-up banner with stand',
    price: 4500, originalPrice: 5500, images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600'],
    category: 'Banners & Flex', subcategory: 'Roll-up', tags: ['rollup', 'banner', 'stand', 'exhibition'],
    stock: 100, rating: 4.6, reviewCount: 56,
    specifications: { 'Size': '85x200cm', 'Material': 'PP Synthetic', 'Stand': 'Aluminum', 'Case': 'Included' },
    createdAt: '2024-02-20'
  },
  {
    id: 10, name: 'Metallic Business Cards', slug: 'metallic-business-cards',
    description: 'Stunning metallic business cards with gold, silver, or rose gold finish. Stand out from the competition.',
    shortDescription: 'Gold/Silver metallic finish business cards',
    price: 1200, originalPrice: 1500, images: ['https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=600'],
    category: 'Business Cards', subcategory: 'Metallic', tags: ['metallic', 'gold', 'premium', 'luxury'],
    stock: 200, rating: 4.9, reviewCount: 89, isNew: true,
    specifications: { 'Material': 'Metallic Card Stock', 'Finish': 'Gold/Silver/Rose Gold', 'Size': 'Standard', 'Turnaround': '4-5 days' },
    createdAt: '2024-03-05'
  },
  {
    id: 11, name: 'Event Menu Card - Elegant', slug: 'event-menu-card',
    description: 'Elegant menu cards for events, restaurants, and catering services. Premium paper with sophisticated designs.',
    shortDescription: 'Premium event menu cards',
    price: 25, images: ['https://images.unsplash.com/photo-1555244162-803834f70033?w=600'],
    category: 'Wedding & Events', subcategory: 'Menus', tags: ['menu', 'event', 'elegant', 'restaurant'],
    stock: 500, rating: 4.5, reviewCount: 34,
    specifications: { 'Paper': '250gsm Art Card', 'Size': 'A5', 'Print': 'Double-sided', 'Finish': 'Matte Lamination' },
    createdAt: '2024-02-28'
  },
  {
    id: 12, name: 'Custom Notebook - A5', slug: 'custom-notebook-a5',
    description: 'Custom branded notebooks with your company logo. Perfect for corporate gifts and promotions.',
    shortDescription: 'Branded custom notebooks A5 size',
    price: 180, originalPrice: 250, images: ['https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600'],
    category: 'Stationery', subcategory: 'Notebooks', tags: ['notebook', 'custom', 'corporate', 'gift'],
    stock: 400, rating: 4.4, reviewCount: 67, isNew: true,
    bulkPricing: [{ minQty: 25, maxQty: 49, pricePerUnit: 180 }, { minQty: 50, maxQty: 99, pricePerUnit: 150 }, { minQty: 100, maxQty: 500, pricePerUnit: 120 }],
    specifications: { 'Size': 'A5', 'Pages': '120 lined', 'Cover': 'Hard cover custom print', 'Binding': 'Perfect bound' },
    createdAt: '2024-03-10'
  },
];

export const reviews: Review[] = [
  { id: 1, productId: 1, userName: 'Rajesh Shrestha', rating: 5, comment: 'Excellent quality! The matte finish looks very professional. Will definitely order again.', createdAt: '2024-03-01', helpful: 12 },
  { id: 2, productId: 1, userName: 'Sita Maharjan', rating: 5, comment: 'Fast delivery and great print quality. The colors are vibrant and accurate.', createdAt: '2024-02-28', helpful: 8 },
  { id: 3, productId: 1, userName: 'Bikram Tamang', rating: 4, comment: 'Good quality cards. Slight delay in delivery but overall satisfied with the product.', createdAt: '2024-02-25', helpful: 5 },
  { id: 4, productId: 4, userName: 'Anita Poudel', rating: 5, comment: 'The die-cut stickers turned out amazing! Perfect for our product packaging.', createdAt: '2024-03-05', helpful: 15 },
  { id: 5, productId: 5, userName: 'Prakash Gurung', rating: 5, comment: 'Beautiful wedding cards! The gold foil work is stunning. Our guests loved them.', createdAt: '2024-03-02', helpful: 20 },
  { id: 6, productId: 5, userName: 'Maya Lama', rating: 5, comment: 'Absolutely gorgeous invitations. The paper quality is top-notch and the design is elegant.', createdAt: '2024-02-20', helpful: 18 },
  { id: 7, productId: 2, userName: 'Sunil Karki', rating: 4, comment: 'Good banner quality. Colors are bright and it withstood rain for a week.', createdAt: '2024-03-08', helpful: 7 },
  { id: 8, productId: 6, userName: 'Deepak Adhikari', rating: 5, comment: 'The LED sign looks fantastic! Great visibility at night. Installation was quick.', createdAt: '2024-03-10', helpful: 10 },
];

export const heroSlides: HeroSlide[] = [
  { id: 1, title: 'Premium Printing Solutions', subtitle: 'Transform your brand with our high-quality printing services. Business cards, banners, packaging & more.', ctaText: 'Shop Now', ctaLink: '/products', bgColor: 'from-primary to-secondary' },
  { id: 2, title: 'Wedding Season Special', subtitle: 'Get 20% off on all wedding invitation cards. Elegant designs with gold foil finishing.', ctaText: 'Explore Collection', ctaLink: '/products?category=wedding-events', bgColor: 'from-secondary to-primary' },
  { id: 3, title: 'Bulk Orders, Better Prices', subtitle: 'Order in bulk and save up to 40%. Perfect for businesses, events, and promotions.', ctaText: 'View Bulk Pricing', ctaLink: '/products?bulk=true', bgColor: 'from-primary to-secondary' },
];

export const flashSales: FlashSale[] = [
  { id: 1, product: products[0], salePrice: 399, endsAt: '2024-12-31T23:59:59', soldPercent: 72 },
  { id: 2, product: products[3], salePrice: 3, endsAt: '2024-12-31T23:59:59', soldPercent: 85 },
  { id: 3, product: products[4], salePrice: 35, endsAt: '2024-12-31T23:59:59', soldPercent: 60 },
  { id: 4, product: products[9], salePrice: 999, endsAt: '2024-12-31T23:59:59', soldPercent: 45 },
];

export const provinces = [
  'Koshi Province', 'Madhesh Province', 'Bagmati Province',
  'Gandaki Province', 'Lumbini Province', 'Karnali Province', 'Sudurpashchim Province'
];

export const districts: Record<string, string[]> = {
  'Bagmati Province': ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Kavrepalanchok', 'Makwanpur', 'Dhading', 'Nuwakot', 'Sindhupalchok', 'Rasuwa', 'Chitwan', 'Ramechhap', 'Dolakha', 'Sindhuli'],
  'Koshi Province': ['Morang', 'Sunsari', 'Jhapa', 'Ilam', 'Panchthar', 'Taplejung', 'Terhathum', 'Dhankuta', 'Sankhuwasabha', 'Bhojpur', 'Solukhumbu', 'Okhaldhunga', 'Khotang', 'Udayapur'],
  'Madhesh Province': ['Saptari', 'Siraha', 'Dhanusha', 'Mahottari', 'Sarlahi', 'Rautahat', 'Bara', 'Parsa'],
  'Gandaki Province': ['Kaski', 'Lamjung', 'Tanahu', 'Syangja', 'Gorkha', 'Manang', 'Mustang', 'Myagdi', 'Parbat', 'Baglung', 'Nawalparasi East'],
  'Lumbini Province': ['Rupandehi', 'Kapilvastu', 'Palpa', 'Arghakhanchi', 'Gulmi', 'Nawalparasi West', 'Dang', 'Pyuthan', 'Rolpa', 'Banke', 'Bardiya'],
  'Karnali Province': ['Surkhet', 'Dailekh', 'Jajarkot', 'Dolpa', 'Mugu', 'Humla', 'Jumla', 'Kalikot', 'Salyan', 'Rukum West'],
  'Sudurpashchim Province': ['Kailali', 'Kanchanpur', 'Dadeldhura', 'Doti', 'Achham', 'Bajhang', 'Bajura', 'Baitadi', 'Darchula'],
};

export const coupons = [
  { code: 'WELCOME10', type: 'percentage' as const, value: 10, minOrderAmount: 500, maxDiscount: 500, expiresAt: '2025-12-31' },
  { code: 'PRINT200', type: 'fixed' as const, value: 200, minOrderAmount: 1000, maxDiscount: undefined, expiresAt: '2025-12-31' },
  { code: 'BULK15', type: 'percentage' as const, value: 15, minOrderAmount: 2000, maxDiscount: 1000, expiresAt: '2025-12-31' },
];
