import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, UserPlus, LogOut, Package, Gift, ShieldCheck, ShoppingBag, Eye, EyeOff } from 'lucide-react';
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

  // Mock Orders generated from actual products in catalog
  const mockOrders = [
    {
      id: 'ML-84920',
      date: 'July 8, 2026',
      status: 'Shipped (In Transit)',
      statusColor: 'text-amber-600 bg-amber-50 border-amber-200/50',
      total: 28.50,
      items: [
        { product: PRODUCTS[0], quantity: 1, size: '6-12 Months' },
        { product: PRODUCTS[4], quantity: 1, size: 'One Size' }
      ]
    },
    {
      id: 'ML-79102',
      date: 'June 22, 2026',
      status: 'Delivered',
      statusColor: 'text-brand-mint-dark bg-brand-mint/40 border-brand-mint-dark/10',
      total: 39.00,
      items: [
        { product: PRODUCTS[2], quantity: 2, size: '3-6 Months' },
        { product: PRODUCTS[3], quantity: 1, size: '0-3 Months' }
      ]
    }
  ];

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
                /* LOGGED IN VIEW */
                <div className="space-y-6 animate-fadeIn">
                  {/* Profile Header */}
                  <div className="bg-white rounded-2xl p-5 border border-brand-clay/5 flex items-center gap-4 shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-brand-lavender text-brand-clay-dark flex items-center justify-center font-display font-black text-2xl uppercase border-2 border-white shadow-md">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display font-black text-brand-clay text-lg">
                        {user.name}
                      </h4>
                      <p className="text-xs text-brand-clay/60 font-sans">{user.email}</p>
                      <div className="flex items-center gap-1 mt-1 text-brand-mint-dark bg-brand-mint/40 px-2 py-0.5 rounded-full text-[10px] font-bold border border-brand-mint-dark/10 w-fit">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>VIP Parent Member</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Signal / Perk */}
                  <div className="bg-brand-mint/25 border border-brand-mint-dark/5 p-4 rounded-2xl flex items-start gap-3">
                    <span className="text-xl">🌿</span>
                    <div className="space-y-0.5">
                      <p className="font-display font-extrabold text-brand-mint-dark text-xs uppercase tracking-wider">
                        Cuddle Perks Active
                      </p>
                      <p className="text-xs text-brand-clay/80 font-sans leading-relaxed">
                        You are unlocking free shipping, eco-rewards, and early previews of seasonal collections.
                      </p>
                    </div>
                  </div>

                  {/* Order History */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 border-b border-brand-clay/5 pb-2">
                      <Package className="w-4 h-4 text-brand-clay/60" />
                      <h5 className="font-display font-extrabold text-brand-clay text-sm uppercase tracking-wide">
                        My Order History
                      </h5>
                    </div>

                    <div className="space-y-4">
                      {mockOrders.map((order) => (
                        <div
                          key={order.id}
                          className="bg-white border border-brand-clay/5 rounded-2xl p-4 shadow-sm space-y-3"
                        >
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-mono font-bold text-brand-clay">{order.id}</span>
                            <span className="text-brand-clay/50 font-sans">{order.date}</span>
                          </div>

                          {/* Order Products Preview */}
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex gap-2.5 items-center bg-brand-cream/40 p-1.5 rounded-xl border border-brand-clay/5">
                                <img
                                  src={item.product?.image}
                                  alt={item.product?.name}
                                  className="w-10 h-12 object-cover rounded-lg bg-brand-beige"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="flex-grow">
                                  <p className="text-xs font-bold text-brand-clay truncate max-w-[200px]">
                                    {item.product?.name}
                                  </p>
                                  <p className="text-[10px] text-brand-clay/60 font-sans">
                                    Size: {item.size} • Qty: {item.quantity}
                                  </p>
                                </div>
                                <span className="text-xs font-display font-bold text-brand-clay pr-2">
                                  ${(item.product?.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-brand-clay/5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${order.statusColor}`}>
                              {order.status}
                            </span>
                            <span className="text-xs font-display font-black text-brand-clay">
                              Total: ${order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
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
