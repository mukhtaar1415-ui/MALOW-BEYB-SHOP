import { useState, FormEvent } from 'react';
import { Heart, Star, Sparkles, Send, Check } from 'lucide-react';
import { Product, Category, ScreenType } from '../types';
import { CATEGORIES, PRODUCTS, HERO_BANNER_IMG } from '../data';

interface HomeViewProps {
  setScreen: (screen: ScreenType) => void;
  setSelectedProductId: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export default function HomeView({ 
  setScreen, 
  setSelectedProductId, 
  favorites, 
  toggleFavorite 
}: HomeViewProps) {
  
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Trending items selected specifically from the mockups
  const trendingProducts = PRODUCTS.filter(p => 
    ['ribbed-organic-romper', 'cloud-knit-bonnet', 'waffle-sleep-set', 'soft-sole-moccasins'].includes(p.id)
  );

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setScreen('detail');
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  const handleCategoryClick = (categoryName: string) => {
    // Custom trigger which will be handled in parent to automatically filter the shop
    window.dispatchEvent(new CustomEvent('filter-category', { detail: categoryName }));
    setScreen('shop');
  };

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* 1. Hero Banner */}
      <section className="px-4 sm:px-8 pt-6 max-w-[1200px] mx-auto">
        <div className="relative w-full aspect-[4/5] sm:aspect-[21/9] rounded-3xl overflow-hidden puffy-shadow group border border-brand-clay/5">
          {/* Background image from mockups */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: `url(${HERO_BANNER_IMG})` }}
          />
          {/* Ambient gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col items-start gap-3 sm:gap-4 z-10">
            <span className="bg-brand-lavender text-brand-clay-dark font-display text-[10px] sm:text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-sm">
              NEW SEASON ARRIVAL
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm max-w-[500px]">
              The Softest Arrival
            </h2>
            <button 
              onClick={() => setScreen('shop')}
              className="bg-white hover:bg-brand-cream text-brand-clay font-display text-sm font-bold px-7 py-4 rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all duration-300"
            >
              Shop New Arrivals
            </button>
          </div>
        </div>
      </section>

      {/* 2. Shop by Category (Horizontal Scroll) */}
      <section className="space-y-6 max-w-[1200px] mx-auto px-4 sm:px-8">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-extrabold text-brand-clay tracking-tight">
            Shop by Category
          </h3>
          <p className="text-brand-clay/70 font-sans text-xs sm:text-sm">Curated babywear bundles tailored for tiny explorers</p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="flex-shrink-0 w-36 sm:w-40 text-center space-y-3 group cursor-pointer focus:outline-none"
            >
              <div className={`w-36 h-36 sm:w-40 sm:h-40 rounded-full ${cat.bgColor} flex items-center justify-center overflow-hidden puffy-shadow border border-brand-clay/5 group-hover:scale-105 transition-transform duration-300`}>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain transition-transform group-hover:rotate-6 duration-300" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="font-display text-sm font-bold text-brand-clay group-hover:text-brand-clay-dark transition-colors">
                {cat.name}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Trending Now (Product Grid) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-brand-clay tracking-tight">
              Trending Now
            </h3>
            <p className="text-brand-clay/70 font-sans text-xs sm:text-sm">Our highly-rated organic favorites this week</p>
          </div>
          <button 
            onClick={() => setScreen('shop')}
            className="text-brand-clay font-display text-xs sm:text-sm font-bold hover:underline transition-all cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <div 
                key={product.id}
                className="group flex flex-col h-full bg-white rounded-2xl border border-brand-clay/5 puffy-card overflow-hidden"
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
                  
                  {/* Favorite Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white active:scale-90 shadow-sm ${
                      isFav ? 'text-red-500' : 'text-brand-clay/50 hover:text-red-500'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={isFav ? 'currentColor' : 'none'} />
                  </button>

                  {/* Rating Tag */}
                  {product.rating && (
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-[11px] font-bold text-brand-clay font-sans">{product.rating}</span>
                    </div>
                  )}
                </div>

                {/* Info Area */}
                <div className="p-4 flex flex-col flex-grow">
                  <h4 
                    onClick={() => handleProductClick(product.id)}
                    className="font-display text-sm font-bold text-brand-clay line-clamp-1 hover:text-brand-clay-dark cursor-pointer transition-colors"
                  >
                    {product.name}
                  </h4>
                  <p className="text-xs text-brand-clay/60 mb-3 mt-1 uppercase tracking-tight">{product.colorName}</p>
                  
                  <div className="mt-auto flex justify-between items-center pt-2 border-t border-brand-clay/5">
                    <span className="font-display font-extrabold text-brand-clay text-base">
                      ${product.price.toFixed(2)}
                    </span>
                    <button 
                      onClick={() => handleProductClick(product.id)}
                      className="text-xs font-display font-bold text-brand-clay hover:text-brand-clay-dark bg-brand-peach/30 px-3 py-1.5 rounded-full hover:bg-brand-peach/50 transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Newsletter Signup Section (Puffy Input) */}
      <section className="px-4 sm:px-8 max-w-[1200px] mx-auto">
        <div className="bg-brand-peach rounded-3xl p-8 sm:p-12 text-center puffy-shadow border border-brand-clay/10 space-y-6 relative overflow-hidden">
          {/* Subtle decorative circles for puff styling */}
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-brand-clay/5 blur-2xl pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-peach-dark">
              Join the Malow Club
            </h3>
            <p className="max-w-md mx-auto text-brand-peach-dark/80 font-sans text-sm sm:text-base leading-relaxed">
              Get 15% off your first organic order and stay in sync with our fluffiest new releases.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto relative z-10">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow rounded-full border-2 border-brand-clay/15 bg-brand-cream/90 px-6 py-4 text-brand-clay placeholder-brand-clay/50 font-sans focus:outline-none focus:border-brand-clay text-sm shadow-sm inner-sunken"
              placeholder="Your email address"
              required
              disabled={subscribed}
            />
            <button 
              type="submit"
              disabled={subscribed}
              className={`px-8 py-4 rounded-full font-display font-bold text-sm shadow-md flex items-center justify-center gap-2 select-none min-w-[130px] transition-all duration-300 ${
                subscribed 
                  ? 'bg-brand-mint-dark text-white' 
                  : 'bg-brand-clay text-white hover:bg-brand-clay-dark hover:shadow-lg active:scale-95'
              }`}
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4 animate-bounce" />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
