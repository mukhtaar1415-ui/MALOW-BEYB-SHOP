import { useState, useEffect, FormEvent } from 'react';
import { Home, Search, Heart, ShoppingBag, User, MessageSquare, X, Send, HelpCircle, Check, AlertCircle, Truck } from 'lucide-react';
import { Product, CartItem, ScreenType, SimulatedEmail } from './types';
import { ALL_PRODUCTS } from './data';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import DetailView from './components/DetailView';
import CartView from './components/CartView';
import WishlistView from './components/WishlistView';
import TrackView from './components/TrackView';
import LoginModal from './components/LoginModal';
import SimulatedEmailTray from './components/SimulatedEmailTray';

// Seed the initial basket with mockup items (Quilted Cloud Onesie, Sage Wool Booties, Botanical Swaddle)
const INITIAL_CART_ITEMS: CartItem[] = [
  {
    product: ALL_PRODUCTS.find(p => p.id === 'quilted-cloud-onesie') || ALL_PRODUCTS[4],
    size: '3-6 Months',
    color: 'Oat',
    quantity: 1
  },
  {
    product: ALL_PRODUCTS.find(p => p.id === 'sage-wool-booties') || ALL_PRODUCTS[5],
    size: 'One Size',
    color: 'Sage',
    quantity: 1
  },
  {
    product: ALL_PRODUCTS.find(p => p.id === 'botanical-swaddle') || ALL_PRODUCTS[3],
    size: 'One Size',
    color: 'Ivory Bloom',
    quantity: 1
  }
];

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('soft-mint-romper');
  const [favorites, setFavorites] = useState<string[]>(['newborn-knitted-set', 'cloud-knit-bonnet']);
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  
  // Simulated emails state
  const [emails, setEmails] = useState<SimulatedEmail[]>(() => {
    const saved = localStorage.getItem('malow_simulated_emails');
    return saved ? JSON.parse(saved) : [];
  });

  const triggerSimulatedEmail = (email: SimulatedEmail) => {
    setEmails(prev => {
      const updated = [...prev, email];
      localStorage.setItem('malow_simulated_emails', JSON.stringify(updated));
      return updated;
    });
    // Print a system developer-friendly console log as requested
    console.log(`%c📧 [SIMULATED SMTP DISPATCH] Sent to ${email.recipient} %c\nSubject: ${email.subject}\nSender: ${email.sender}\nBody Text:\n${email.bodyText}`, "color: #e28a6f; font-weight: bold; font-size: 12px; background: #faf4ef; padding: 4px 8px; border-radius: 4px;", "color: #4a3e3d; font-family: monospace;");
  };

  const clearAllEmails = () => {
    setEmails([]);
    localStorage.removeItem('malow_simulated_emails');
  };
  
  // Dialog / Chatbot states
  const [showHelpChat, setShowHelpChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Hi there! 🌸 Welcome to Malow Beyb Support. Ask me anything about our organic collection, sizing, or GOTS fabrics!' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Favorites trigger to filter shop view
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Account session state
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem('malow_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
    localStorage.setItem('malow_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('malow_user');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Favorite management
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color: string) => {
    setCart(prev => {
      // Check if item with exact same size and color already exists
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        item.size === size && 
        item.color === color
      );

      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        return [...prev, { product, size, color, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(prev => {
      const newCart = [...prev];
      newCart[index].quantity = newQty;
      return newCart;
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Chat answers for support
  const handleSendChat = (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      let botResponse = "That's a lovely question! All of our baby rompers and blankets are made from GOTS-certified organic cotton, which is double-layered for extra puffiness. Feel free to reach out to customercare@malowbeyb.com for further help!";
      
      const text = userText.toLowerCase();
      if (text.includes('gots') || text.includes('certified') || text.includes('organic') || text.includes('fabric')) {
        botResponse = "Yes! All Malow Beyb garments use GOTS (Global Organic Textile Standard) certified cotton. This guarantees they are free of harsh chemicals and designed with care for delicate newborn skin.";
      } else if (text.includes('shipping') || text.includes('delivery')) {
        botResponse = "We offer fast eco-shipping! Standard shipping is FREE on all orders over $50.00. For smaller baskets, shipping is only $4.50.";
      } else if (text.includes('size') || text.includes('fit') || text.includes('sizing')) {
        botResponse = "Our organic clothing fits true-to-size. We support 0-3 Months, 3-6 Months, and 6-12 Months. Let us know if you would like to view our full Sizing Guide dimensions!";
      } else if (text.includes('return') || text.includes('refund')) {
        botResponse = "We offer a gentle 30-day return policy! If the garment is unwashed and unworn, simply return it for a complete refund or exchange.";
      } else if (text.includes('price') || text.includes('cost')) {
        botResponse = "Every single premium item in our boutique is scaled under $15.00! We believe luxurious baby cotton should be beautifully accessible.";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  // Navigating with favorites filter on
  const handleFavoritesClick = () => {
    setShowOnlyFavorites(true);
    setScreen('shop');
    // Set a custom filter inside window for shop view to capture
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('filter-favorites'));
    }, 100);
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-clay font-sans flex flex-col antialiased selection:bg-brand-peach/40">
      
      {/* 1. Top Header & Cuddle Trust Bar */}
      <Header 
        currentScreen={screen} 
        setScreen={(scr) => {
          setScreen(scr);
          setShowOnlyFavorites(false);
        }} 
        cartCount={cartCount} 
        favoritesCount={favorites.length}
        user={user}
        onAccountClick={() => setIsLoginModalOpen(true)}
      />

      {/* 2. Main Screen Renderer */}
      <main className="flex-grow">
        {screen === 'home' && (
          <HomeView 
            setScreen={setScreen} 
            setSelectedProductId={setSelectedProductId} 
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}

        {screen === 'shop' && (
          <ShopView 
            setScreen={setScreen} 
            setSelectedProductId={setSelectedProductId} 
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
          />
        )}

        {screen === 'detail' && (
          <DetailView 
            productId={selectedProductId}
            setScreen={setScreen}
            setSelectedProductId={setSelectedProductId}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
            user={user}
          />
        )}

        {screen === 'cart' && (
          <CartView 
            cart={cart}
            setScreen={setScreen}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            triggerSimulatedEmail={triggerSimulatedEmail}
            user={user}
          />
        )}

        {screen === 'wishlist' && (
          <WishlistView 
            setScreen={setScreen}
            setSelectedProductId={setSelectedProductId}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
          />
        )}

        {screen === 'track' && (
          <TrackView 
            setScreen={setScreen}
            setSelectedProductId={setSelectedProductId}
          />
        )}
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Persistent Bottom Nav Bar (Mobile viewport specific) */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-2.5 bg-white border-t border-brand-clay/10 rounded-t-3xl z-50 shadow-[0_-10px_35px_rgba(115,89,69,0.06)] md:hidden">
        <button 
          onClick={() => {
            setScreen('home');
            setShowOnlyFavorites(false);
          }}
          className={`flex flex-col items-center justify-center p-2.5 active:scale-90 transition-all duration-300 ${
            screen === 'home' ? 'text-brand-clay font-bold scale-105' : 'text-brand-clay/50'
          }`}
        >
          <Home className="w-5 h-5" fill={screen === 'home' ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-sans font-bold mt-1">Home</span>
        </button>

        <button 
          onClick={() => {
            setScreen('shop');
            setShowOnlyFavorites(false);
          }}
          className={`flex flex-col items-center justify-center p-2.5 active:scale-90 transition-all duration-300 ${
            screen === 'shop' && !showOnlyFavorites ? 'text-brand-clay font-bold scale-105' : 'text-brand-clay/50'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-sans font-bold mt-1">Search</span>
        </button>

        <button 
          onClick={() => {
            setScreen('wishlist');
            setShowOnlyFavorites(false);
          }}
          className={`flex flex-col items-center justify-center p-2.5 active:scale-90 transition-all duration-300 ${
            screen === 'wishlist' ? 'text-brand-clay font-bold scale-105' : 'text-brand-clay/50'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5" fill={screen === 'wishlist' ? 'currentColor' : 'none'} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-brand-peach-dark text-brand-clay text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {favorites.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-sans font-bold mt-1">Wishlist</span>
        </button>

        <button 
          onClick={() => {
            setScreen('track');
            setShowOnlyFavorites(false);
          }}
          className={`flex flex-col items-center justify-center p-2.5 active:scale-90 transition-all duration-300 ${
            screen === 'track' ? 'text-brand-clay font-bold scale-105' : 'text-brand-clay/50'
          }`}
        >
          <Truck className="w-5 h-5" />
          <span className="text-[10px] font-sans font-bold mt-1">Track</span>
        </button>

        <button 
          onClick={() => {
            setIsLoginModalOpen(true);
          }}
          className={`flex flex-col items-center justify-center p-2.5 active:scale-90 transition-all duration-300 ${
            isLoginModalOpen ? 'text-brand-clay font-bold scale-105' : 'text-brand-clay/50'
          }`}
        >
          <User className="w-5 h-5" fill={user ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-sans font-bold mt-1">{user ? 'Account' : 'Log In'}</span>
        </button>

        <button 
          onClick={() => {
            setScreen('cart');
            setShowOnlyFavorites(false);
          }}
          className={`flex flex-col items-center justify-center p-2.5 active:scale-90 transition-all duration-300 ${
            screen === 'cart' ? 'text-brand-clay font-bold scale-105' : 'text-brand-clay/50'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" fill={screen === 'cart' ? 'currentColor' : 'none'} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-brand-mint-dark text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-sans font-bold mt-1">Cart</span>
        </button>
      </nav>

      {/* 5. Desktop Floating Support Chat Widget */}
      <div className="hidden md:block fixed bottom-8 right-8 z-[90]">
        {showHelpChat ? (
          <div className="w-80 h-96 bg-brand-cream border border-brand-clay/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
            
            {/* Chat Header */}
            <div className="bg-brand-clay text-white p-4 flex justify-between items-center select-none">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-peach" />
                <div>
                  <h4 className="font-display text-sm font-bold leading-none">Boutique Advisor</h4>
                  <span className="text-[10px] text-brand-peach font-sans">Online • Usually replies instantly</span>
                </div>
              </div>
              <button 
                onClick={() => setShowHelpChat(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 font-sans text-xs max-h-[250px] bg-white">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`max-w-[80%] rounded-2xl p-3 leading-relaxed ${
                    msg.sender === 'bot' 
                      ? 'bg-brand-beige text-brand-clay self-start' 
                      : 'bg-brand-clay text-white self-end ml-auto'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="p-3 border-t border-brand-clay/10 bg-brand-beige/50 flex gap-2">
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about GOTS, shipping..."
                className="flex-grow bg-white border border-brand-clay/10 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-brand-clay font-sans text-brand-clay"
              />
              <button 
                type="submit"
                className="p-2 bg-brand-clay text-white hover:bg-brand-clay-dark rounded-full transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        ) : (
          <button 
            onClick={() => setShowHelpChat(true)}
            className="puffy-btn-primary w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform cursor-pointer"
            title="Need assist?"
          >
            <MessageSquare className="w-6 h-6 text-brand-peach animate-pulse" />
          </button>
        )}
      </div>

      {/* 6. Login / Customer Account Portal Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        user={user} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
        triggerSimulatedEmail={triggerSimulatedEmail}
      />

      {/* 7. Sandbox Email Outbox Tray (Floating bottom-left) */}
      <SimulatedEmailTray 
        emails={emails} 
        onClearAll={clearAllEmails} 
      />

    </div>
  );
}
