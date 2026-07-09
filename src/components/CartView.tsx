import { useState, FormEvent } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, ShoppingBag, X, Lock, CreditCard, Truck, Building2, Copy, Check } from 'lucide-react';
import { CartItem, Product, ScreenType, SimulatedEmail } from '../types';

interface CartViewProps {
  cart: CartItem[];
  setScreen: (screen: ScreenType) => void;
  updateQuantity: (index: number, newQty: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  triggerSimulatedEmail: (email: SimulatedEmail) => void;
  user: { name: string; email: string } | null;
}

export default function CartView({
  cart,
  setScreen,
  updateQuantity,
  removeFromCart,
  clearCart,
  triggerSimulatedEmail,
  user
}: CartViewProps) {
  
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'processing' | 'success'>('form');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Checkout Form fields
  const [fullName, setFullName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  
  // Card details
  const [cardNum, setCardNum] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Bank details
  const [senderBankName, setSenderBankName] = useState('');
  const [senderAccountNum, setSenderAccountNum] = useState('');
  const [bankReference, setBankReference] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [showSummaryItems, setShowSummaryItems] = useState(true);

  // Math conversions
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shippingCost = subtotal >= 50 ? 0 : (subtotal > 0 ? 4.50 : 0);
  const taxCost = subtotal * 0.08;
  const totalCost = subtotal + shippingCost + taxCost;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleStartCheckout = () => {
    setBankReference('ML-BANK-' + Math.floor(Math.random() * 90000 + 10000));
    setInvoiceNumber('INV-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 900000 + 100000));
    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setInvoiceDate(formattedDate);
    setShowCheckoutModal(true);
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !shippingAddress.trim()) {
      alert('Please fill out all required shipping details.');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardNum.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
        alert('Please fill out all required card details.');
        return;
      }
    } else {
      if (!senderBankName.trim() || !senderAccountNum.trim()) {
        alert('Please fill out your bank details to authorize the transfer verification.');
        return;
      }
    }
    
    setCheckoutStep('processing');
    
    // Simulate payment gateway/bank clearing call
    setTimeout(() => {
      setCheckoutStep('success');

      // Send simulated Order Confirmation receipt email!
      const finalEmailAddress = user?.email || 'parent.sandbox@cuddle.com';
      const itemsListText = cart.map(item => `- ${item.product.name} (Size: ${item.size}) x${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`).join('\n');
      const itemsListHtml = cart.map(item => `
        <tr style="border-bottom: 1px solid #f6efe9;">
          <td style="padding: 8px 0; font-size: 11px; text-align: left;">
            <strong style="color: #4a3e3d;">${item.product.name}</strong><br/>
            <span style="font-size: 9px; color: #a18a80;">Size: ${item.size} &bull; Color: ${item.color}</span>
          </td>
          <td style="padding: 8px 0; text-align: center; font-size: 11px; color: #4a3e3d;">${item.quantity}</td>
          <td style="padding: 8px 0; text-align: right; font-size: 11px; font-weight: bold; color: #4a3e3d;">$${(item.product.price * item.quantity).toFixed(2)}</td>
        </tr>
      `).join('');

      const totalCost = subtotal + shippingCost + taxCost;

      const orderEmail: SimulatedEmail = {
        id: 'MAIL-' + Math.floor(Math.random() * 90000 + 10000),
        sender: 'orders@malowbeyb.com',
        recipient: finalEmailAddress,
        subject: `Order Confirmed: Invoice ${invoiceNumber} 🌿`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'order_confirmation',
        bodyText: `Thank you for your order, ${fullName}!\n\nYour invoice reference is ${invoiceNumber}.\n\nItems Ordered:\n${itemsListText}\n\nSubtotal: $${subtotal.toFixed(2)}\nShipping: ${shippingCost === 0 ? 'FREE' : '$' + shippingCost.toFixed(2)}\nSales Tax (8%): $${taxCost.toFixed(2)}\nGrand Total Paid: $${totalCost.toFixed(2)}\n\nDelivery Address:\n${shippingAddress}\n\nWe are preparing your organic fabrics with absolute care!\n\nMalow childrenswear Team`,
        bodyHtml: `
          <div style="color: #4a3e3d; line-height: 1.5; font-size: 12px;">
            <div style="text-align: center; border-bottom: 2px solid #ecd8c9; padding-bottom: 12px; margin-bottom: 16px;">
              <span style="font-size: 24px; font-weight: bold; color: #4a3e3d; font-family: Georgia, serif;">malow<span style="color: #cfb2a9;">.</span></span>
              <p style="font-size: 9px; text-transform: uppercase; letter-spacing: 0.15em; color: #a18a80; margin: 3px 0 0 0;">Official Order Receipt</p>
            </div>
            
            <h3 style="color: #15803d; font-size: 15px; font-weight: bold; margin-top: 0; font-family: Georgia, serif;">Order Confirmed! 🌿</h3>
            <p>Hi <strong>${fullName}</strong>,</p>
            <p>We are absolutely delighted to confirm your organic boutique order. Your payment authorization succeeded and your receipt details are listed below.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
              <thead>
                <tr style="border-bottom: 2.5px solid #ecd8c9; text-align: left; font-size: 9px; text-transform: uppercase; color: #a18a80; font-weight: bold;">
                  <th style="padding-bottom: 4px; text-align: left;">Item Description</th>
                  <th style="padding-bottom: 4px; text-align: center; width: 40px;">Qty</th>
                  <th style="padding-bottom: 4px; text-align: right; width: 80px;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsListHtml}
              </tbody>
            </table>
            
            <div style="background-color: #faf4ef; border-radius: 8px; padding: 12px; margin-top: 16px;">
              <table style="width: 100%; font-size: 11px; border-collapse: collapse;">
                <tr>
                  <td style="color: #a18a80; padding: 2px 0; text-align: left;">Subtotal:</td>
                  <td style="text-align: right; font-weight: bold; color: #4a3e3d;">$${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="color: #a18a80; padding: 2px 0; text-align: left;">Shipping & Handling:</td>
                  <td style="text-align: right; font-weight: bold; color: #4a3e3d;">${shippingCost === 0 ? 'FREE' : '$' + shippingCost.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="color: #a18a80; padding: 2px 0; text-align: left;">Sales Tax (8%):</td>
                  <td style="text-align: right; font-weight: bold; color: #4a3e3d;">$${taxCost.toFixed(2)}</td>
                </tr>
                <tr style="border-top: 1px solid #cfb2a9;">
                  <td style="padding-top: 6px; font-weight: bold; font-size: 12px; color: #4a3e3d; text-align: left;">Grand Total:</td>
                  <td style="padding-top: 6px; text-align: right; font-weight: bold; font-size: 12px; color: #15803d;">$${totalCost.toFixed(2)}</td>
                </tr>
              </table>
            </div>

            <div style="margin-top: 16px; font-size: 11px; line-height: 1.4; border-top: 1px dashed #ecd8c9; padding-top: 12px; text-align: left;">
              <p style="margin: 3px 0;"><strong>Shipping To:</strong><br/>${shippingAddress}</p>
              <p style="margin: 3px 0;"><strong>Invoice ID:</strong> <span style="font-family: monospace;">${invoiceNumber}</span></p>
              <p style="margin: 3px 0;"><strong>Payment:</strong> ${paymentMethod === 'card' ? 'Secure Credit Card (Stripe)' : 'Direct Bank Clearing'}</p>
            </div>
            
            <p style="font-size: 10px; color: #a18a80; border-top: 1px solid #f6efe9; padding-top: 12px; margin-top: 20px; text-align: center; margin-bottom: 0;">
              Thank you for supporting 100% organic textile certified standards. 🌸
            </p>
          </div>
        `
      };

      triggerSimulatedEmail(orderEmail);

      // Save order for tracking view
      try {
        const newTrackedOrder = {
          orderId: invoiceNumber,
          fullName: fullName,
          shippingAddress: shippingAddress,
          items: cart.map(item => ({
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            image: item.product.image
          })),
          subtotal: subtotal,
          shippingCost: shippingCost,
          taxCost: taxCost,
          totalCost: totalCost,
          paymentMethod: paymentMethod === 'card' ? 'Secure Credit Card' : 'Bank Transfer',
          date: invoiceDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          status: 'Processing',
          timeline: [
            { status: 'Order Placed', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), completed: true, description: 'Confirmation email sent, payment secured.' },
            { status: 'Processing', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), completed: true, description: 'Selecting and preparing premium organic fabrics with absolute care.' },
            { status: 'Shipped', date: '', time: '', completed: false, description: 'Dispatched via Eco-Express courier.' },
            { status: 'Delivered', date: '', time: '', completed: false, description: 'Arrived safely at your doorstep.' }
          ]
        };
        const savedOrders = JSON.parse(localStorage.getItem('malow_placed_orders') || '[]');
        savedOrders.push(newTrackedOrder);
        localStorage.setItem('malow_placed_orders', JSON.stringify(savedOrders));
        localStorage.setItem('malow_last_order_id', invoiceNumber);
      } catch (err) {
        console.error('Failed to save order details for tracking', err);
      }

    }, 2000);
  };

  const handleFinishCheckout = () => {
    clearCart();
    setShowCheckoutModal(false);
    setCheckoutStep('form');
    setScreen('home');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-6 space-y-8 animate-fadeIn pb-24">
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-clay tracking-tight">
          Your Basket
        </h2>
        <span className="text-xs font-bold font-sans tracking-widest text-brand-clay/60 uppercase">
          {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'}
        </span>
      </div>

      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items List */}
          <div className="flex-grow space-y-4">
            {cart.map((item, index) => (
              <div 
                key={`${item.product.id}-${item.size}-${item.color}-${index}`}
                className="p-4 bg-white rounded-2xl border border-brand-clay/5 puffy-card flex gap-4 items-center"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-brand-beige/40 rounded-xl overflow-hidden flex-shrink-0 border border-brand-clay/5">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details Area */}
                <div className="flex-grow space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-display text-sm sm:text-base font-bold text-brand-clay line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-brand-clay/60 font-sans mt-0.5">
                        Size: <span className="font-bold">{item.size}</span> &bull; Color: <span className="font-bold">{item.color}</span>
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="p-1.5 text-brand-clay/40 hover:text-red-500 hover:bg-red-50 rounded-full transition-all cursor-pointer"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    {/* Quantity Selector Panel */}
                    <div className="flex items-center bg-brand-beige rounded-full p-1 border border-brand-clay/5 shadow-sm">
                      <button 
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-brand-clay hover:bg-white active:scale-90 transition-all cursor-pointer focus:outline-none"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      
                      <span className="px-3 text-xs sm:text-sm font-bold text-brand-clay min-w-[20px] text-center select-none">
                        {item.quantity}
                      </span>
                      
                      <button 
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-brand-clay hover:bg-white active:scale-90 transition-all cursor-pointer focus:outline-none"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="font-display font-extrabold text-brand-clay text-sm sm:text-base">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Panel */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="bg-white border border-brand-clay/5 rounded-3xl p-6 sm:p-8 space-y-6 puffy-shadow sticky top-28">
              <h3 className="font-display text-lg sm:text-xl font-extrabold text-brand-clay">Order Summary</h3>
              
              <div className="space-y-4 border-b border-brand-clay/10 pb-6 text-sm font-sans text-brand-clay-dark/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-brand-clay">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  {shippingCost === 0 ? (
                    <span className="font-bold text-brand-mint-dark uppercase tracking-wider text-xs">Free Shipping</span>
                  ) : (
                    <span className="font-bold text-brand-clay">${shippingCost.toFixed(2)}</span>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-bold text-brand-clay">${taxCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <span className="font-display font-extrabold text-brand-clay text-base">Total</span>
                <div className="text-right">
                  <p className="text-brand-clay font-display text-2xl font-extrabold">
                    ${totalCost.toFixed(2)}
                  </p>
                  <p className="text-[9px] text-brand-clay/50 font-sans uppercase tracking-widest mt-1">
                    Secure checkout by Stripe
                  </p>
                </div>
              </div>

              <button 
                onClick={handleStartCheckout}
                className="w-full py-4.5 rounded-full text-white font-display font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg puffy-btn-secondary cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secure Trust indicators */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-brand-clay/5 text-center text-[10px] font-sans text-brand-clay/60 uppercase font-bold select-none">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-brand-mint-dark" />
                  <span>Secure</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-brand-mint-dark" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShoppingBag className="w-4 h-4 text-brand-mint-dark" />
                  <span>Organic GOTS</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      ) : (
        <div className="py-20 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-brand-peach/20 flex items-center justify-center mx-auto text-brand-clay">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <p className="font-display text-lg font-bold text-brand-clay">Your basket is feeling pretty light</p>
            <p className="text-sm text-brand-clay/60 max-w-sm mx-auto">Fill it with GOTS-certified organic cotton rompers, cardigans, and swaddles.</p>
          </div>
          <button 
            onClick={() => setScreen('shop')}
            className="bg-brand-clay text-white px-7 py-3.5 rounded-full font-display text-xs font-bold shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            Start Shopping
          </button>
        </div>
      )}

      {/* SECURE CHECKOUT MODAL (SUPPORTING STRIPE & BANK DIRECT) */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm flex items-center justify-center z-[100] px-4 py-8 overflow-y-auto animate-fadeIn">
          <div className={`bg-brand-cream border border-brand-clay/10 rounded-3xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6 animate-scaleUp transition-all duration-500 ${
            checkoutStep === 'success' ? 'max-w-2xl' : 'max-w-lg'
          }`}>
            
            {/* Close Button */}
            {checkoutStep !== 'processing' && (
              <button 
                onClick={() => setShowCheckoutModal(false)}
                className="absolute top-4 right-4 p-1.5 text-brand-clay/60 hover:text-brand-clay hover:bg-brand-peach/10 rounded-full transition-all cursor-pointer"
                title="Close Checkout"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* STEP 1: FORM INPUT */}
            {checkoutStep === 'form' && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-brand-mint-dark">
                    <Lock className="w-4 h-4" />
                    <span className="font-display text-xs font-bold uppercase tracking-widest">
                      {paymentMethod === 'card' ? 'Secure Stripe Ingress' : 'Direct Bank Clearing'}
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-brand-clay">Secure Checkout</h3>
                  <p className="text-brand-clay/70 font-sans text-xs">Total payment authorization: <strong>${totalCost.toFixed(2)}</strong></p>
                </div>

                {/* 🛒 PAYMENT ORDER SUMMARY (ITEMIZED BREAKDOWN & TAXES) */}
                <div className="bg-white/50 border border-brand-clay/10 rounded-2xl p-4.5 space-y-3.5 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setShowSummaryItems(!showSummaryItems)}
                    className="w-full flex items-center justify-between font-display text-xs font-black text-brand-clay uppercase tracking-wider cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-brand-clay" />
                      <span>Order Summary ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                    </div>
                    <span className="text-[10px] text-brand-clay/60 bg-white border border-brand-clay/10 px-2.5 py-1 rounded-full hover:bg-brand-peach/10 transition-colors">
                      {showSummaryItems ? 'Collapse details' : 'Expand details'}
                    </span>
                  </button>

                  {showSummaryItems && (
                    <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1 divide-y divide-brand-clay/5 animate-fadeIn">
                      {cart.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center pt-2.5 first:pt-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-12 object-cover rounded-lg bg-brand-beige border border-brand-clay/10 shadow-sm"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-grow min-w-0">
                            <p className="text-xs font-bold text-brand-clay truncate">
                              {item.product.name}
                            </p>
                            <p className="text-[10px] text-brand-clay/50 font-sans">
                              Size: {item.size} • Color: {item.product.colorName}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-display font-bold text-brand-clay">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-[9px] text-brand-clay/40 font-sans">
                              {item.quantity} x ${item.product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Financial calculation breakdown table */}
                  <div className="bg-white/80 border border-brand-clay/5 rounded-xl p-3 space-y-1.5 text-xs shadow-inner">
                    <div className="flex justify-between text-brand-clay/70 font-sans">
                      <span>Items Subtotal</span>
                      <span className="font-medium text-brand-clay">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-brand-clay/70 font-sans">
                      <span>Shipping &amp; Handling</span>
                      <span className="font-medium text-brand-clay">
                        {shippingCost === 0 ? <strong className="text-brand-mint-dark font-bold">FREE</strong> : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-brand-clay/70 font-sans">
                      <span>Estimated Sales Tax (8%)</span>
                      <span className="font-medium text-brand-clay">${taxCost.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-brand-clay/10 pt-2 mt-1.5 flex justify-between font-display font-black text-brand-clay text-sm">
                      <span>Total Payment</span>
                      <span className="text-brand-clay-dark">${totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selector Tabs */}
                <div className="flex bg-white/60 p-1 rounded-full border border-brand-clay/10 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-grow py-2.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'bg-brand-clay text-white shadow-md scale-98'
                        : 'text-brand-clay/60 hover:text-brand-clay'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Card Payment</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`flex-grow py-2.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      paymentMethod === 'bank'
                        ? 'bg-brand-clay text-white shadow-md scale-98'
                        : 'text-brand-clay/60 hover:text-brand-clay'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Bank Transfer</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Shipping Info Header */}
                  <div className="border-b border-brand-clay/5 pb-1">
                    <span className="text-[10px] font-sans font-bold text-brand-clay/50 uppercase tracking-widest">1. Shipping Information</span>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-sans font-bold text-brand-clay/80 uppercase">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Mukhtaar Ahmed"
                      className="w-full bg-white border border-brand-clay/15 focus:border-brand-clay rounded-xl px-4 py-3 text-sm font-sans focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Shipping Address field */}
                  <div className="space-y-1">
                    <label className="text-xs font-sans font-bold text-brand-clay/80 uppercase">Shipping Address</label>
                    <textarea 
                      required
                      rows={2}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="123 Cozy Nursery Ln, Cloud City, CA 90210"
                      className="w-full bg-white border border-brand-clay/15 focus:border-brand-clay rounded-xl px-4 py-3 text-sm font-sans focus:outline-none resize-none transition-colors"
                    />
                  </div>

                  {/* Payment Details Header */}
                  <div className="border-b border-brand-clay/5 pb-1 pt-1">
                    <span className="text-[10px] font-sans font-bold text-brand-clay/50 uppercase tracking-widest">
                      {paymentMethod === 'card' ? '2. Credit Card Details' : '2. Send Payment to Bank'}
                    </span>
                  </div>

                  {/* OPTION A: STRIPE CARD PAYMENTS */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      {/* Stripe Card field */}
                      <div className="space-y-1">
                        <label className="text-xs font-sans font-bold text-brand-clay/80 uppercase">Credit Card Number</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required={paymentMethod === 'card'}
                            maxLength={19}
                            value={cardNum}
                            onChange={(e) => setCardNum(e.target.value)}
                            placeholder="4242 4242 4242 4242"
                            className="w-full bg-white border border-brand-clay/15 focus:border-brand-clay rounded-xl pl-11 pr-4 py-3 text-sm font-sans focus:outline-none transition-colors"
                          />
                          <CreditCard className="w-5 h-5 text-brand-clay/40 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      {/* Expiry and CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-sans font-bold text-brand-clay/80 uppercase">Expiration</label>
                          <input 
                            type="text" 
                            required={paymentMethod === 'card'}
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full bg-white border border-brand-clay/15 focus:border-brand-clay rounded-xl px-4 py-3 text-sm font-sans focus:outline-none text-center transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-sans font-bold text-brand-clay/80 uppercase">CVC / CVV</label>
                          <input 
                            type="password" 
                            required={paymentMethod === 'card'}
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="123"
                            className="w-full bg-white border border-brand-clay/15 focus:border-brand-clay rounded-xl px-4 py-3 text-sm font-sans focus:outline-none text-center transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* OPTION B: BANK TRANSFER CREDENTIALS CARD & SENDER FORM */}
                  {paymentMethod === 'bank' && (
                    <div className="space-y-4">
                      {/* Interactive Copyable Bank Details Card */}
                      <div className="bg-white border border-brand-clay/10 rounded-2xl p-4.5 space-y-3.5 shadow-sm">
                        <div className="flex justify-between items-center border-b border-brand-clay/5 pb-2">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-brand-clay" />
                            <span className="font-display font-black text-xs text-brand-clay uppercase tracking-wider">Malow Boutique Bank Account</span>
                          </div>
                          <span className="text-[9px] text-brand-mint-dark font-sans font-bold bg-brand-mint/40 px-2 py-0.5 rounded-full border border-brand-mint-dark/5">
                            Fast Instant Transfer
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {/* Beneficiary Name */}
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-sans text-brand-clay/50 uppercase font-bold">Account Name</span>
                            <p className="font-semibold text-brand-clay font-sans">Malow Organic Kids Ltd</p>
                          </div>

                          {/* Bank Name */}
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-sans text-brand-clay/50 uppercase font-bold">Bank Name</span>
                            <p className="font-semibold text-brand-clay font-sans">Cozy Reserve Bank</p>
                          </div>

                          {/* Sort Code */}
                          <div className="space-y-0.5 relative group">
                            <span className="text-[10px] font-sans text-brand-clay/50 uppercase font-bold">Sort Code</span>
                            <div className="flex items-center gap-1">
                              <span className="font-mono font-bold text-brand-clay text-sm">09-18-37</span>
                              <button 
                                type="button"
                                onClick={() => handleCopy('09-18-37', 'sort')}
                                className="p-1 hover:bg-brand-beige rounded text-brand-clay/40 hover:text-brand-clay transition-all cursor-pointer"
                                title="Copy Sort Code"
                              >
                                {copiedField === 'sort' ? <Check className="w-3.5 h-3.5 text-brand-mint-dark" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                          {/* IBAN / Account Number */}
                          <div className="space-y-0.5 relative group">
                            <span className="text-[10px] font-sans text-brand-clay/50 uppercase font-bold">IBAN / Account No.</span>
                            <div className="flex items-center gap-1">
                              <span className="font-mono font-bold text-brand-clay text-sm">GB82CRB09183746128455</span>
                              <button 
                                type="button"
                                onClick={() => handleCopy('GB82CRB09183746128455', 'iban')}
                                className="p-1 hover:bg-brand-beige rounded text-brand-clay/40 hover:text-brand-clay transition-all cursor-pointer"
                                title="Copy IBAN"
                              >
                                {copiedField === 'iban' ? <Check className="w-3.5 h-3.5 text-brand-mint-dark" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Payment Reference Identifier (CRITICAL FOR MATCHING) */}
                        <div className="bg-brand-peach/10 border border-brand-peach/25 rounded-xl p-3 flex justify-between items-center">
                          <div className="space-y-0.5">
                            <span className="text-[9px] font-sans font-bold text-brand-clay/60 uppercase tracking-widest">Required Transfer Reference</span>
                            <p className="font-mono font-black text-brand-clay text-sm">{bankReference}</p>
                          </div>
                          <button 
                            type="button"
                            onClick={() => handleCopy(bankReference, 'ref')}
                            className="bg-white hover:bg-brand-peach/20 border border-brand-clay/10 text-brand-clay font-sans text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            {copiedField === 'ref' ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-brand-mint-dark" />
                                <span className="text-brand-mint-dark">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-[10px] font-sans text-brand-clay/50 text-center leading-normal italic">
                          Please complete the transfer from your bank app using the reference above. Your order will be set to processing immediately.
                        </p>
                      </div>

                      {/* Parent's Bank Account confirmation details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-sans font-bold text-brand-clay/80 uppercase">Your Bank Name</label>
                          <input 
                            type="text" 
                            required={paymentMethod === 'bank'}
                            value={senderBankName}
                            onChange={(e) => setSenderBankName(e.target.value)}
                            placeholder="e.g. HSBC, Chase, Barclays"
                            className="w-full bg-white border border-brand-clay/15 focus:border-brand-clay rounded-xl px-4 py-3 text-sm font-sans focus:outline-none transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-sans font-bold text-brand-clay/80 uppercase">Your Account Holder</label>
                          <input 
                            type="text" 
                            required={paymentMethod === 'bank'}
                            value={senderAccountNum}
                            onChange={(e) => setSenderAccountNum(e.target.value)}
                            placeholder="e.g. Mukhtaar Ahmed"
                            className="w-full bg-white border border-brand-clay/15 focus:border-brand-clay rounded-xl px-4 py-3 text-sm font-sans focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-full text-white font-display font-bold text-sm bg-brand-clay hover:bg-brand-clay-dark active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {paymentMethod === 'card' ? 'Authorize Stripe Payment' : 'Confirm & File Bank Transfer'}
                  </span>
                </button>
              </form>
            )}

            {/* STEP 2: PROCESSING IN PROGRESS */}
            {checkoutStep === 'processing' && (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 border-4 border-brand-clay border-t-transparent rounded-full animate-spin mx-auto" />
                <h3 className="font-display text-lg font-bold text-brand-clay">
                  {paymentMethod === 'card' ? 'Securing your credit transaction...' : 'Registering bank payment reference...'}
                </h3>
                <p className="text-xs text-brand-clay/60 max-w-xs mx-auto">
                  {paymentMethod === 'card' 
                    ? 'Please do not refresh the browser page. Processing secure transaction with Stripe token validation.'
                    : 'Awaiting instant confirmation from Cozy Reserve Bank clearing network.'
                  }
                </p>
              </div>
            )}

            {/* STEP 3: INVOICE RECEIPT SCREEN */}
            {checkoutStep === 'success' && (
              <div className="space-y-6 animate-fadeIn text-brand-clay">
                
                {/* Invoice Success Toast Header */}
                <div className="text-center pb-2 border-b border-brand-clay/10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-mint/30 text-brand-mint-dark mb-3 animate-bounce">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-black tracking-tight text-brand-clay-dark">Order Confirmed!</h3>
                  <p className="text-xs text-brand-clay/70 mt-1">Thank you for your purchase. Your official invoice has been generated below.</p>
                </div>

                {/* THE INVOICE SHEET (Styled like paper invoice) */}
                <div id="malow-invoice" className="bg-white border border-brand-clay/15 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6 relative overflow-hidden select-all">
                  
                  {/* Decorative Invoice Top Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-peach via-brand-cream to-brand-mint" />

                  {/* Invoice Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      {/* Logo / Brand */}
                      <span className="font-display font-black text-xl text-brand-clay tracking-tight">malow<span className="text-brand-peach">.</span></span>
                      <p className="text-[10px] font-mono text-brand-clay/50 mt-1 uppercase tracking-wider">Organic Childrenswear Boutique</p>
                    </div>

                    <div className="text-left sm:text-right space-y-1">
                      <div className="inline-block px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider bg-brand-mint/30 text-brand-mint-dark border border-brand-mint-dark/10">
                        {paymentMethod === 'card' ? 'Invoice: Paid' : 'Invoice: Bank Logged'}
                      </div>
                      <p className="font-mono text-xs font-bold text-brand-clay/80 mt-1">
                        Invoice ID: <span className="font-black text-brand-clay-dark">{invoiceNumber}</span>
                      </p>
                      <p className="text-[11px] text-brand-clay/60">
                        Date: {invoiceDate}
                      </p>
                    </div>
                  </div>

                  {/* Client & Payment Info Block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-clay/5 text-xs">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-sans font-black text-brand-clay/40 uppercase tracking-widest block">Shipped &amp; Billed To</span>
                      <p className="font-bold text-brand-clay-dark text-sm">{fullName}</p>
                      <p className="text-brand-clay/80 leading-relaxed font-sans">{shippingAddress}</p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-sans font-black text-brand-clay/40 uppercase tracking-widest block">Payment Information</span>
                      <p className="font-bold text-brand-clay-dark">
                        {paymentMethod === 'card' ? '🔒 Stripe Card Payment' : '🏦 Direct Bank Clearing'}
                      </p>
                      <p className="text-brand-clay/80 font-sans leading-relaxed">
                        {paymentMethod === 'card' ? (
                          <>Authorized via Stripe Gateway<br />Card Ref: **** **** **** 4242</>
                        ) : (
                          <>
                            Bank: <strong className="font-semibold">{senderBankName}</strong><br />
                            Sender: <strong className="font-semibold">{senderAccountNum}</strong><br />
                            Required Ref: <strong className="font-mono text-brand-peach-dark">{bankReference}</strong>
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Invoice Itemized List */}
                  <div className="space-y-2.5 pt-4 border-t border-brand-clay/5">
                    <span className="text-[10px] font-sans font-black text-brand-clay/40 uppercase tracking-widest block">Itemized Details</span>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-brand-clay/10 text-brand-clay/50 font-sans font-bold text-[10px] uppercase">
                            <th className="pb-2">Product Description</th>
                            <th className="pb-2 text-center">Qty</th>
                            <th className="pb-2 text-right">Unit Price</th>
                            <th className="pb-2 text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-clay/5 font-sans">
                          {cart.map((item, index) => (
                            <tr key={index} className="text-brand-clay">
                              <td className="py-2.5 pr-2">
                                <span className="font-bold text-brand-clay-dark">{item.product.name}</span>
                                <span className="block text-[10px] text-brand-clay/60">
                                  Size: {item.size} • Color: {item.product.colorName}
                                </span>
                              </td>
                              <td className="py-2.5 text-center font-bold text-brand-clay/80">{item.quantity}</td>
                              <td className="py-2.5 text-right text-brand-clay/80">${item.product.price.toFixed(2)}</td>
                              <td className="py-2.5 text-right font-bold text-brand-clay-dark">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Tax & Total Summary */}
                  <div className="pt-4 border-t border-brand-clay/10 flex justify-end">
                    <div className="w-full sm:w-64 space-y-2 text-xs">
                      <div className="flex justify-between text-brand-clay/60">
                        <span>Subtotal:</span>
                        <span className="font-medium text-brand-clay">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-brand-clay/60">
                        <span>Shipping &amp; Handling:</span>
                        <span>{shippingCost === 0 ? <strong className="text-brand-mint-dark font-bold">FREE</strong> : `$${shippingCost.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-brand-clay/60">
                        <span>Estimated Sales Tax (8%):</span>
                        <span className="font-medium text-brand-clay">${taxCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t border-brand-clay/10 pt-2 font-display font-black text-brand-clay-dark text-sm bg-brand-cream/50 p-2 rounded-xl">
                        <span>Grand Total Paid:</span>
                        <span>${totalCost.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom stamp or code */}
                  <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-brand-clay/5 gap-2 text-[10px] text-brand-clay/40 font-mono">
                    <span>TRACKING CODE: MB-{paymentMethod === 'card' ? 'STRIPE' : 'BANK'}-{(Math.random() * 100000).toFixed(0)}</span>
                    <span className="italic font-sans text-center sm:text-right">Thank you for choosing organic childhoods. 🌿</span>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        window.print();
                      } catch (e) {
                        alert('Printing not supported in this frame. Please copy invoice details or capture a screenshot!');
                      }
                    }}
                    className="flex-1 py-3.5 rounded-full text-brand-clay font-sans font-bold text-xs border border-brand-clay/20 bg-white hover:bg-brand-peach/10 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Print or Save PDF</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      clearCart();
                      setShowCheckoutModal(false);
                      setCheckoutStep('form');
                      setScreen('track');
                    }}
                    className="flex-1 py-3.5 rounded-full text-white font-display font-bold text-xs bg-brand-mint-dark hover:bg-brand-mint-dark/95 active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Track Shipment Status</span>
                  </button>
                  <button 
                    type="button"
                    onClick={handleFinishCheckout}
                    className="flex-1 py-3.5 rounded-full text-brand-clay font-display font-bold text-xs border border-brand-clay/25 hover:bg-brand-beige active:scale-95 transition-all shadow-sm flex items-center justify-center cursor-pointer"
                  >
                    Return to Boutique
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
