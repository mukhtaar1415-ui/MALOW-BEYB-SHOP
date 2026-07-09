import { ShoppingBag, Menu, Sparkles, User, Heart, Truck } from 'lucide-react';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  cartCount: number;
  favoritesCount: number;
  user: { name: string; email: string } | null;
  onAccountClick: () => void;
}

export default function Header({ 
  currentScreen, 
  setScreen, 
  cartCount,
  favoritesCount,
  user,
  onAccountClick
}: HeaderProps) {
  return (
    <header className="w-full z-50">
      {/* The Cuddle Bar (Trust Signals) */}
      <div className="bg-brand-mint text-brand-mint-dark py-2 px-4 text-center select-none overflow-hidden border-b border-brand-mint-dark/5">
        <div className="flex justify-center items-center gap-2 font-display text-xs font-bold tracking-wider uppercase">
          <Sparkles className="w-4 h-4 animate-pulse text-brand-mint-dark" />
          <span>Free Shipping on orders over $50 • 100% Certified Organic Fabrics</span>
          <Sparkles className="w-4 h-4 animate-pulse text-brand-mint-dark" />
        </div>
      </div>

      {/* Main Top App Bar */}
      <div className="sticky top-0 bg-brand-cream/95 backdrop-blur-md shadow-[0_10px_30px_rgba(115,89,69,0.04)] border-b border-brand-clay/5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
          
          {/* Menu Button */}
          <button 
            onClick={() => setScreen('shop')}
            className="p-2.5 rounded-full text-brand-clay hover:bg-brand-peach/20 active:scale-95 transition-all duration-200 group"
            title="Browse Shop"
          >
            <Menu className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </button>

          {/* Centered Brand Title */}
          <button 
            onClick={() => setScreen('home')}
            className="flex flex-col items-center group cursor-pointer focus:outline-none"
          >
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-clay group-hover:opacity-90 active:scale-98 transition-all">
              MALOW BEYB SHOP
            </h1>
          </button>

          {/* Right Action Icons Group */}
          <div className="flex items-center gap-2">
            {/* Account Profile Button */}
            <button 
              onClick={onAccountClick}
              className="p-2 bg-white/40 hover:bg-brand-peach/20 border border-brand-clay/10 rounded-full text-brand-clay active:scale-95 transition-all duration-200 flex items-center gap-1.5 group font-sans text-xs font-bold shadow-sm"
              title={user ? `Profile: ${user.name}` : "Log In"}
            >
              {user ? (
                <div className="w-6 h-6 rounded-full bg-brand-lavender text-brand-clay-dark flex items-center justify-center font-display font-black text-xs uppercase shadow-inner border border-brand-clay/10">
                  {user.name.charAt(0)}
                </div>
              ) : (
                <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
              <span className="hidden sm:inline-block max-w-[80px] truncate pr-1">
                {user ? user.name.split(' ')[0] : 'Log In'}
              </span>
            </button>

            {/* Order Tracking Button */}
            <button 
              onClick={() => setScreen('track')}
              className={`relative p-2.5 rounded-full hover:bg-brand-peach/20 active:scale-95 transition-all duration-200 group ${
                currentScreen === 'track' ? 'text-brand-clay font-bold bg-brand-peach/20' : 'text-brand-clay'
              }`}
              title="Track Order"
            >
              <Truck className="w-6 h-6 group-hover:scale-105 transition-transform" />
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={() => setScreen('wishlist')}
              className={`relative p-2.5 rounded-full hover:bg-brand-peach/20 active:scale-95 transition-all duration-200 group ${
                currentScreen === 'wishlist' ? 'text-brand-clay font-bold bg-brand-peach/20' : 'text-brand-clay'
              }`}
              title="View Wishlist"
            >
              <Heart className={`w-6 h-6 group-hover:scale-105 transition-transform ${favoritesCount > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-peach-dark text-brand-clay text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button 
              onClick={() => setScreen('cart')}
              className="relative p-2.5 rounded-full text-brand-clay hover:bg-brand-peach/20 active:scale-95 transition-all duration-200 group"
              title="View Basket"
            >
              <ShoppingBag className="w-6 h-6 group-hover:scale-105 transition-transform" />
              
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-mint-dark text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
