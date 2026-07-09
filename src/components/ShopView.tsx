import { useState, useEffect } from 'react';
import { Filter, X, Heart, ShoppingCart, Search, Check, AlertCircle } from 'lucide-react';
import { Product, ScreenType, getProductGender } from '../types';
import { PRODUCTS, CATEGORIES } from '../data';

interface ShopViewProps {
  setScreen: (screen: ScreenType) => void;
  setSelectedProductId: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  addToCart: (product: Product, size: string, color: string) => void;
}

export default function ShopView({
  setScreen,
  setSelectedProductId,
  favorites,
  toggleFavorite,
  addToCart
}: ShopViewProps) {
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Quick feed notifications
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Sizes from GOTS standard mockup
  const sizes = ['0-3 Months', '3-6 Months', '6-12 Months'];
  
  // Colors from mockup system
  const colors = [
    { name: 'Sand', hex: '#E5D3C5' },
    { name: 'Sage', hex: '#D1E2D1' },
    { name: 'Ivory', hex: '#FCF9F2' },
    { name: 'Lavender', hex: '#C3B1E1' },
    { name: 'Caramel', hex: '#C59B74' }
  ];

  // Listener to handle category click from Home Page
  useEffect(() => {
    const handleCategoryFilter = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setSelectedCategory(customEvent.detail);
    };

    window.addEventListener('filter-category', handleCategoryFilter);
    return () => {
      window.removeEventListener('filter-category', handleCategoryFilter);
    };
  }, []);

  // Filter products based on active filters
  const filteredProducts = PRODUCTS.filter((product) => {
    // 1. Size Filter (Check if product contains size)
    if (selectedSize && !product.sizes.includes(selectedSize) && !product.sizes.includes('One Size')) {
      return false;
    }
    // 2. Color Filter
    if (selectedColor && product.colorName.toLowerCase().indexOf(selectedColor.toLowerCase()) === -1) {
      return false;
    }
    // 3. Category Filter
    if (selectedCategory) {
      const lowerCat = selectedCategory.toLowerCase();
      if (lowerCat === 'boys') {
        const gender = getProductGender(product);
        if (gender !== 'boys' && gender !== 'unisex') {
          return false;
        }
      } else if (lowerCat === 'girls') {
        const gender = getProductGender(product);
        if (gender !== 'girls' && gender !== 'unisex') {
          return false;
        }
      } else if (product.category.toLowerCase() !== lowerCat) {
        return false;
      }
    }
    // 4. Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(query);
      const matchCat = product.category.toLowerCase().includes(query);
      const matchColor = product.colorName.toLowerCase().includes(query);
      return matchName || matchCat || matchColor;
    }
    return true;
  });

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setScreen('detail');
  };

  const handleQuickAdd = (product: Product) => {
    // Determine a default size
    const defaultSize = product.sizes.includes('One Size') ? 'One Size' : product.sizes[0] || '0-3 Months';
    addToCart(product, defaultSize, product.colorName);
    
    // Trigger notification popup state
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1500);
  };

  const resetFilters = () => {
    setSelectedSize(null);
    setSelectedColor(null);
    setSelectedCategory(null);
    setSearchQuery('');
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1200px] mx-auto px-4 sm:px-8 pt-6">
      
      {/* 1. Header Metadata Section */}
      <section className="space-y-3">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-clay tracking-tight">
          Organic Cotton Collection
        </h2>
        <p className="text-brand-clay-dark/75 font-sans text-sm sm:text-base max-w-2xl leading-relaxed">
          Discover our gentlest collection yet. Sustainably sourced, chemical-free GOTS-certified fabrics, and beautifully designed for maximum cuddles. All items under $15.
        </p>
      </section>

      {/* 2. Interactive Search Bar */}
      <section className="relative max-w-md">
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search rompers, knits, swaddles..."
          className="w-full bg-white text-brand-clay placeholder-brand-clay/40 font-sans text-sm rounded-full pl-11 pr-10 py-3.5 border-2 border-brand-clay/5 focus:outline-none focus:border-brand-peach shadow-sm"
        />
        <Search className="w-5 h-5 text-brand-clay/40 absolute left-4 top-1/2 -translate-y-1/2" />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-brand-clay/40 hover:text-brand-clay hover:bg-brand-peach/10 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </section>

      {/* 3. Filtering Control Chips */}
      <section className="flex flex-wrap gap-3 items-center py-2">
        <button 
          onClick={resetFilters}
          className="flex items-center gap-1.5 bg-brand-beige hover:bg-brand-peach/20 text-brand-clay rounded-full px-4 py-2 text-xs font-bold font-sans uppercase tracking-wider inner-sunken transition-all cursor-pointer"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>

        {/* Vertical divider */}
        <div className="hidden sm:block h-6 w-[1.5px] bg-brand-clay/10 mx-1" />

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
              className={`rounded-full px-4 py-2 text-xs font-bold font-sans uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-brand-clay text-white shadow-md scale-95'
                  : 'bg-white hover:bg-brand-beige border border-brand-clay/10 text-brand-clay/80'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Vertical divider */}
        <div className="hidden sm:block h-6 w-[1.5px] bg-brand-clay/10 mx-1" />

        {/* Size chips */}
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(selectedSize === size ? null : size)}
              className={`rounded-full px-4 py-2 text-xs font-bold font-sans uppercase tracking-wider transition-all cursor-pointer ${
                selectedSize === size
                  ? 'bg-brand-mint-dark text-white shadow-md scale-95'
                  : 'bg-white hover:bg-brand-beige border border-brand-clay/10 text-brand-clay/80'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Vertical divider */}
        <div className="hidden sm:block h-6 w-[1.5px] bg-brand-clay/10 mx-1" />

        {/* Color chips */}
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold font-sans uppercase tracking-wider border transition-all cursor-pointer ${
                selectedColor === color.name
                  ? 'bg-brand-clay text-white shadow-md border-brand-clay scale-95'
                  : 'bg-white hover:bg-brand-beige border-brand-clay/10 text-brand-clay/80'
              }`}
            >
              <span 
                className="w-3 h-3 rounded-full border border-brand-clay/10 inline-block" 
                style={{ backgroundColor: color.hex }}
              />
              <span>{color.name}</span>
            </button>
          ))}
        </div>

        {/* Active categories info */}
        {selectedCategory && (
          <span className="flex items-center gap-1 bg-brand-lavender/50 text-brand-clay-dark text-xs font-bold font-sans px-3 py-2 rounded-full shadow-sm">
            Category: {selectedCategory}
            <button onClick={() => setSelectedCategory(null)} className="hover:opacity-75">
              <X className="w-3.5 h-3.5 ml-1" />
            </button>
          </span>
        )}
      </section>

      {/* 4. Display Active Filter Summary */}
      {(selectedSize || selectedColor || selectedCategory || searchQuery) && (
        <div className="flex items-center justify-between bg-brand-peach/20 border border-brand-peach/30 px-5 py-3 rounded-xl">
          <p className="text-xs text-brand-clay font-sans">
            Showing <strong className="font-bold">{filteredProducts.length}</strong> matching products.
          </p>
          <button 
            onClick={resetFilters}
            className="text-xs font-sans font-bold text-brand-clay hover:underline cursor-pointer flex items-center gap-1"
          >
            Clear active tags <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 5. Product Catalog Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-20">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            const isAdded = addedProductId === product.id;
            return (
              <div 
                key={product.id}
                className="group flex flex-col h-full bg-white rounded-2xl border border-brand-clay/5 puffy-card overflow-hidden relative"
              >
                {/* Visual Area */}
                <div className="relative aspect-[3/4] bg-brand-beige/50 overflow-hidden cursor-pointer">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    onClick={() => handleProductClick(product.id)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Heart Toggle */}
                  <button 
                    onClick={() => toggleFavorite(product.id)}
                    className={`absolute top-3 right-3 w-9.5 h-9.5 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white active:scale-90 shadow-sm ${
                      isFav ? 'text-red-500 font-bold' : 'text-brand-clay/50 hover:text-red-500'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={isFav ? 'currentColor' : 'none'} />
                  </button>

                  {/* Status Badges */}
                  {product.isNew && (
                    <span className="absolute bottom-3 left-3 bg-brand-peach text-brand-peach-dark px-3 py-1 rounded-full font-sans font-bold text-[10px] uppercase shadow-sm">
                      New In
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="absolute bottom-3 left-3 bg-brand-mint text-brand-mint-dark px-3 py-1 rounded-full font-sans font-bold text-[10px] uppercase shadow-sm">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Information Area */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 
                    onClick={() => handleProductClick(product.id)}
                    className="font-display font-bold text-sm sm:text-base text-brand-clay line-clamp-2 hover:text-brand-clay-dark cursor-pointer tracking-tight"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-brand-clay/55 font-sans mt-1 uppercase tracking-wider">
                    {product.colorName}
                  </p>

                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-brand-clay/5">
                    <div className="flex flex-col">
                      {product.originalPrice > product.price && (
                        <span className="text-[11px] line-through text-brand-clay/40 font-sans">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="font-display font-extrabold text-brand-clay text-base sm:text-lg">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <button 
                      onClick={() => handleQuickAdd(product)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 shadow-sm ${
                        isAdded 
                          ? 'bg-brand-mint-dark text-white' 
                          : 'bg-brand-clay text-white hover:bg-brand-clay-dark'
                      }`}
                      title="Add to Bag"
                    >
                      {isAdded ? (
                        <Check className="w-5 h-5 animate-pulse" />
                      ) : (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Mini Quick Add Confirmation Notification Overlay */}
                {isAdded && (
                  <div className="absolute top-0 left-0 w-full bg-brand-mint-dark text-white py-2 px-4 text-center text-xs font-bold tracking-wider animate-fadeIn flex items-center justify-center gap-1.5 z-20 shadow-sm">
                    <Check className="w-3.5 h-3.5" /> Added default GOTS size to Bag!
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-16 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-brand-clay/30 mx-auto" />
            <p className="font-display text-lg font-bold text-brand-clay">No products match your filters</p>
            <p className="text-sm text-brand-clay/60 max-w-md mx-auto">Try checking your keywords or clearing selected size and color chips to view the full boutique collection.</p>
            <button 
              onClick={resetFilters}
              className="bg-brand-clay text-white px-6 py-3 rounded-full font-display font-bold text-xs shadow-sm hover:shadow active:scale-95 transition-all"
            >
              Show All Products
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
