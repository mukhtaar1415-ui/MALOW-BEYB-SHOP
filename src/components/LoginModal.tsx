import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, UserPlus, LogOut, Package, Gift, ShieldCheck, ShoppingBag, Eye, EyeOff, User, Calendar } from 'lucide-react';
import { Product, SimulatedEmail } from '../types';
import { PRODUCTS } from '../data';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string } | null;
  onLogin: (userData: { name: string; email: string }) => void;
  onLogout: () => void;
  triggerSimulatedEmail: (email: SimulatedEmail) => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout,
  triggerSimulatedEmail
}: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Logged in user states
  const [loggedInTab, setLoggedInTab] = useState<'profile' | 'orders'>('profile');
  const [localOrders, setLocalOrders] = useState<any[]>([]);

  // Load/seed orders from localStorage
  const getOrdersFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem('malow_placed_orders');
      if (stored) {
        return JSON.parse(stored);
      }
      
      // Seed order history with realistic completed purchases if empty
      const seedOrders = [
        {
          orderId: 'INV-2026-84920',
          fullName: user?.name || 'Sarah Jenkins',
          shippingAddress: '123 Cozy Nursery Ln, Cloud City, CA 90210',
          items: [
            {
              name: PRODUCTS[0].name,
              price: PRODUCTS[0].price,
              quantity: 1,
              size: '6-12 Months',
              color: PRODUCTS[0].colorName,
              image: PRODUCTS[0].image
            },
            {
              name: PRODUCTS[4]?.name || 'Quilted Cloud Jacket',
              price: PRODUCTS[4]?.price || 15.00,
              quantity: 1,
              size: '6-12 Months',
              color: PRODUCTS[4]?.colorName || 'Caramel',
              image: PRODUCTS[4]?.image || ''
            }
          ],
          subtotal: PRODUCTS[0].price + (PRODUCTS[4]?.price || 15.00),
          shippingCost: 0,
          taxCost: 1.96,
          totalCost: PRODUCTS[0].price + (PRODUCTS[4]?.price || 15.00) + 1.96,
          paymentMethod: 'Secure Credit Card',
          date: 'July 8, 2026',
          status: 'Shipped',
          timeline: [
            { status: 'Order Placed', date: 'July 8', time: '10:14 AM', completed: true, description: 'Confirmation email sent, payment secured.' },
            { status: 'Processing', date: 'July 8', time: '11:30 AM', completed: true, description: 'Selecting and preparing premium organic fabrics with absolute care.' },
            { status: 'Shipped', date: 'July 9', time: '08:45 AM', completed: true, description: 'Dispatched via Eco-Express courier.' },
            { status: 'Delivered', date: '', time: '', completed: false, description: 'Arrived safely at your doorstep.' }
          ]
        },
        {
          orderId: 'INV-2026-79102',
          fullName: user?.name || 'Sarah Jenkins',
          shippingAddress: '123 Cozy Nursery Ln, Cloud City, CA 90210',
          items: [
            {
              name: PRODUCTS[2].name,
              price: PRODUCTS[2].price,
              quantity: 2,
              size: '3-6 Months',
              color: PRODUCTS[2].colorName,
              image: PRODUCTS[2].image
            },
            {
              name: PRODUCTS[3].name,
              price: PRODUCTS[3].price,
              quantity: 1,
              size: '0-3 Months',
              color: PRODUCTS[3].colorName,
              image: PRODUCTS[3].image
            }
          ],
          subtotal: PRODUCTS[2].price * 2 + PRODUCTS[3].price,
          shippingCost: 0,
          taxCost: 3.24,
          totalCost: PRODUCTS[2].price * 2 + PRODUCTS[3].price + 3.24,
          paymentMethod: 'Direct Bank Clearing',
          date: 'June 22, 2026',
          status: 'Delivered',
          timeline: [
            { status: 'Order Placed', date: 'June 22', time: '02:15 PM', completed: true, description: 'Bank transfer received.' },
            { status: 'Processing', date: 'June 22', time: '03:40 PM', completed: true, description: 'Certified GOTS fabrics selected.' },
            { status: 'Shipped', date: 'June 23', time: '09:00 AM', completed: true, description: 'Dispatched with Carbon-Neutral post.' },
            { status: 'Delivered', date: 'June 25', time: '04:10 PM', completed: true, description: 'Successfully handed over to parent.' }
          ]
        }
      ];
      localStorage.setItem('malow_placed_orders', JSON.stringify(seedOrders));
      return seedOrders;
    } catch (err) {
      console.error('Failed to load orders from local storage', err);
      return [];
    }
  };

  // Synchronize orders whenever modal is open and user is logged in
  useEffect(() => {
    if (user && isOpen) {
      setLocalOrders(getOrdersFromLocalStorage());
    }
  }, [user, isOpen]);

  // Clean form errors on tab switch
  useEffect(() => {
    setError('');
    setSuccessMsg('');
  }, [activeTab, isOpen]);

  const handleDemoFill = () => {
    setEmail('organic.parent@cuddle.com');
    setPassword('sweetbaby123');
    setName('Sarah Jenkins');
    setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (activeTab === 'signup' && !name.trim()) {
      setError('Please provide your name.');
      return;
    }

    if (activeTab === 'login') {
      // Login success simulation
      const finalName = name.trim() || email.split('@')[0];
      const displayName = email === 'organic.parent@cuddle.com' ? 'Sarah Jenkins' : finalName;
      
      setSuccessMsg('Welcome back to the Cuddle Club! ✨');
      setTimeout(() => {
        onLogin({ name: displayName, email });
        onClose();
      }, 1000);
    } else {
      // Signup success simulation
      const customerName = name.trim();
      const customerEmail = email.trim();
      
      setSuccessMsg('Account created successfully! Welcome to the Cuddle Club! 🌱');
      
      // Dispatch simulated registration email immediately
      const welcomeEmail: SimulatedEmail = {
        id: 'MAIL-' + Math.floor(Math.random() * 90000 + 10000),
        sender: 'welcome@malowbeyb.com',
        recipient: customerEmail,
        subject: 'Welcome to Cuddle Club! 🌱 Your organic parent perk is active',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'welcome',
        bodyText: `Welcome to the Cuddle Club, ${customerName}!\n\nWe are absolutely delighted to welcome you to our gentle parent community. Your account has been securely created under: ${customerEmail}.\n\nHere is your exclusive club welcome benefit:\nPromo Code: WELCOME15COZY\nEnjoy 15% off your next purchase of double-layered, GOTS-certified organic cotton outfits.\n\nWarmly,\nMalow Childrenswear Customer Care`,
        bodyHtml: `
          <div style="color: #4a3e3d; line-height: 1.6; font-size: 13px;">
            <div style="text-align: center; border-bottom: 2px solid #ecd8c9; padding-bottom: 12px; margin-bottom: 16px;">
              <span style="font-size: 24px; font-weight: bold; color: #4a3e3d; font-family: Georgia, serif;">malow<span style="color: #cfb2a9;">.</span></span>
              <p style="font-size: 9px; text-transform: uppercase; letter-spacing: 0.15em; color: #a18a80; margin: 3px 0 0 0;">Cuddle Club Registration</p>
            </div>
            <h3 style="color: #4a3e3d; font-size: 16px; font-weight: bold; margin-top: 0; font-family: Georgia, serif;">Welcome to Cuddle Club! 🌱</h3>
            <p>Hi <strong>${customerName}</strong>,</p>
            <p>Thank you for creating your VIP parent account! We are so proud to support your nursery journey with 100% GOTS certified organic materials, ethically made by gentle hands.</p>
            
            <div style="background-color: #faf4ef; border: 1px dashed #cfb2a9; border-radius: 12px; padding: 15px; text-align: center; margin: 16px 0;">
              <span style="font-size: 9px; text-transform: uppercase; font-weight: bold; color: #a18a80; display: block; margin-bottom: 4px;">Exclusive Member Gift Code</span>
              <strong style="font-size: 18px; color: #4a3e3d; font-family: monospace; display: block; margin-bottom: 4px; letter-spacing: 1px;">WELCOME15COZY</strong>
              <span style="font-size: 11px; color: #7a6e65;">Enjoy 15% off your next purchase of luxurious organic sets.</span>
            </div>
            
            <p>Your member-exclusive benefits are now fully active:</p>
            <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #5a4e4d;">
              <li>Free eco-friendly courier shipping on all orders over $50</li>
              <li>Early access to limited autumn &amp; spring capsule drops</li>
              <li>Gentle 30-day wear-and-wash trial returns</li>
            </ul>

            <p style="font-size: 11px; color: #a18a80; border-top: 1px solid #f6efe9; padding-top: 12px; margin-top: 20px; text-align: center;">
              You are receiving this email because you registered at malow.co using <strong style="color: #4a3e3d;">${customerEmail}</strong>.<br/>
              🌿 Crafted for delicate skin.
            </p>
          </div>
        `
      };
      
      triggerSimulatedEmail(welcomeEmail);

      setTimeout(() => {
        onLogin({ name: customerName, email: customerEmail });
        onClose();
      }, 1200);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-150 flex items-center justify-center p-4">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-clay/35 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative bg-brand-cream border border-brand-clay/10 w-full max-w-md rounded-3xl puffy-shadow overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header decor */}
            <div className="bg-brand-peach/20 px-6 py-5 flex justify-between items-center border-b border-brand-clay/5 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-brand-lavender rounded-full text-brand-clay-dark shadow-sm">
                  <Gift className="w-4 h-4" />
                </span>
                <span className="font-display font-black text-brand-clay uppercase tracking-widest text-xs">
                  Cuddle Club Account
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white text-brand-clay/60 hover:text-brand-clay active:scale-90 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="overflow-y-auto p-6 md:p-8 space-y-6">
              {user ? (
                /* LOGGED IN VIEW WITH ACCOUNT TABS */
                <div className="space-y-6 animate-fadeIn">
                  {/* Profile Header */}
                  <div className="bg-white rounded-2xl p-5 border border-brand-clay/5 flex items-center gap-4 shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-brand-lavender text-brand-clay-dark flex items-center justify-center font-display font-black text-2xl uppercase border-2 border-white shadow-md flex-shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-grow">
                      <h4 className="font-display font-black text-brand-clay text-lg truncate">
                        {user.name}
                      </h4>
                      <p className="text-xs text-brand-clay/60 font-sans truncate">{user.email}</p>
                      <div className="flex items-center gap-1 mt-1 text-brand-mint-dark bg-brand-mint/40 px-2 py-0.5 rounded-full text-[10px] font-bold border border-brand-mint-dark/10 w-fit">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>VIP Parent Member</span>
                      </div>
                    </div>
                  </div>

                  {/* Account Tabs */}
                  <div className="flex bg-white/60 p-1 rounded-full border border-brand-clay/5 shadow-inner">
                    <button
                      type="button"
                      onClick={() => setLoggedInTab('profile')}
                      className={`flex-grow py-2 rounded-full font-display text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        loggedInTab === 'profile'
                          ? 'bg-brand-clay text-white shadow-sm'
                          : 'text-brand-clay/60 hover:text-brand-clay'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>My Profile</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoggedInTab('orders')}
                      className={`flex-grow py-2 rounded-full font-display text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        loggedInTab === 'orders'
                          ? 'bg-brand-clay text-white shadow-sm'
                          : 'text-brand-clay/60 hover:text-brand-clay'
                      }`}
                    >
                      <Package className="w-3.5 h-3.5" />
                      <span>Order History ({localOrders.length})</span>
                    </button>
                  </div>

                  {loggedInTab === 'profile' ? (
                    /* TAB 1: PROFILE AND PERKS DETAILS */
                    <div className="space-y-5 animate-fadeIn">
                      {/* Trust Signal / Perk */}
                      <div className="bg-brand-mint/15 border border-brand-mint-dark/5 p-4.5 rounded-2xl flex items-start gap-3 shadow-sm">
                        <span className="text-xl mt-0.5">🌿</span>
                        <div className="space-y-1">
                          <p className="font-display font-extrabold text-brand-mint-dark text-xs uppercase tracking-wider">
                            Cuddle Perks Active
                          </p>
                          <p className="text-xs text-brand-clay/80 font-sans leading-relaxed">
                            Your parent account unlocks custom eco-rewards, early seasonal previews, and carbon-neutral shipping on every boutique order.
                          </p>
                        </div>
                      </div>

                      {/* Account details panel */}
                      <div className="bg-white border border-brand-clay/5 rounded-2xl p-5 shadow-sm space-y-4">
                        <h5 className="font-display font-extrabold text-brand-clay text-xs uppercase tracking-wider border-b border-brand-clay/5 pb-2">
                          Account Profile
                        </h5>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs font-sans text-brand-clay">
                          <div>
                            <span className="text-brand-clay/40 block text-[10px] uppercase font-bold tracking-wide">Parent Name</span>
                            <span className="font-semibold text-brand-clay-dark">{user.name}</span>
                          </div>
                          <div>
                            <span className="text-brand-clay/40 block text-[10px] uppercase font-bold tracking-wide">Verified Email</span>
                            <span className="font-semibold text-brand-clay-dark truncate block max-w-[155px]" title={user.email}>{user.email}</span>
                          </div>
                          <div>
                            <span className="text-brand-clay/40 block text-[10px] uppercase font-bold tracking-wide">Membership</span>
                            <span className="font-bold text-brand-mint-dark flex items-center gap-1 mt-0.5">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              VIP Parent Member
                            </span>
                          </div>
                          <div>
                            <span className="text-brand-clay/40 block text-[10px] uppercase font-bold tracking-wide">Join Date</span>
                            <span className="font-semibold text-brand-clay-dark flex items-center gap-1 mt-0.5">
                              <Calendar className="w-3.5 h-3.5 text-brand-clay/40" />
                              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* TAB 2: ORDER HISTORY LIST (RETRIEVED FROM SIMULATED LOCAL STORAGE STATE) */
                    <div className="space-y-4 animate-fadeIn">
                      <div className="flex items-center gap-1.5 border-b border-brand-clay/5 pb-2">
                        <Package className="w-4 h-4 text-brand-clay/60" />
                        <h5 className="font-display font-extrabold text-brand-clay text-xs uppercase tracking-wide">
                          Completed Purchases History
                        </h5>
                      </div>

                      {localOrders.length === 0 ? (
                        <div className="text-center py-10 bg-white border border-brand-clay/5 rounded-3xl space-y-2 shadow-sm">
                          <Package className="w-8 h-8 text-brand-clay/20 mx-auto animate-pulse" />
                          <p className="font-display font-bold text-brand-clay text-sm">No purchases logged yet</p>
                          <p className="text-xs text-brand-clay/50 font-sans max-w-[240px] mx-auto">Complete a checkout in your basket to see it logged in this history.</p>
                        </div>
                      ) : (
                        <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                          {localOrders.map((order) => {
                            const isDelivered = order.status?.toLowerCase() === 'delivered';
                            const isShipped = order.status?.toLowerCase() === 'shipped';
                            const statusColor = isDelivered
                              ? 'text-brand-mint-dark bg-brand-mint/40 border-brand-mint-dark/10'
                              : isShipped
                                ? 'text-amber-600 bg-amber-50 border-amber-200/50'
                                : 'text-brand-clay/70 bg-brand-peach/15 border-brand-clay/10';

                            return (
                              <div
                                key={order.orderId}
                                className="bg-white border border-brand-clay/5 rounded-2xl p-4 shadow-sm space-y-3 hover:border-brand-clay/15 transition-all"
                              >
                                <div className="flex justify-between items-center text-xs">
                                  <div className="flex flex-col">
                                    <span className="font-mono font-black text-brand-clay-dark">{order.orderId}</span>
                                    <span className="text-[10px] text-brand-clay/40 font-sans mt-0.5">{order.date}</span>
                                  </div>
                                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold border uppercase tracking-wider ${statusColor}`}>
                                    {order.status || 'Processing'}
                                  </span>
                                </div>

                                {/* Order Products Preview */}
                                <div className="space-y-2 border-t border-b border-brand-clay/5 py-2.5">
                                  {order.items?.map((item: any, idx: number) => (
                                    <div key={idx} className="flex gap-2.5 items-center bg-brand-cream/40 p-1.5 rounded-xl border border-brand-clay/5">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-10 h-12 object-cover rounded-lg bg-brand-beige flex-shrink-0"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="flex-grow min-w-0">
                                        <p className="text-xs font-bold text-brand-clay truncate">
                                          {item.name}
                                        </p>
                                        <p className="text-[10px] text-brand-clay/50 font-sans">
                                          Size: {item.size} • Qty: {item.quantity}
                                        </p>
                                      </div>
                                      <span className="text-xs font-display font-bold text-brand-clay flex-shrink-0 pr-1">
                                        ${(item.price * item.quantity).toFixed(2)}
                                      </span>
                                    </div>
                                  ))}
                                </div>

                                <div className="flex justify-between items-center pt-0.5 text-xs">
                                  <span className="text-[10px] text-brand-clay/40 font-sans">
                                    Paid: <span className="font-semibold text-brand-clay/60">{order.paymentMethod || 'Credit Card'}</span>
                                  </span>
                                  <span className="font-display font-black text-brand-clay">
                                    Total: ${order.totalCost ? order.totalCost.toFixed(2) : (order.total ? order.total.toFixed(2) : '0.00')}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Logout Button */}
                  <button
                    type="button"
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="w-full bg-white hover:bg-brand-peach/10 border border-brand-clay/15 text-red-500 font-display font-bold text-sm py-4 rounded-full flex items-center justify-center gap-2 transition-all hover:border-red-200 cursor-pointer active:scale-98"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out Account</span>
                  </button>
                </div>
              ) : (
                /* AUTHENTICATION FORM VIEW */
                <div className="space-y-6">
                  {/* Tab Selector */}
                  <div className="flex bg-white/60 p-1.5 rounded-full border border-brand-clay/5">
                    <button
                      onClick={() => setActiveTab('login')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        activeTab === 'login'
                          ? 'bg-brand-clay text-white shadow-md'
                          : 'text-brand-clay/60 hover:text-brand-clay'
                      }`}
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Log In</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('signup')}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        activeTab === 'signup'
                          ? 'bg-brand-clay text-white shadow-md'
                          : 'text-brand-clay/60 hover:text-brand-clay'
                      }`}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Sign Up</span>
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {activeTab === 'signup' && (
                      <div className="space-y-1.5">
                        <label className="text-xs font-display font-bold text-brand-clay/80 uppercase tracking-wide">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Mama or Papa Jenkins"
                          className="w-full bg-white border-2 border-brand-clay/5 focus:border-brand-peach rounded-2xl px-5 py-3.5 text-sm text-brand-clay placeholder-brand-clay/30 outline-none transition-colors font-sans shadow-sm"
                        />
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-xs font-display font-bold text-brand-clay/80 uppercase tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="parent@cuddle.com"
                        className="w-full bg-white border-2 border-brand-clay/5 focus:border-brand-peach rounded-2xl px-5 py-3.5 text-sm text-brand-clay placeholder-brand-clay/30 outline-none transition-colors font-sans shadow-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-display font-bold text-brand-clay/80 uppercase tracking-wide">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-white border-2 border-brand-clay/5 focus:border-brand-peach rounded-2xl pl-5 pr-11 py-3.5 text-sm text-brand-clay placeholder-brand-clay/30 outline-none transition-colors font-sans shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-clay/40 hover:text-brand-clay cursor-pointer focus:outline-none"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Alert Box */}
                    {error && (
                      <div className="bg-red-50 border border-red-200/50 text-red-600 px-4 py-3 rounded-2xl text-xs font-sans font-medium">
                        ⚠️ {error}
                      </div>
                    )}

                    {successMsg && (
                      <div className="bg-brand-mint border border-brand-mint-dark/10 text-brand-mint-dark px-4 py-3 rounded-2xl text-xs font-sans font-bold">
                        🎉 {successMsg}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!!successMsg}
                      className="w-full bg-brand-clay hover:bg-brand-clay-dark text-white font-display font-bold text-sm py-4 rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>{activeTab === 'login' ? 'Enter Cuddle Club' : 'Create Cuddle Account'}</span>
                    </button>
                  </form>

                  {/* Demo Login Quick Filler */}
                  <div className="bg-brand-peach/10 border border-brand-peach/20 rounded-2xl p-4 space-y-2">
                    <p className="text-[11px] font-bold text-brand-clay/70 font-sans tracking-wide uppercase">
                      💡 Quick Demo Access
                    </p>
                    <p className="text-[11px] text-brand-clay/60 leading-relaxed font-sans">
                      Want to instantly test the vip customer panel, orders status track, and member pricing?
                    </p>
                    <button
                      type="button"
                      onClick={handleDemoFill}
                      className="text-xs font-display font-bold text-brand-clay hover:text-brand-clay-dark bg-white border border-brand-clay/15 hover:border-brand-clay rounded-full px-3.5 py-1.5 transition-colors cursor-pointer"
                    >
                      Fill Demo Credentials
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
