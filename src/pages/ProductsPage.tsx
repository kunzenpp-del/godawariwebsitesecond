import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid3X3, List, X, ChevronDown } from 'lucide-react';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { Product } from '../types';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category.toLowerCase().replace(/\s+/g, '-').includes(selectedCategory));
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }

    // New arrivals
    if (searchParams.get('new') === 'true') {
      filtered = filtered.filter(p => p.isNew);
    }

    // Best sellers
    if (searchParams.get('bestseller') === 'true') {
      filtered = filtered.filter(p => p.isBestSeller);
    }

    // Sale
    if (searchParams.get('sale') === 'true') {
      filtered = filtered.filter(p => p.originalPrice);
    }

    // Price range
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
      case 'newest': filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
      case 'discount': filtered.sort((a, b) => {
        const discA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
        const discB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
        return discB - discA;
      }); break;
      default: filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return filtered;
  }, [selectedCategory, searchQuery, searchParams, sortBy, priceRange]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setPriceRange([0, 50000]);
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory || searchQuery || searchParams.get('new') || searchParams.get('bestseller') || searchParams.get('sale');

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-[Poppins] font-bold text-white">
          {searchParams.get('new') ? 'New Arrivals' : searchParams.get('bestseller') ? 'Best Sellers' : searchParams.get('sale') ? 'Special Offers' : 'All Products'}
        </h1>
        <p className="text-text-secondary text-sm mt-1">{filteredProducts.length} products found</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-secondary border border-white/10 rounded-lg px-4 py-2.5 text-sm text-text-secondary hover:text-white hover:border-accent/50 transition-colors lg:hidden"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-2.5 pl-10 text-sm text-white placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        </div>
        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-secondary border border-white/10 rounded-lg px-4 py-2.5 pr-8 text-sm text-text-secondary focus:outline-none focus:border-accent cursor-pointer"
          >
            <option value="popularity">Sort: Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Biggest Discount</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        </div>
        {/* View mode */}
        <div className="hidden md:flex items-center border border-white/10 rounded-lg overflow-hidden">
          <button onClick={() => setViewMode('grid')} className={`p-2.5 ${viewMode === 'grid' ? 'bg-accent text-primary' : 'text-text-secondary hover:text-white'}`}>
            <Grid3X3 size={16} />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2.5 ${viewMode === 'list' ? 'bg-accent text-primary' : 'text-text-secondary hover:text-white'}`}>
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Active filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-text-muted text-xs">Active filters:</span>
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">
              {selectedCategory} <button onClick={() => setSelectedCategory('')}><X size={12} /></button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">
              "{searchQuery}" <button onClick={() => setSearchQuery('')}><X size={12} /></button>
            </span>
          )}
          <button onClick={clearFilters} className="text-error text-xs hover:underline">Clear all</button>
        </div>
      )}

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'fixed inset-0 z-40 bg-primary p-6 overflow-y-auto' : 'hidden'} lg:block lg:static lg:w-64 lg:shrink-0`}>
          <div className="flex items-center justify-between lg:hidden mb-4">
            <h3 className="text-white font-semibold">Filters</h3>
            <button onClick={() => setShowFilters(false)}><X size={20} className="text-white" /></button>
          </div>
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h4 className="text-white font-medium text-sm mb-3">Categories</h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`block w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${!selectedCategory ? 'text-accent bg-accent/10' : 'text-text-secondary hover:text-white'}`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`block w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${selectedCategory === cat.slug ? 'text-accent bg-accent/10' : 'text-text-secondary hover:text-white'}`}
                  >
                    {cat.icon} {cat.name} ({cat.productCount})
                  </button>
                ))}
              </div>
            </div>
            {/* Price Range */}
            <div>
              <h4 className="text-white font-medium text-sm mb-3">Price Range (NPR)</h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-accent"
                />
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>Rs. {priceRange[0]}</span>
                  <span>Rs. {priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
            {/* Quick filters */}
            <div>
              <h4 className="text-white font-medium text-sm mb-3">Quick Filters</h4>
              <div className="space-y-1.5">
                <button onClick={() => setSearchParams({ new: 'true' })} className="block w-full text-left text-sm py-1.5 px-2 rounded text-text-secondary hover:text-white transition-colors">
                  ✨ New Arrivals
                </button>
                <button onClick={() => setSearchParams({ bestseller: 'true' })} className="block w-full text-left text-sm py-1.5 px-2 rounded text-text-secondary hover:text-white transition-colors">
                  🔥 Best Sellers
                </button>
                <button onClick={() => setSearchParams({ sale: 'true' })} className="block w-full text-left text-sm py-1.5 px-2 rounded text-text-secondary hover:text-white transition-colors">
                  💰 On Sale
                </button>
              </div>
            </div>
            <button onClick={clearFilters} className="w-full border border-white/10 text-text-secondary hover:text-white text-sm py-2 rounded-lg transition-colors">
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg mb-2">No products found</p>
              <p className="text-text-muted text-sm mb-4">Try adjusting your filters or search query</p>
              <button onClick={clearFilters} className="text-accent text-sm hover:underline">Clear all filters</button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6' : 'space-y-4'}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          )}
        </div>
      </div>

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}
