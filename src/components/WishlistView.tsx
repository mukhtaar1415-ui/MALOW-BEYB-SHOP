import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, ArrowRight, Trash2, ArrowLeft, Sparkles, Check, AlertCircle } from 'lucide-react';
import { Product, ScreenType } from '../types';
import { PRODUCTS } from '../data';

interface WishlistViewProps {
  setScreen: (screen: ScreenType) => void;
  setSelectedProductId: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  addToCart: (product: Product, size: string, color: string) => void;
}

export default function WishlistView({
  setScreen,
  setSelectedProductId,
  favorites,
  toggleFavorite,
  addToCart
}: WishlistViewProps) {
  // Get favorited product objects
  const favoritedProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  // Store selected sizes per product ID
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  
  // Track successful moves for notifications
  const [movedMessage, setMovedMessage] = useState<{ id: string; text: string } | null>(null);

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setScreen('detail');
  };

  const getActiveSize = (product: Product) => {
    return selectedSizes[product.id] || (product.sizes.includes('One Size') ? 'One Size' : product.sizes[0]);
  };

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleMoveToCart = (product: Product) => {
    const size = getActiveSize(product);
    
    // 1. Add to cart
    addToCart(product, size, product.colorName);
    
    // 2. Remove from favorites (move action)
    toggleFavorite(product.id);

    // 3. Set toast notification
    setMovedMessage({
      id: product.id,
      text: `"${product.name}" (${size}) was moved to your basket! 🌿`
    });

    setTimeout(() => {
      setMovedMessage(null);
    }, 4000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8 md:py-12 space-y-8 select-none">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {movedMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-brand-clay text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border border-brand-peach/20"
          >
            <div className="w-8 h-8 rounded-full bg-brand-mint/20 text-brand-mint flex items-center justify-center">
              <Check className="w-4 h-4 text-brand-mint" />
            </div>
            <p className="font-sans text-xs font-bold leading-tight">{movedMessage.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-sans text-brand-clay/60">
        <button 
          onClick={() => setScreen('home')} 
          className="hover:text-brand-clay transition-colors cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <button 
          onClick={() => setScreen('shop')} 
          className="hover:text-brand-clay transition-colors cursor-pointer"
        >
          Boutique Shop
        </button>
        <span>/</span>
        <span className="text-brand-clay font-bold">My Wishlist</span>
      </div>

      {/* Header Block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-clay/10 pb-6">
        <div className="space-y-1">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-clay tracking-tight">
            My Wishlist
          </h2>
          <p className="text-brand-clay/70 font-sans text-xs">
            Save items for future playdates, size them up, or move them straight to your basket.
          </p>
        </div>
        <button 
          onClick={() => setScreen('shop')}
          className="flex items-center gap-2 bg-white border border-brand-clay/15 text-brand-clay px-5 py-2.5 rounded-full text-xs font-sans font-bold shadow-sm hover:bg-brand-peach/15 hover:shadow transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {favoritedProducts.length === 0 ? (
        /* ELEGANT EMPTY STATE */
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/40 border border-brand-clay/10 rounded-3xl p-10 sm:p-16 text-center max-w-lg mx-auto space-y-6 shadow-sm"
        >
          <div className="w-16 h-16 bg-brand-peach/10 text-brand-peach border border-brand-peach/20 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-brand-clay">Your Wishlist is Empty</h3>
            <p className="text-xs text-brand-clay/60 max-w-xs mx-auto leading-relaxed">
              Whenever you browse our 100% GOTS certified organic garments, tap the heart button to save items here!
            </p>
          </div>
          <button 
            onClick={() => setScreen('shop')}
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full text-white font-display font-bold text-xs bg-brand-clay hover:bg-brand-clay-dark active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <span>Browse Organic Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      ) : (
        /* WISH-LIST GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {favoritedProducts.map((product) => {
            const activeSize = getActiveSize(product);
            const isOneSize = product.sizes.includes('One Size');
            
            return (
              <motion.div 
                key={product.id}
                layoutId={`wishlist-card-${product.id}`}
                className="bg-white border border-brand-clay/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group relative"
              >
                {/* Remove heart button overlay */}
                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-brand-peach hover:scale-110 active:scale-90 shadow-md border border-brand-clay/5 transition-all cursor-pointer"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-4 h-4 text-brand-clay/60 hover:text-red-500 transition-colors" />
                </button>

                {/* Image Section */}
                <div 
                  onClick={() => handleProductClick(product.id)}
                  className="aspect-[4/5] bg-brand-beige overflow-hidden relative cursor-pointer group"
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-brand-mint text-brand-mint-dark text-[9px] font-sans font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm border border-brand-mint-dark/5">
                      New
                    </span>
                  )}
                </div>

                {/* Description & Selection Card Info */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-start gap-2">
                      <h4 
                        onClick={() => handleProductClick(product.id)}
                        className="font-display font-bold text-brand-clay text-base hover:text-brand-clay-dark cursor-pointer transition-colors line-clamp-1"
                      >
                        {product.name}
                      </h4>
                      <span className="font-display font-black text-brand-clay text-base flex-shrink-0">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-[10px] font-sans text-brand-clay/50 flex items-center gap-1.5">
                      <span 
                        className="inline-block w-2.5 h-2.5 rounded-full border border-brand-clay/10 shadow-inner" 
                        style={{ backgroundColor: product.colorHex }}
                      />
                      <span>{product.colorName} • GOTS Certified</span>
                    </p>
                  </div>

                  {/* Size Selector Section */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-sans font-black text-brand-clay/40 uppercase tracking-widest block">
                      {isOneSize ? 'Sizing Option' : 'Select Size'}
                    </span>
                    
                    {isOneSize ? (
                      <div className="inline-block bg-brand-beige/50 border border-brand-clay/10 rounded-lg px-3 py-1.5 text-[11px] font-sans font-bold text-brand-clay/80">
                        One Size Fits All
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => handleSizeSelect(product.id, size)}
                            className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-sans font-bold border transition-all cursor-pointer text-center ${
                              activeSize === size
                                ? 'bg-brand-clay text-white border-brand-clay shadow-sm'
                                : 'bg-white text-brand-clay/60 border-brand-clay/15 hover:border-brand-clay/40'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Direct Add to Cart Action */}
                  <button 
                    onClick={() => handleMoveToCart(product)}
                    className="w-full py-3 rounded-xl text-white font-display font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md puffy-btn-secondary cursor-pointer transition-all active:scale-98"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Basket</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Info Trust Signal */}
      {favoritedProducts.length > 0 && (
        <div className="bg-brand-mint/15 border border-brand-mint-dark/10 rounded-2xl p-4 flex items-start gap-3 max-w-2xl mx-auto">
          <Sparkles className="w-5 h-5 text-brand-mint-dark mt-0.5 flex-shrink-0" />
          <div className="space-y-0.5 text-xs text-brand-mint-dark">
            <p className="font-bold">Eco-conscious Checkout Cleared</p>
            <p className="leading-relaxed opacity-90">
              Moving items from Wishlist directly to the Basket keeps your favorite selection saved in local drafts until authorization completes. All materials are ethically crafted with 100% natural wools or organic cotton threads.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
