import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, ArrowLeft, Clock, Truck, CheckCircle2, Package, 
  MapPin, Calendar, AlertCircle, ExternalLink, ShieldCheck, 
  Sparkles, RefreshCw, ChevronRight, ShoppingBag, ArrowUpRight
} from 'lucide-react';
import { ALL_PRODUCTS } from '../data';
import { ScreenType } from '../types';

interface TrackViewProps {
  setScreen: (screen: ScreenType) => void;
  setSelectedProductId?: (id: string | null) => void;
}

interface TrackedOrder {
  orderId: string;
  fullName: string;
  shippingAddress: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
  }>;
  subtotal: number;
  shippingCost: number;
  taxCost: number;
  totalCost: number;
  paymentMethod: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Order Placed';
  timeline: Array<{
    status: string;
    date: string;
    time: string;
    completed: boolean;
    description: string;
  }>;
}

// 3 Default sample orders for instant testing
const SAMPLE_ORDERS: TrackedOrder[] = [
  {
    orderId: 'INV-2026-472018',
    fullName: 'Clara Sinclair',
    shippingAddress: '422 Hazelnut Lane, Portland OR 97201',
    items: [
      {
        name: 'Quilted Cloud Onesie',
        price: 42.00,
        quantity: 1,
        size: '0-3M',
        color: 'Oatmeal',
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=200'
      },
      {
        name: 'Cloud Knit Bonnet',
        price: 18.00,
        quantity: 1,
        size: '0-6M',
        color: 'Soft Peach',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=200'
      }
    ],
    subtotal: 60.00,
    shippingCost: 0,
    taxCost: 4.80,
    totalCost: 64.80,
    paymentMethod: 'Secure Credit Card',
    date: 'July 8, 2026',
    status: 'Processing',
    timeline: [
      { status: 'Order Placed', date: 'Jul 8', time: '10:14 AM', completed: true, description: 'Confirmation email sent, payment secured.' },
      { status: 'Processing', date: 'Jul 8', time: '02:30 PM', completed: true, description: 'Selecting and preparing premium organic fabrics with absolute care.' },
      { status: 'Shipped', date: '', time: '', completed: false, description: 'Dispatched via Eco-Express courier.' },
      { status: 'Delivered', date: '', time: '', completed: false, description: 'Arrived safely at your doorstep.' }
    ]
  },
  {
    orderId: 'INV-2026-819405',
    fullName: 'Julian Thorne',
    shippingAddress: '901 Pinecrest Dr, Seattle WA 98101',
    items: [
      {
        name: 'Newborn Knitted Set',
        price: 58.00,
        quantity: 1,
        size: '3-6M',
        color: 'Sage Green',
        image: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&q=80&w=200'
      }
    ],
    subtotal: 58.00,
    shippingCost: 0,
    taxCost: 4.64,
    totalCost: 62.64,
    paymentMethod: 'Bank Transfer',
    date: 'July 5, 2026',
    status: 'Shipped',
    timeline: [
      { status: 'Order Placed', date: 'Jul 5', time: '09:02 AM', completed: true, description: 'Confirmation email sent, payment secured.' },
      { status: 'Processing', date: 'Jul 5', time: '11:45 AM', completed: true, description: 'Selecting and preparing premium organic fabrics with absolute care.' },
      { status: 'Shipped', date: 'Jul 6', time: '08:15 AM', completed: true, description: 'Dispatched via Eco-Express courier (Tracking: MC-819405-ECO).' },
      { status: 'Delivered', date: '', time: '', completed: false, description: 'Arrived safely at your doorstep.' }
    ]
  },
  {
    orderId: 'INV-2026-310842',
    fullName: 'Nora Abernathy',
    shippingAddress: '15 Ocean Vista, San Diego CA 92101',
    items: [
      {
        name: 'Botanical Swaddle',
        price: 24.00,
        quantity: 2,
        size: 'OS',
        color: 'Eucalyptus print',
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=200'
      }
    ],
    subtotal: 48.00,
    shippingCost: 4.50,
    taxCost: 3.84,
    totalCost: 56.34,
    paymentMethod: 'Secure Credit Card',
    date: 'July 1, 2026',
    status: 'Delivered',
    timeline: [
      { status: 'Order Placed', date: 'Jul 1', time: '01:22 PM', completed: true, description: 'Confirmation email sent, payment secured.' },
      { status: 'Processing', date: 'Jul 1', time: '04:10 PM', completed: true, description: 'Selecting and preparing premium organic fabrics with absolute care.' },
      { status: 'Shipped', date: 'Jul 2', time: '10:00 AM', completed: true, description: 'Dispatched via Eco-Express courier.' },
      { status: 'Delivered', date: 'Jul 3', time: '03:42 PM', completed: true, description: 'Delivered to mailbox/front porch. Signed by resident.' }
    ]
  }
];

export default function TrackView({ setScreen, setSelectedProductId }: TrackViewProps) {
  const [searchId, setSearchId] = useState('');
  const [currentOrder, setCurrentOrder] = useState<TrackedOrder | null>(null);
  const [searchError, setSearchError] = useState('');
  const [customOrders, setCustomOrders] = useState<TrackedOrder[]>([]);
  const [simulateSuccessMsg, setSimulateSuccessMsg] = useState('');

  // Load custom orders from checkout local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('malow_placed_orders');
      if (saved) {
        setCustomOrders(JSON.parse(saved));
      }
      
      // Auto-populate with the last checked out ID if available
      const lastId = localStorage.getItem('malow_last_order_id');
      if (lastId) {
        setSearchId(lastId);
        // Load it immediately
        handleSearch(lastId);
      }
    } catch (err) {
      console.error('Failed to load active orders', err);
    }
  }, []);

  const handleSearch = (idToSearch?: string) => {
    const targetId = (idToSearch || searchId).trim().toUpperCase();
    if (!targetId) {
      setSearchError('Please enter a valid Order ID.');
      return;
    }

    setSearchError('');

    // 1. Check local storage custom orders first
    const customMatch = customOrders.find(o => o.orderId.toUpperCase() === targetId);
    if (customMatch) {
      setCurrentOrder(customMatch);
      return;
    }

    // 2. Check sample orders
    const sampleMatch = SAMPLE_ORDERS.find(o => o.orderId.toUpperCase() === targetId);
    if (sampleMatch) {
      setCurrentOrder(sampleMatch);
      return;
    }

    // 3. Fallback: Generate a high-quality mock order on-the-fly so the user is never stuck
    // This provides standard/processing status and lets them simulate it in real time
    const generatedOrder: TrackedOrder = {
      orderId: targetId,
      fullName: 'VIP Parent Guest',
      shippingAddress: '742 Organic Boulevard, Austin TX 78701',
      items: [
        {
          name: ALL_PRODUCTS[0]?.name || 'Quilted Cloud Onesie',
          price: ALL_PRODUCTS[0]?.price || 42.00,
          quantity: 1,
          size: '3-6M',
          color: ALL_PRODUCTS[0]?.colorName || 'Oatmeal',
          image: ALL_PRODUCTS[0]?.image || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=200'
        }
      ],
      subtotal: ALL_PRODUCTS[0]?.price || 42.00,
      shippingCost: 4.50,
      taxCost: (ALL_PRODUCTS[0]?.price || 42.00) * 0.08,
      totalCost: (ALL_PRODUCTS[0]?.price || 42.00) * 1.08 + 4.50,
      paymentMethod: 'Secure Credit Card',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      status: 'Order Placed',
      timeline: [
        { status: 'Order Placed', date: 'Today', time: 'Just Now', completed: true, description: 'Confirmation email sent, payment secured.' },
        { status: 'Processing', date: '', time: '', completed: false, description: 'Selecting and preparing premium organic fabrics with absolute care.' },
        { status: 'Shipped', date: '', time: '', completed: false, description: 'Dispatched via Eco-Express courier.' },
        { status: 'Delivered', date: '', time: '', completed: false, description: 'Arrived safely at your doorstep.' }
      ]
    };

    setCurrentOrder(generatedOrder);
    
    // Save generated order so it persists during simulation adjustments
    const updatedCustoms = [...customOrders, generatedOrder];
    setCustomOrders(updatedCustoms);
    localStorage.setItem('malow_placed_orders', JSON.stringify(updatedCustoms));
  };

  // Interactive dummy status advance simulation to satisfy prompt and create a state-rich experience
  const handleAdvanceSimulation = () => {
    if (!currentOrder) return;

    let nextStatus: 'Order Placed' | 'Processing' | 'Shipped' | 'Delivered' = 'Order Placed';
    const updatedTimeline = currentOrder.timeline.map(t => ({ ...t }));
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    if (currentOrder.status === 'Order Placed') {
      nextStatus = 'Processing';
      updatedTimeline[0].completed = true;
      updatedTimeline[1].completed = true;
      updatedTimeline[1].date = todayStr;
      updatedTimeline[1].time = nowStr;
      setSimulateSuccessMsg('Status updated: Order is now being processed! 🧵');
    } else if (currentOrder.status === 'Processing') {
      nextStatus = 'Shipped';
      updatedTimeline[0].completed = true;
      updatedTimeline[1].completed = true;
      updatedTimeline[2].completed = true;
      updatedTimeline[2].date = todayStr;
      updatedTimeline[2].time = nowStr;
      setSimulateSuccessMsg('Status updated: Courier dispatched! 🚚');
    } else if (currentOrder.status === 'Shipped') {
      nextStatus = 'Delivered';
      updatedTimeline[0].completed = true;
      updatedTimeline[1].completed = true;
      updatedTimeline[2].completed = true;
      updatedTimeline[3].completed = true;
      updatedTimeline[3].date = todayStr;
      updatedTimeline[3].time = nowStr;
      setSimulateSuccessMsg('Status updated: Package delivered! 🏡');
    } else {
      // Loop back to placed to keep testing fluid
      nextStatus = 'Order Placed';
      updatedTimeline[0].completed = true;
      updatedTimeline[1].completed = false;
      updatedTimeline[1].date = '';
      updatedTimeline[1].time = '';
      updatedTimeline[2].completed = false;
      updatedTimeline[2].date = '';
      updatedTimeline[2].time = '';
      updatedTimeline[3].completed = false;
      updatedTimeline[3].date = '';
      updatedTimeline[3].time = '';
      setSimulateSuccessMsg('Status reset to Order Placed! 🔄');
    }

    const updatedOrder: TrackedOrder = {
      ...currentOrder,
      status: nextStatus,
      timeline: updatedTimeline
    };

    setCurrentOrder(updatedOrder);

    // Save state back to local storage custom order pool
    const matchIndex = customOrders.findIndex(o => o.orderId === currentOrder.orderId);
    let updatedPool = [...customOrders];
    if (matchIndex !== -1) {
      updatedPool[matchIndex] = updatedOrder;
    } else {
      updatedPool.push(updatedOrder);
    }
    setCustomOrders(updatedPool);
    localStorage.setItem('malow_placed_orders', JSON.stringify(updatedPool));

    // Clear simulation status message after 3 seconds
    setTimeout(() => {
      setSimulateSuccessMsg('');
    }, 3000);
  };

  // Get active step index for styling the progress line
  const getActiveStepIndex = (status: string) => {
    switch (status) {
      case 'Order Placed': return 0;
      case 'Processing': return 1;
      case 'Shipped': return 2;
      case 'Delivered': return 3;
      default: return 0;
    }
  };

  const activeIndex = currentOrder ? getActiveStepIndex(currentOrder.status) : 0;
  // Calculate percentage for progress fill
  const progressPercent = (activeIndex / 3) * 100;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-6 pb-24 animate-fadeIn">
      
      {/* 1. Header Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <button 
            onClick={() => setScreen('home')}
            className="flex items-center gap-2 text-xs font-sans font-bold text-brand-clay/70 hover:text-brand-clay mb-2 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-clay tracking-tight">
            Order Tracking
          </h2>
          <p className="text-xs text-brand-clay/60 font-sans mt-1">
            Track your organic babywear delivery status in real-time
          </p>
        </div>

        {/* Quick select buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-brand-beige rounded-2xl border border-brand-clay/5 w-full sm:w-auto">
          <span className="text-[10px] font-sans font-bold text-brand-clay/50 px-2 uppercase tracking-wider">
            Samples:
          </span>
          {SAMPLE_ORDERS.map((o) => (
            <button
              key={o.orderId}
              onClick={() => {
                setSearchId(o.orderId);
                handleSearch(o.orderId);
              }}
              className={`text-[10px] font-sans font-extrabold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                currentOrder?.orderId === o.orderId
                  ? 'bg-brand-clay text-white shadow-sm'
                  : 'text-brand-clay hover:bg-brand-peach/10'
              }`}
            >
              {o.status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL: LOOKUP & QUICK SAMPLES */}
        <div className="col-span-1 lg:col-span-4 space-y-6">
          
          {/* Tracking Form Card */}
          <div className="bg-white border border-brand-clay/10 rounded-3xl p-6 puffy-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-peach/10 rounded-full blur-2xl pointer-events-none" />
            
            <h3 className="font-display font-extrabold text-brand-clay text-sm flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-brand-peach-dark" />
              <span>Enter Order Details</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-sans font-black uppercase text-brand-clay/50 mb-1.5 tracking-wider">
                  Order Invoice ID
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="e.g. INV-2026-472018"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full bg-brand-beige border border-brand-clay/15 rounded-2xl px-4 py-3.5 pr-10 text-xs font-mono text-brand-clay-dark placeholder:text-brand-clay/40 font-bold tracking-wider uppercase focus:outline-none focus:border-brand-clay"
                  />
                  <button 
                    onClick={() => handleSearch()}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 bg-brand-clay text-white rounded-xl hover:bg-brand-clay-dark active:scale-95 transition-all cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
                {searchError && (
                  <p className="text-[10px] text-red-500 font-sans font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{searchError}</span>
                  </p>
                )}
              </div>

              <button
                onClick={() => handleSearch()}
                className="w-full bg-brand-peach-dark text-white rounded-2xl py-3 text-xs font-sans font-black uppercase tracking-wider hover:bg-brand-clay active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Locate Order Status</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="border-t border-brand-clay/5 pt-4 text-center">
                <p className="text-[10px] text-brand-clay/50 font-sans leading-normal">
                  💡 Tip: You can enter <strong>ANY</strong> code you like (e.g., your own custom text) and our high-fidelity system will instantly spawn a brand new tracking instance!
                </p>
              </div>
            </div>
          </div>

          {/* Recently Checked Out Orders List */}
          {customOrders.length > 0 && (
            <div className="bg-white border border-brand-clay/10 rounded-3xl p-6 puffy-shadow">
              <h3 className="font-display font-extrabold text-brand-clay text-xs flex items-center gap-2 mb-4 uppercase tracking-wider">
                <span>Your Real Order History</span>
                <span className="bg-brand-mint text-brand-mint-dark text-[9px] px-2 py-0.5 rounded-full font-bold">
                  {customOrders.length} Order{customOrders.length === 1 ? '' : 's'}
                </span>
              </h3>

              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {customOrders.slice().reverse().map((order) => (
                  <button
                    key={order.orderId}
                    onClick={() => {
                      setSearchId(order.orderId);
                      setCurrentOrder(order);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer group ${
                      currentOrder?.orderId === order.orderId
                        ? 'border-brand-clay bg-brand-peach/10'
                        : 'border-brand-clay/10 hover:border-brand-peach/40 hover:bg-brand-beige/50'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="font-mono text-xs font-bold text-brand-clay-dark group-hover:text-brand-clay transition-colors">
                        {order.orderId}
                      </p>
                      <p className="text-[10px] text-brand-clay/60 font-sans">
                        {order.date} • {order.items.reduce((sum, item) => sum + item.quantity, 0)} Item{order.items.length === 1 ? '' : 's'}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className={`inline-block text-[9px] font-sans font-extrabold px-2 py-1 rounded-lg ${
                        order.status === 'Delivered' 
                          ? 'bg-brand-mint text-brand-mint-dark'
                          : order.status === 'Shipped' 
                          ? 'bg-brand-lavender text-brand-clay' 
                          : 'bg-brand-peach text-brand-peach-dark'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT PANEL: TRACKING TIMELINE & DEEP ORDER CARD */}
        <div className="col-span-1 lg:col-span-8">
          <AnimatePresence mode="wait">
            {currentOrder ? (
              <motion.div
                key={currentOrder.orderId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                
                {/* Visual Tracker Banner Card */}
                <div className="bg-white border border-brand-clay/10 rounded-3xl puffy-shadow overflow-hidden">
                  
                  {/* Status Banner */}
                  <div className="bg-brand-clay text-brand-cream px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-clay-dark/10">
                    <div className="space-y-1">
                      <span className="text-[9px] font-sans font-black uppercase tracking-widest text-brand-peach">
                        Live Shipment Status
                      </span>
                      <div className="flex items-center gap-2">
                        <h4 className="font-display font-black text-lg tracking-tight uppercase text-white">
                          Order #{currentOrder.orderId}
                        </h4>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-mint animate-ping" />
                      </div>
                    </div>

                    <div className="flex flex-col sm:text-right">
                      <span className="text-[9px] font-sans font-black uppercase tracking-widest text-brand-peach">
                        Estimated Delivery
                      </span>
                      <p className="font-display font-extrabold text-sm text-white">
                        {currentOrder.status === 'Delivered' 
                          ? 'Package Arrived!' 
                          : currentOrder.status === 'Shipped'
                          ? 'In Transit (Arrives Tomorrow)'
                          : 'July 11, 2026 (Expected)'
                        }
                      </p>
                    </div>
                  </div>

                  {/* 2. Visual Progress Bar */}
                  <div className="p-6 sm:p-8 bg-brand-cream/45 border-b border-brand-clay/5">
                    
                    {/* Horizontal Progress Container */}
                    <div className="relative py-4 select-none">
                      
                      {/* Background Bar */}
                      <div className="absolute top-1/2 left-0 w-full h-1.5 bg-brand-beige rounded-full -translate-y-1/2" />
                      
                      {/* Active Fill Bar */}
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="absolute top-1/2 left-0 h-1.5 bg-brand-mint-dark rounded-full -translate-y-1/2"
                      />

                      {/* 4 Interactive Step Nodes */}
                      <div className="relative flex justify-between items-center w-full">
                        
                        {/* Step 1: Placed */}
                        <div className="flex flex-col items-center">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                            activeIndex >= 0 
                              ? 'bg-brand-mint-dark border-brand-mint-dark text-white shadow-md' 
                              : 'bg-white border-brand-clay/15 text-brand-clay/40'
                          }`}>
                            <ShoppingBag className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-display font-black uppercase tracking-wider text-brand-clay mt-2">
                            Placed
                          </span>
                        </div>

                        {/* Step 2: Processing */}
                        <div className="flex flex-col items-center">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                            activeIndex >= 1 
                              ? 'bg-brand-mint-dark border-brand-mint-dark text-white shadow-md' 
                              : 'bg-white border-brand-clay/15 text-brand-clay/40'
                          }`}>
                            <Package className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-display font-black uppercase tracking-wider text-brand-clay mt-2">
                            Processing
                          </span>
                        </div>

                        {/* Step 3: Shipped */}
                        <div className="flex flex-col items-center">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                            activeIndex >= 2 
                              ? 'bg-brand-mint-dark border-brand-mint-dark text-white shadow-md' 
                              : 'bg-white border-brand-clay/15 text-brand-clay/40 animate-pulse'
                          }`}>
                            <Truck className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-display font-black uppercase tracking-wider text-brand-clay mt-2">
                            Shipped
                          </span>
                        </div>

                        {/* Step 4: Delivered */}
                        <div className="flex flex-col items-center">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                            activeIndex >= 3 
                              ? 'bg-brand-mint-dark border-brand-mint-dark text-white shadow-md' 
                              : 'bg-white border-brand-clay/15 text-brand-clay/40'
                          }`}>
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-display font-black uppercase tracking-wider text-brand-clay mt-2">
                            Delivered
                          </span>
                        </div>

                      </div>
                    </div>

                    {/* Quick status message */}
                    <div className="mt-4 bg-white/60 border border-brand-clay/5 p-3 rounded-2xl flex items-start gap-2.5 text-xs">
                      <Clock className="w-4 h-4 text-brand-peach-dark flex-shrink-0 mt-0.5" />
                      <div className="font-sans leading-normal">
                        <strong className="text-brand-clay-dark font-black">Current Update: </strong>
                        <span className="text-brand-clay/85">
                          {currentOrder.status === 'Order Placed' && 'We have secured your transaction authorization. Preparing your GOTS-certified baby box next.'}
                          {currentOrder.status === 'Processing' && 'Tailors are meticulously selecting double-layered knits and soft blankets for inspection.'}
                          {currentOrder.status === 'Shipped' && 'Package has departed our Portland fulfillment center and is traveling on an eco-friendly route.'}
                          {currentOrder.status === 'Delivered' && 'Shipment has arrived safely at your residence. Organic comfort is here! Enjoy.'}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* 3. SIMULATOR CONTROLLER: HIGH ENGAGEMENT GIMMICK */}
                  <div className="p-4 bg-brand-peach/10 border-b border-brand-clay/5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1 bg-white rounded-lg text-brand-clay shadow-sm flex-shrink-0">
                        <RefreshCw className="w-3.5 h-3.5 text-brand-peach-dark animate-spin" style={{ animationDuration: '6s' }} />
                      </span>
                      <div className="text-left">
                        <span className="text-[10px] font-sans font-black text-brand-clay uppercase block leading-tight">
                          Interactive Sandbox Controller
                        </span>
                        <span className="text-[9px] text-brand-clay/60 block font-sans">
                          Manually push or roll status updates to test the layout
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {simulateSuccessMsg && (
                        <span className="text-[10px] font-sans font-bold text-brand-mint-dark bg-brand-mint/40 px-2.5 py-1 rounded-xl animate-fadeIn">
                          {simulateSuccessMsg}
                        </span>
                      )}
                      <button
                        onClick={handleAdvanceSimulation}
                        className="bg-brand-clay text-white hover:bg-brand-clay-dark active:scale-95 transition-all px-3 py-1.5 rounded-xl font-sans text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      >
                        <span>Simulate Next Status</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Detailed Log History Timeline */}
                  <div className="p-6 sm:p-8 space-y-4">
                    <h5 className="font-display font-extrabold text-xs uppercase tracking-wider text-brand-clay/60">
                      Tracking Log History
                    </h5>

                    <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-clay/10">
                      {currentOrder.timeline.map((event, idx) => {
                        const isPastOrCurrent = activeIndex >= idx;
                        return (
                          <div key={idx} className="flex gap-4 items-start relative pl-1.5">
                            
                            {/* Dot indicator */}
                            <div className={`w-3.5 h-3.5 rounded-full z-10 flex-shrink-0 transition-all ${
                              isPastOrCurrent 
                                ? 'bg-brand-mint-dark ring-4 ring-brand-mint/30 scale-110' 
                                : 'bg-brand-beige border border-brand-clay/20'
                            }`} />

                            <div className="space-y-0.5 flex-grow text-xs font-sans">
                              <div className="flex items-center justify-between gap-2">
                                <span className={`font-black uppercase tracking-wider ${
                                  isPastOrCurrent ? 'text-brand-clay-dark' : 'text-brand-clay/40'
                                }`}>
                                  {event.status}
                                </span>
                                {event.date && (
                                  <span className="text-[10px] font-mono text-brand-clay/50 font-bold bg-brand-beige px-1.5 py-0.5 rounded">
                                    {event.date} • {event.time}
                                  </span>
                                )}
                              </div>
                              <p className={`leading-relaxed text-[11px] ${
                                isPastOrCurrent ? 'text-brand-clay/70' : 'text-brand-clay/35'
                              }`}>
                                {event.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Sub-Card: Order Contents & Summary Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Column: Shipment Details */}
                  <div className="bg-white border border-brand-clay/10 rounded-3xl p-6 puffy-shadow space-y-4">
                    <h5 className="font-display font-extrabold text-xs uppercase tracking-wider text-brand-clay/60">
                      Delivery Information
                    </h5>

                    <div className="space-y-3.5 text-xs font-sans text-brand-clay/85">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-brand-peach-dark flex-shrink-0" />
                        <div>
                          <strong className="text-brand-clay-dark font-black text-[10px] uppercase block tracking-wider">
                            Recipient / Address
                          </strong>
                          <span className="text-brand-clay-dark block font-bold mt-0.5">
                            {currentOrder.fullName}
                          </span>
                          <span className="text-[11px] text-brand-clay/70 block leading-normal mt-0.5">
                            {currentOrder.shippingAddress}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Truck className="w-4 h-4 text-brand-peach-dark flex-shrink-0" />
                        <div>
                          <strong className="text-brand-clay-dark font-black text-[10px] uppercase block tracking-wider">
                            Carrier Methods
                          </strong>
                          <span className="text-[11px] text-brand-clay/70 block leading-normal mt-0.5">
                            Eco-Express Courier Service<br />
                            Standard GOTS Organic Packaging
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-brand-peach-dark flex-shrink-0" />
                        <div>
                          <strong className="text-brand-clay-dark font-black text-[10px] uppercase block tracking-wider">
                            Secure Dispatch Validation
                          </strong>
                          <span className="text-[11px] text-brand-clay/70 block leading-normal mt-0.5">
                            Verified via {currentOrder.paymentMethod} • ID: {currentOrder.orderId}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Styled Route Map Simulation */}
                    <div className="pt-2">
                      <div className="bg-brand-beige border border-brand-clay/10 rounded-2xl p-3 text-[10px] font-sans relative overflow-hidden">
                        <div className="flex justify-between items-center relative z-10 font-bold text-brand-clay/80">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-brand-clay" />
                            <span>Portland, OR</span>
                          </span>
                          <span className="text-brand-clay/40 font-mono">-------------------</span>
                          <span className="flex items-center gap-1 text-right">
                            <span className={`w-2 h-2 rounded-full ${currentOrder.status === 'Delivered' ? 'bg-brand-mint-dark' : 'bg-brand-peach-dark animate-pulse'}`} />
                            <span>Destination</span>
                          </span>
                        </div>
                        <div className="mt-1.5 text-center text-[9px] text-brand-clay/50 italic leading-snug">
                          {currentOrder.status === 'Delivered' 
                            ? '✓ Total Route Transit Complete (100%)' 
                            : currentOrder.status === 'Shipped'
                            ? '⚡ Package traveling down interstate node. (75%)'
                            : '☕ Preparing packaging in distribution dock. (15%)'
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Order Items & Invoices */}
                  <div className="bg-white border border-brand-clay/10 rounded-3xl p-6 puffy-shadow space-y-4">
                    <h5 className="font-display font-extrabold text-xs uppercase tracking-wider text-brand-clay/60">
                      Order Breakdown
                    </h5>

                    {/* Items List */}
                    <div className="divide-y divide-brand-clay/5 max-h-[160px] overflow-y-auto pr-1">
                      {currentOrder.items.map((item, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                          <div className="flex items-center gap-2.5">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-10 h-10 object-cover rounded-xl border border-brand-clay/10 bg-brand-cream"
                              referrerPolicy="no-referrer"
                            />
                            <div className="text-xs font-sans text-brand-clay-dark">
                              <p className="font-extrabold leading-tight">{item.name}</p>
                              <p className="text-[10px] text-brand-clay/60 mt-0.5">
                                Qty: {item.quantity} &bull; Size: {item.size} &bull; Color: {item.color}
                              </p>
                            </div>
                          </div>
                          <span className="font-sans text-xs font-bold text-brand-clay">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Cost Breakdown Sheet */}
                    <div className="bg-brand-beige/50 rounded-2xl p-3 space-y-1.5 font-sans text-[11px] border border-brand-clay/5">
                      <div className="flex justify-between text-brand-clay/70">
                        <span>Subtotal:</span>
                        <span className="font-bold">${currentOrder.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-brand-clay/70">
                        <span>Shipping Courier:</span>
                        <span className="font-bold">
                          {currentOrder.shippingCost === 0 ? 'FREE' : `$${currentOrder.shippingCost.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-brand-clay/70">
                        <span>Taxes (8%):</span>
                        <span className="font-bold">${currentOrder.taxCost.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-brand-clay/10 pt-1.5 mt-1.5 flex justify-between text-xs text-brand-clay-dark font-black">
                        <span>Total Authorization:</span>
                        <span className="text-brand-mint-dark">${currentOrder.totalCost.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                </div>

              </motion.div>
            ) : (
              /* ORDER NOT LOADED / SEARCH INSTRUCTION STATE */
              <div className="bg-white border border-brand-clay/10 rounded-3xl p-12 text-center space-y-6 puffy-shadow">
                <div className="w-20 h-20 bg-brand-peach/15 rounded-full flex items-center justify-center text-brand-clay/30 border border-brand-peach/20 mx-auto">
                  <Truck className="w-10 h-10 text-brand-peach-dark animate-bounce" style={{ animationDuration: '3s' }} />
                </div>
                
                <div className="space-y-2 max-w-md mx-auto">
                  <h4 className="font-display font-black text-brand-clay text-base">Locate Organic Fabric Shipments</h4>
                  <p className="text-xs text-brand-clay/65 leading-relaxed font-sans">
                    Use the lookup panel on the left to track existing deliveries. Select a pre-loaded sample order for a quick run, or complete a checkout to track your genuine basket!
                  </p>
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      const id = SAMPLE_ORDERS[0].orderId;
                      setSearchId(id);
                      handleSearch(id);
                    }}
                    className="bg-brand-cream border border-brand-clay/15 hover:border-brand-clay hover:bg-brand-peach/10 text-brand-clay px-4 py-2.5 rounded-2xl text-xs font-sans font-bold active:scale-95 transition-all cursor-pointer shadow-sm"
                  >
                    Load Sample Processing Order
                  </button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
