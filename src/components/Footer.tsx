import { Globe, Share2, Info } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 py-16 bg-brand-beige border-t border-brand-clay/10 text-center px-4">
      <div className="max-w-[600px] mx-auto space-y-6">
        <h3 className="font-display text-3xl font-extrabold text-brand-clay tracking-tight">
          MALOW BEYB
        </h3>
        
        <p className="text-brand-clay-dark/70 font-sans text-sm sm:text-base leading-relaxed">
          Thoughtfully curated premium essentials for your little ones, crafted with ultimate love, soft textures, and organic integrity.
        </p>
        
        {/* Subtle Socials / Interactions */}
        <div className="flex justify-center gap-6 py-4">
          <button 
            onClick={() => alert('Welcome to Malow Beyb! We ship 100% GOTS-certified baby apparel globally.')}
            className="p-3 bg-white hover:bg-brand-peach/10 text-brand-clay rounded-full shadow-sm hover:shadow active:scale-90 transition-all cursor-pointer"
            title="Global Presence"
          >
            <Globe className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Malow Beyb Shop',
                  text: 'Check out the softest organic baby apparel with puffy styling at Malow Beyb!',
                  url: window.location.href,
                }).catch(() => {});
              } else {
                alert('Shared Malow Beyb boutique link!');
              }
            }}
            className="p-3 bg-white hover:bg-brand-peach/10 text-brand-clay rounded-full shadow-sm hover:shadow active:scale-90 transition-all cursor-pointer"
            title="Share Boutique"
          >
            <Share2 className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => alert('Malow Beyb is a premium baby clothing experience. This collection features standard sizing from 0-12 months made from pure, double-layered quilted cotton.')}
            className="p-3 bg-white hover:bg-brand-peach/10 text-brand-clay rounded-full shadow-sm hover:shadow active:scale-90 transition-all cursor-pointer"
            title="Information Guide"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>

        <div className="pt-6 border-t border-brand-clay/5">
          <p className="text-xs text-brand-clay/60 font-sans tracking-wide">
            &copy; 2026 Malow Beyb Shop. All rights reserved. Made for tiny happy humans.
          </p>
        </div>
      </div>
    </footer>
  );
}
