import { useState, useEffect, FormEvent } from 'react';
import { Star, Heart, ShoppingBag, ArrowLeft, Shield, RefreshCw, Truck, Check, MessageSquare, AlertCircle, ThumbsUp, Award } from 'lucide-react';
import { Product, ScreenType, ProductReview } from '../types';
import { ALL_PRODUCTS, RELATED_PRODUCTS } from '../data';

interface DetailViewProps {
  productId: string;
  setScreen: (screen: ScreenType) => void;
  setSelectedProductId: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  addToCart: (product: Product, size: string, color: string) => void;
  user: { name: string; email: string } | null;
}

const DEFAULT_REVIEWS: Record<string, ProductReview[]> = {
  'essential-ribbed-romper': [
    {
      id: 'rev-1',
      productId: 'essential-ribbed-romper',
      author: 'Sarah Jenkins',
      rating: 5,
      comment: 'The softest romper we own! It is so gentle on my baby’s skin. The wooden buttons are a beautiful touch, and it stretches perfectly as she grows.',
      date: 'June 28, 2026',
      verifiedBuyer: true,
      sizePurchased: '3-6 Months'
    },
    {
      id: 'rev-2',
      productId: 'essential-ribbed-romper',
      author: 'Liam Patterson',
      rating: 4,
      comment: 'Excellent quality organic cotton. Only minor complaint is it runs slightly large, but that just means it will last longer. Washed it three times already and no pilling!',
      date: 'July 2, 2026',
      verifiedBuyer: true,
      sizePurchased: '0-3 Months'
    }
  ],
  'newborn-knitted-set': [
    {
      id: 'rev-3',
      productId: 'newborn-knitted-set',
      author: 'Emily Watson',
      rating: 5,
      comment: 'This set is absolutely darling! We took our newborn announcement photos in it and received so many compliments. Warm but very breathable knit.',
      date: 'July 1, 2026',
      verifiedBuyer: true,
      sizePurchased: '0-3 Months'
    }
  ],
  'daily-onesie-bundle': [
    {
      id: 'rev-4',
      productId: 'daily-onesie-bundle',
      author: 'Michael R.',
      rating: 5,
      comment: 'Incredible value for premium GOTS cotton. The colors are even prettier in person—very soft and natural earthy tones. The envelope shoulders make diaper changes so much easier.',
      date: 'June 15, 2026',
      verifiedBuyer: true,
      sizePurchased: '3-6 Months'
    },
    {
      id: 'rev-5',
      productId: 'daily-onesie-bundle',
      author: 'Grace H.',
      rating: 4,
      comment: 'Very soft onesies. Standard fit and hold up really well in the wash. Perfect for layering under sleeping sacks.',
      date: 'June 22, 2026',
      verifiedBuyer: true,
      sizePurchased: '6-12 Months'
    }
  ]
};

const getGenericReviews = (productId: string): ProductReview[] => [
  {
    id: `rev-gen-1-${productId}`,
    productId,
    author: 'Olivia Bennett',
    rating: 5,
    comment: 'The craftsmanship on this is exceptional. The GOTS certified organic fibers are so soft and safe. Our little one sleeps so peacefully in it.',
    date: 'July 4, 2026',
    verifiedBuyer: true,
    sizePurchased: 'One Size'
  },
  {
    id: `rev-gen-2-${productId}`,
    productId,
    author: 'Daniel Craig',
    rating: 5,
    comment: 'Unbelievably soft fabric and excellent construction. Definitely worth the price for organic, ethically made babywear.',
    date: 'July 6, 2026',
    verifiedBuyer: true,
    sizePurchased: '3-6 Months'
  }
];

export default function DetailView({
  productId,
  setScreen,
  setSelectedProductId,
  favorites,
  toggleFavorite,
  addToCart,
  user
}: DetailViewProps) {
  
  // Find current product
  const product = ALL_PRODUCTS.find(p => p.id === productId) || ALL_PRODUCTS[0];

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState('');
  const [addingToBag, setAddingToBag] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Reviews systems states
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [selectedReviewSize, setSelectedReviewSize] = useState<string>('');
  const [isPurchased, setIsPurchased] = useState<boolean>(false);
  const [hasCheckedPurchase, setHasCheckedPurchase] = useState<boolean>(false);
  const [reviewSubmitSuccess, setReviewSubmitSuccess] = useState<boolean>(false);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});
  const [clickedHelpful, setClickedHelpful] = useState<Record<string, boolean>>({});

  // Sync active image and load product reviews if product changes
  useEffect(() => {
    setActiveImage(product.image);
    // Auto select first size as default
    const firstSize = product.sizes.includes('One Size') ? 'One Size' : product.sizes[0] || '';
    setSelectedSize(firstSize);

    // Check purchase history for verified badge
    const checkPurchaseStatus = () => {
      try {
        const orders = JSON.parse(localStorage.getItem('malow_placed_orders') || '[]');
        const hasBought = orders.some((order: any) => 
          order.items.some((item: any) => item.name.toLowerCase() === product.name.toLowerCase())
        );
        setIsPurchased(hasBought);
      } catch (err) {
        setIsPurchased(false);
      }
    };
    checkPurchaseStatus();

    // Fetch product reviews
    try {
      const saved = localStorage.getItem(`malow_reviews_${product.id}`);
      if (saved) {
        setReviews(JSON.parse(saved));
      } else {
        const seeded = DEFAULT_REVIEWS[product.id] || getGenericReviews(product.id);
        setReviews(seeded);
        localStorage.setItem(`malow_reviews_${product.id}`, JSON.stringify(seeded));
      }
    } catch (err) {
      console.error(err);
    }

    // Reset review input form state
    setComment('');
    setRating(5);
    setAuthorName(user?.name || '');
    setReviewSubmitSuccess(false);
    setSelectedReviewSize(product.sizes[0] || '3-6 Months');
  }, [product, user, hasCheckedPurchase]);

  const isFav = favorites.includes(product.id);

  const handleAddClick = () => {
    if (!selectedSize) {
      alert('Please select a size first.');
      return;
    }
    setAddingToBag(true);
    
    setTimeout(() => {
      addToCart(product, selectedSize, product.colorName);
      setAddingToBag(false);
      setJustAdded(true);
      
      setTimeout(() => {
        setJustAdded(false);
      }, 2000);
    }, 800);
  };

  const handleRelatedClick = (relatedId: string) => {
    setSelectedProductId(relatedId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const finalAuthor = authorName.trim() || user?.name || 'Anonymous Parent';

    const newReview: ProductReview = {
      id: 'REV-' + Math.floor(Math.random() * 90000 + 10000),
      productId: product.id,
      author: finalAuthor,
      rating: rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      verifiedBuyer: isPurchased,
      sizePurchased: selectedReviewSize || undefined
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`malow_reviews_${product.id}`, JSON.stringify(updatedReviews));

    setComment('');
    setRating(5);
    setReviewSubmitSuccess(true);

    setTimeout(() => {
      setReviewSubmitSuccess(false);
    }, 4000);
  };

  const handleSimulatePurchase = () => {
    try {
      const orders = JSON.parse(localStorage.getItem('malow_placed_orders') || '[]');
      const newOrder = {
        orderId: 'INV-2026-' + Math.floor(Math.random() * 900000 + 100000),
        fullName: user?.name || 'Jane Doe',
        shippingAddress: '123 Cozy Lane, Comfort Hills CA 90210',
        items: [{
          name: product.name,
          price: product.price,
          quantity: 1,
          size: selectedSize || product.sizes[0] || '0-3 Months',
          color: product.colorName,
          image: product.image
        }],
        subtotal: product.price,
        shippingCost: 0,
        taxCost: Number((product.price * 0.08).toFixed(2)),
        totalCost: Number((product.price * 1.08).toFixed(2)),
        paymentMethod: 'Simulated Purchase Bypass',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        status: 'Delivered',
        timeline: []
      };
      orders.push(newOrder);
      localStorage.setItem('malow_placed_orders', JSON.stringify(orders));
      setHasCheckedPurchase(prev => !prev);
      alert(`Verified purchase simulated for "${product.name}"! You are now authorized to submit reviews. 🍼👶`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleHelpfulClick = (reviewId: string) => {
    if (clickedHelpful[reviewId]) return;

    setHelpfulCounts(prev => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1
    }));
    setClickedHelpful(prev => ({
      ...prev,
      [reviewId]: true
    }));
  };

  // Dynamic average rating and count
  const totalReviewsCount = reviews.length;
  const averageRating = totalReviewsCount > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviewsCount).toFixed(1)
    : (product.rating || 4.8).toFixed(1);

  // 1-star (index 0) to 5-star (index 4) counts
  const ratingDistribution = [0, 0, 0, 0, 0];
  reviews.forEach(r => {
    const starIdx = Math.min(Math.max(1, Math.round(r.rating)), 5) - 1;
    ratingDistribution[starIdx]++;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-6 space-y-12 animate-fadeIn pb-24">
      
      {/* Back button and breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button 
          onClick={() => setScreen('shop')}
          className="flex items-center gap-2 text-brand-clay font-display text-sm font-bold hover:opacity-80 active:scale-95 transition-all cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </button>
        
        <nav className="flex items-center gap-2 text-brand-clay/50 font-sans text-xs">
          <button onClick={() => setScreen('home')} className="hover:text-brand-clay cursor-pointer">Home</button>
          <span>/</span>
          <button onClick={() => setScreen('shop')} className="hover:text-brand-clay cursor-pointer">Shop</button>
          <span>/</span>
          <span className="text-brand-clay font-bold font-display">{product.category}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Gallery Section */}
        <section className="space-y-4">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden puffy-card bg-brand-beige/30 relative border border-brand-clay/5">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-brand-peach text-brand-peach-dark px-4 py-1.5 rounded-full font-display font-bold text-xs shadow-sm uppercase">
                New Collection
              </span>
            )}
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-brand-mint text-brand-mint-dark px-4 py-1.5 rounded-full font-display font-bold text-xs shadow-sm uppercase">
                Best Seller
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.thumbnails && product.thumbnails.length > 1 && (
            <div className="flex gap-4 overflow-x-auto py-2">
              {product.thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(thumb)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 puffy-card cursor-pointer focus:outline-none ${
                    activeImage === thumb 
                      ? 'border-brand-clay scale-95 shadow-md' 
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={thumb} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Product Details Section */}
        <section className="flex flex-col justify-start space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-brand-clay leading-tight">
              {product.name}
            </h2>
            <p className="text-brand-clay/60 font-sans text-xs uppercase tracking-widest">{product.colorName} Edition</p>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-display font-extrabold text-brand-clay text-2xl sm:text-3xl">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex items-center gap-1.5 bg-brand-peach/20 px-3 py-1 rounded-full text-brand-mint-dark">
              <Star className="w-4 h-4 fill-brand-clay text-brand-clay" />
              <span className="font-sans text-xs font-bold text-brand-clay">{averageRating}</span>
              <span className="text-[11px] font-sans text-brand-clay/60">({totalReviewsCount} {totalReviewsCount === 1 ? 'Review' : 'Reviews'})</span>
            </div>
          </div>

          {/* About the Fabric block */}
          <div className="p-6 bg-brand-beige rounded-2xl border border-brand-clay/5 puffy-shadow space-y-3">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-brand-clay">
              About the Fabric
            </h4>
            <p className="text-brand-clay-dark/85 font-sans text-sm sm:text-base leading-relaxed">
              Handcrafted from our signature <span className="text-brand-mint-dark font-bold font-display">Cloud-Touch™ Organic Cotton</span>. This GOTS-certified fabric is double-layered for a puffy, quilted feel that provides gentle warmth without overheating. Breathable, hypoallergenic, and incredibly soft against delicate newborn skin.
            </p>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="font-display text-xs font-bold uppercase tracking-wider text-brand-clay/70">
                Select Size
              </label>
              <button 
                onClick={() => alert('Sizing Guide:\n- 0-3M: Weight 7-12 lbs, Height 18-24 in\n- 3-6M: Weight 12-17 lbs, Height 24-27 in\n- 6-12M: Weight 17-22 lbs, Height 27-30 in')}
                className="text-brand-clay underline font-sans text-xs font-semibold cursor-pointer hover:opacity-80"
              >
                Size Guide
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-3 rounded-full border-2 text-xs font-bold font-sans uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none ${
                    selectedSize === size
                      ? 'border-brand-clay bg-brand-clay text-white shadow-md'
                      : 'border-brand-clay/10 text-brand-clay/70 hover:border-brand-clay/30 hover:bg-brand-beige'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Callouts */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddClick}
              disabled={addingToBag}
              className={`flex-grow py-4.5 px-8 rounded-full font-display font-bold text-sm text-white flex items-center justify-center gap-3 shadow-md select-none transition-all duration-300 cursor-pointer ${
                justAdded 
                  ? 'bg-brand-mint-dark' 
                  : 'puffy-btn-primary'
              }`}
            >
              {addingToBag ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Adding to Bag...</span>
                </>
              ) : justAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            <button
              onClick={() => toggleFavorite(product.id)}
              className={`p-4 rounded-full border-2 flex items-center justify-center active:scale-90 transition-all duration-200 cursor-pointer focus:outline-none ${
                isFav 
                  ? 'border-red-400 bg-red-50 text-red-500' 
                  : 'border-brand-clay/15 text-brand-clay hover:bg-brand-beige'
              }`}
              title={isFav ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Heart className="w-5 h-5" fill={isFav ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Micro-Badges Trust Signals */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-clay/10">
            <div className="flex flex-col items-center text-center gap-1.5 select-none">
              <Shield className="w-5 h-5 text-brand-mint-dark" />
              <span className="font-display text-[10px] font-bold text-brand-clay/80 uppercase">100% Organic</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5 select-none">
              <RefreshCw className="w-5 h-5 text-brand-mint-dark" />
              <span className="font-display text-[10px] font-bold text-brand-clay/80 uppercase">Machine Wash</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5 select-none">
              <Truck className="w-5 h-5 text-brand-mint-dark" />
              <span className="font-display text-[10px] font-bold text-brand-clay/80 uppercase">Eco Shipping</span>
            </div>
          </div>

        </section>
      </div>

      {/* Product Reviews Section */}
      <section id="product-reviews-section" className="pt-16 border-t border-brand-clay/10 space-y-8 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-brand-clay tracking-tight flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-mint-dark" />
              <span>Parent Experiences & Feedback</span>
            </h3>
            <p className="text-brand-clay/60 font-sans text-xs uppercase tracking-wider mt-1">Real reviews from our mindful nursery community</p>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs font-sans text-brand-clay/50 bg-brand-beige/50 px-4 py-2 rounded-full border border-brand-clay/5">
            <Shield className="w-3.5 h-3.5 text-brand-mint-dark" />
            <span>GOTS Organic Quality Assured</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Rating breakdown card */}
          <div id="rating-statistics-card" className="lg:col-span-4 bg-brand-beige/40 p-6 rounded-2xl border border-brand-clay/5 puffy-shadow space-y-6">
            <div className="space-y-2 text-center lg:text-left">
              <p className="font-display text-xs font-bold uppercase tracking-wider text-brand-clay/60">Overall Satisfaction</p>
              <div className="flex items-baseline justify-center lg:justify-start gap-1">
                <span className="font-display font-extrabold text-brand-clay text-5xl tracking-tight">{averageRating}</span>
                <span className="font-sans text-brand-clay/40 text-sm">/ 5.0</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1 text-brand-clay">
                {[1, 2, 3, 4, 5].map((star) => {
                  const ratingNum = parseFloat(averageRating);
                  const isFilled = star <= Math.round(ratingNum);
                  return (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 ${isFilled ? 'fill-brand-clay text-brand-clay' : 'text-brand-clay/20'}`} 
                    />
                  );
                })}
              </div>
              <p className="text-xs font-sans text-brand-clay/50 font-medium">Based on {totalReviewsCount} {totalReviewsCount === 1 ? 'parent rating' : 'parent ratings'}</p>
            </div>

            {/* Distribution bars */}
            <div className="space-y-2 pt-4 border-t border-brand-clay/10">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingDistribution[star - 1];
                const percentage = totalReviewsCount > 0 ? Math.round((count / totalReviewsCount) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-3 text-xs font-sans">
                    <span className="w-3 text-right text-brand-clay/60 font-bold">{star}</span>
                    <Star className="w-3.5 h-3.5 text-brand-clay/35 fill-brand-clay/10" />
                    <div className="flex-grow h-2 bg-brand-clay/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-clay rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-brand-clay/40">{percentage}%</span>
                  </div>
                );
              })}
            </div>

            {/* Verification Status & Simulator */}
            <div className="pt-4 border-t border-brand-clay/10">
              {isPurchased ? (
                <div className="p-4 bg-brand-mint/15 text-brand-mint-dark rounded-xl border border-brand-mint/20 flex items-start gap-2.5">
                  <Award className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-display text-xs font-bold uppercase tracking-wider">Purchase Verified</p>
                    <p className="text-[11px] font-sans mt-0.5 leading-relaxed opacity-90">
                      Our system detected this organic product in your order history! Your review form is unlocked.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-brand-peach/15 text-brand-clay rounded-xl border border-brand-clay/10 flex flex-col gap-3">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-brand-clay/60 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-display text-xs font-bold uppercase tracking-wider text-brand-clay">Verified Buyer Review Lock</p>
                      <p className="text-[11px] font-sans mt-0.5 leading-relaxed text-brand-clay/70">
                        To guarantee honest reviews, only parents who have completed a purchase of this product can submit ratings.
                      </p>
                    </div>
                  </div>
                  
                  {/* Sandbox Purchase simulator button */}
                  <button
                    type="button"
                    onClick={handleSimulatePurchase}
                    className="w-full py-2.5 px-4 bg-brand-clay text-white rounded-full font-display font-bold text-[11px] uppercase tracking-wider hover:bg-brand-clay-dark active:scale-95 transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Simulate Verified Purchase</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Submission Form + Reviews list */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Conditional review writer form */}
            {isPurchased && (
              <div id="review-submission-form-container" className="bg-white p-6 rounded-2xl border-2 border-brand-mint-dark/15 puffy-shadow space-y-4">
                <div className="flex items-center gap-2 border-b border-brand-clay/5 pb-3">
                  <Award className="w-5 h-5 text-brand-mint-dark" />
                  <h4 className="font-display text-sm font-extrabold text-brand-clay">Write Your Verified Parent Review</h4>
                </div>

                {reviewSubmitSuccess ? (
                  <div className="p-4 bg-brand-mint/15 text-brand-mint-dark rounded-xl border border-brand-mint/20 text-center space-y-1 py-6">
                    <p className="font-display text-sm font-extrabold">Thank you for sharing your experience! 🌸</p>
                    <p className="text-xs font-sans opacity-95">Your certified review has been successfully posted to our mindful boutique database.</p>
                  </div>
                ) : (
                  <form id="review-submission-form" onSubmit={handleReviewSubmit} className="space-y-4">
                    
                    {/* Star selector */}
                    <div className="space-y-1">
                      <label className="font-display text-[10px] font-bold uppercase tracking-wider text-brand-clay/60">Your Rating</label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((starVal) => {
                          const isFilled = starVal <= (hoverRating || rating);
                          return (
                            <button
                              key={starVal}
                              type="button"
                              onClick={() => setRating(starVal)}
                              onMouseEnter={() => setHoverRating(starVal)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="p-0.5 cursor-pointer transition-transform duration-150 active:scale-125 focus:outline-none"
                            >
                              <Star 
                                className={`w-6 h-6 ${
                                  isFilled ? 'fill-brand-clay text-brand-clay' : 'text-brand-clay/20'
                                }`} 
                              />
                            </button>
                          );
                        })}
                        <span className="font-sans text-xs font-bold text-brand-clay/50 ml-2">
                          {rating === 5 ? 'Loved it!' : rating === 4 ? 'Very good' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1">
                        <label className="font-display text-[10px] font-bold uppercase tracking-wider text-brand-clay/60">Your Name</label>
                        <input 
                          id="review-author-input"
                          type="text" 
                          required
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          placeholder="e.g. Eleanor Vance"
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-clay/10 font-sans text-xs text-brand-clay bg-brand-beige/20 focus:outline-none focus:border-brand-clay"
                        />
                      </div>

                      {/* Size Selection */}
                      <div className="space-y-1">
                        <label className="font-display text-[10px] font-bold uppercase tracking-wider text-brand-clay/60">Size Purchased</label>
                        <select
                          id="review-size-select"
                          value={selectedReviewSize}
                          onChange={(e) => setSelectedReviewSize(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-clay/10 font-sans text-xs text-brand-clay bg-brand-beige/20 focus:outline-none focus:border-brand-clay"
                        >
                          {product.sizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Comment text area */}
                    <div className="space-y-1">
                      <label className="font-display text-[10px] font-bold uppercase tracking-wider text-brand-clay/60">Comment</label>
                      <textarea
                        id="review-comment-textarea"
                        required
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts on the texture, fit, GOTS organic touch, and how it washes..."
                        className="w-full px-4 py-3 rounded-xl border border-brand-clay/10 font-sans text-xs text-brand-clay bg-brand-beige/20 focus:outline-none focus:border-brand-clay resize-none"
                      />
                    </div>

                    <button
                      id="review-submit-button"
                      type="submit"
                      className="puffy-btn-primary py-3 px-6 rounded-full text-xs font-display font-bold text-white tracking-wider uppercase cursor-pointer hover:opacity-95 active:scale-95 transition-all shadow-md inline-flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Submit Parent Review</span>
                    </button>

                  </form>
                )}
              </div>
            )}

            {/* List of reviews */}
            <div id="product-reviews-list" className="space-y-4">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-brand-clay/60 border-b border-brand-clay/5 pb-2">
                Parent Feedback Log ({reviews.length})
              </h4>

              {reviews.length === 0 ? (
                <div className="text-center py-8 text-brand-clay/40 font-sans text-xs bg-brand-beige/10 rounded-2xl border border-brand-clay/5 border-dashed">
                  No feedback left yet. Be the first to purchase this item and write a review!
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div 
                      key={review.id} 
                      id={`review-item-card-${review.id}`}
                      className="bg-white p-5 rounded-2xl border border-brand-clay/5 puffy-shadow flex flex-col gap-3 transition-transform hover:-translate-y-0.5 duration-300"
                    >
                      {/* Header block with Star indicators and author */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          {/* Stars */}
                          <div className="flex items-center gap-0.5 text-brand-clay">
                            {[1, 2, 3, 4, 5].map((starIdx) => (
                              <Star 
                                key={starIdx} 
                                className={`w-3.5 h-3.5 ${starIdx <= review.rating ? 'fill-brand-clay text-brand-clay' : 'text-brand-clay/15'}`} 
                              />
                            ))}
                          </div>
                          
                          <span className="font-display font-bold text-brand-clay text-sm">{review.author}</span>
                          
                          {review.verifiedBuyer && (
                            <span className="bg-brand-mint/15 text-brand-mint-dark font-sans text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Check className="w-2.5 h-2.5" />
                              Verified Buyer
                            </span>
                          )}
                        </div>

                        <span className="font-sans text-[11px] text-brand-clay/40">{review.date}</span>
                      </div>

                      {/* Size detail */}
                      {review.sizePurchased && (
                        <div className="font-sans text-[11px] text-brand-clay/50">
                          Selected size: <span className="font-bold text-brand-clay/75">{review.sizePurchased}</span>
                        </div>
                      )}

                      {/* Comment text */}
                      <p className="font-sans text-xs text-brand-clay-dark/85 leading-relaxed bg-brand-beige/10 p-3 rounded-xl border border-brand-clay/5">
                        "{review.comment}"
                      </p>

                      {/* Thumbs up / Helpful block */}
                      <div className="flex items-center justify-between border-t border-brand-clay/5 pt-2.5 mt-1">
                        <button
                          type="button"
                          onClick={() => handleHelpfulClick(review.id)}
                          className={`flex items-center gap-1.5 text-[10px] font-sans font-bold py-1 px-3 rounded-full border transition-all cursor-pointer ${
                            clickedHelpful[review.id] 
                              ? 'bg-brand-mint/15 text-brand-mint-dark border-brand-mint/30' 
                              : 'text-brand-clay/40 border-brand-clay/10 hover:bg-brand-beige hover:text-brand-clay'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>Helpful ({helpfulCounts[review.id] || 0})</span>
                        </button>

                        <div className="font-sans text-[9px] text-brand-clay/30 uppercase tracking-widest">
                          GOTS certified organic product
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Complete the Look Section */}
      <section className="pt-16 space-y-8 border-t border-brand-clay/10">
        <h3 className="font-display text-xl sm:text-2xl font-extrabold text-brand-clay text-center tracking-tight">
          Complete the Look
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {RELATED_PRODUCTS.map((related) => {
            const isRelatedFav = favorites.includes(related.id);
            return (
              <div 
                key={related.id}
                onClick={() => handleRelatedClick(related.id)}
                className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl border border-brand-clay/5 puffy-card overflow-hidden"
              >
                <div className="relative aspect-square bg-brand-beige/40 overflow-hidden">
                  <img 
                    src={related.image} 
                    alt={related.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Quick Heart overlay */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(related.id);
                    }}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all hover:bg-white active:scale-90 ${
                      isRelatedFav ? 'text-red-500' : 'text-brand-clay/50 hover:text-red-500'
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={isRelatedFav ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <p className="font-display text-xs font-bold text-brand-clay line-clamp-1 group-hover:text-brand-clay-dark">{related.name}</p>
                  <p className="text-xs text-brand-clay/50 mt-1 uppercase tracking-tight">{related.colorName}</p>
                  <p className="font-display font-extrabold text-brand-clay text-sm mt-auto pt-2">
                    ${related.price.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
