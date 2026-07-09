import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X, Check, ArrowRight, Eye, Sparkles, Inbox, AlertCircle, Trash2 } from 'lucide-react';
import { SimulatedEmail } from '../types';

interface SimulatedEmailTrayProps {
  emails: SimulatedEmail[];
  onClearAll: () => void;
}

export default function SimulatedEmailTray({ emails, onClearAll }: SimulatedEmailTrayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<SimulatedEmail | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastEmailCount, setLastEmailCount] = useState(0);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [latestEmail, setLatestEmail] = useState<SimulatedEmail | null>(null);

  // Monitor incoming simulated emails to trigger high-fidelity notification toasts
  useEffect(() => {
    if (emails.length > lastEmailCount) {
      const newlyDispatched = emails[emails.length - 1];
      setLatestEmail(newlyDispatched);
      setUnreadCount(prev => prev + (emails.length - lastEmailCount));
      
      // Auto-open or show custom alert toast
      setShowNotificationToast(true);
      const timer = setTimeout(() => {
        setShowNotificationToast(false);
      }, 5000);

      // Pre-select the newest email
      setSelectedEmail(newlyDispatched);

      setLastEmailCount(emails.length);
      return () => clearTimeout(timer);
    }
    setLastEmailCount(emails.length);
  }, [emails, lastEmailCount]);

  const handleOpenTray = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const handleSelectEmail = (email: SimulatedEmail) => {
    setSelectedEmail(email);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[120] select-none">
      
      {/* Floating Alert Toast for Dispatched Emails */}
      <AnimatePresence>
        {showNotificationToast && latestEmail && (
          <motion.div
            initial={{ opacity: 0, x: -100, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            onClick={() => {
              handleOpenTray();
              setShowNotificationToast(false);
            }}
            className="mb-3 bg-white border-2 border-brand-peach-dark/30 rounded-2xl p-4 shadow-xl flex items-start gap-3 max-w-sm cursor-pointer hover:border-brand-clay hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-9 h-9 rounded-full bg-brand-peach/20 text-brand-clay flex items-center justify-center animate-pulse mt-0.5 flex-shrink-0">
              <Mail className="w-5 h-5 text-brand-peach-dark" />
            </div>
            <div className="space-y-1 text-xs">
              <span className="bg-brand-peach/30 text-brand-clay font-bold text-[9px] uppercase px-2 py-0.5 rounded-full">
                Simulated Email Sent
              </span>
              <p className="font-bold text-brand-clay-dark truncate">{latestEmail.subject}</p>
              <p className="text-brand-clay/70 text-[11px]">
                To: <span className="font-semibold">{latestEmail.recipient}</span>
              </p>
              <p className="text-[10px] text-brand-peach-dark font-sans font-bold flex items-center gap-1 mt-1.5">
                <span>Click to open Simulated Outbox</span>
                <ArrowRight className="w-3 h-3" />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isOpen ? () => setIsOpen(false) : handleOpenTray}
        className={`flex items-center gap-2 px-4 py-3.5 rounded-full shadow-lg border cursor-pointer transition-all duration-300 ${
          isOpen 
            ? 'bg-brand-clay text-white border-brand-clay-dark' 
            : 'bg-white text-brand-clay hover:bg-brand-peach/10 border-brand-clay/15'
        }`}
      >
        <div className="relative">
          <Mail className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-brand-peach-dark text-white text-[10px] font-sans font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
              {unreadCount}
            </span>
          )}
        </div>
        <span className="text-xs font-sans font-black uppercase tracking-wider">
          {isOpen ? 'Close Outbox' : `Email Outbox (${emails.length})`}
        </span>
      </motion.button>

      {/* Outbox Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-16 left-0 w-[92vw] sm:w-[520px] md:w-[620px] h-[550px] bg-brand-cream border border-brand-clay/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header decor */}
            <div className="bg-brand-peach/20 px-5 py-4 flex justify-between items-center border-b border-brand-clay/5 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-white rounded-full text-brand-clay shadow-sm">
                  <Inbox className="w-4 h-4 text-brand-peach-dark" />
                </span>
                <div>
                  <span className="font-display font-black text-brand-clay uppercase tracking-widest text-xs block">
                    Boutique Email Sandbox
                  </span>
                  <span className="text-[10px] text-brand-clay/60 block font-sans">
                    Live triggers for VIP Parent Account creation &amp; checkouts
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {emails.length > 0 && (
                  <button
                    onClick={onClearAll}
                    className="p-1.5 text-brand-clay/50 hover:text-red-500 rounded-lg hover:bg-white transition-all text-xs font-sans font-semibold flex items-center gap-1 cursor-pointer"
                    title="Clear Mail Logs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Clear Log</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white text-brand-clay/60 hover:text-brand-clay active:scale-90 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Content Area: Split List & Preview */}
            <div className="flex-grow flex overflow-hidden">
              
              {emails.length === 0 ? (
                /* EMPTY MAILBOX STATE */
                <div className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-brand-peach/15 rounded-full flex items-center justify-center text-brand-clay/30 border border-brand-peach/20">
                    <Mail className="w-8 h-8 text-brand-peach" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-brand-clay text-sm">No Emails Sent Yet</h4>
                    <p className="text-xs text-brand-clay/60 max-w-xs leading-relaxed font-sans">
                      Complete a checkout in the shopping basket or register a new VIP Account to trigger high-fidelity simulated emails!
                    </p>
                  </div>
                  <div className="bg-brand-mint/20 border border-brand-mint-dark/15 p-3 rounded-xl max-w-xs text-[11px] text-brand-mint-dark font-sans leading-normal">
                    💡 Simulated notifications immediately print output logs inside the browser developer console as well!
                  </div>
                </div>
              ) : (
                /* MULTI-EMAIL SYSTEM VIEW */
                <div className="flex-grow flex divide-x divide-brand-clay/10 overflow-hidden">
                  
                  {/* LEFT COLUMN: SENT EMAILS LIST */}
                  <div className="w-1/3 sm:w-2/5 flex-shrink-0 flex flex-col bg-brand-beige/25 overflow-y-auto divide-y divide-brand-clay/5">
                    <div className="p-2.5 bg-brand-beige/10 text-[10px] font-sans font-bold text-brand-clay/40 uppercase tracking-wider">
                      Sent Outbox
                    </div>
                    {emails.slice().reverse().map((email) => {
                      const isSelected = selectedEmail?.id === email.id;
                      return (
                        <button
                          key={email.id}
                          onClick={() => handleSelectEmail(email)}
                          className={`w-full text-left p-3 flex flex-col gap-1 transition-all hover:bg-brand-peach/10 cursor-pointer ${
                            isSelected ? 'bg-brand-peach/20 border-r-2 border-brand-peach-dark' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start w-full">
                            <span className="text-[10px] font-mono font-bold text-brand-clay/40 truncate max-w-[50px]">
                              {email.id}
                            </span>
                            <span className="text-[9px] text-brand-clay/40 font-sans font-medium">
                              {email.timestamp}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-brand-clay line-clamp-1 leading-snug">
                            {email.subject}
                          </p>
                          <p className="text-[10px] text-brand-clay/60 truncate font-sans">
                            To: {email.recipient}
                          </p>
                          <span className={`inline-block w-fit text-[9px] px-1.5 py-0.5 rounded-md mt-1 font-sans font-bold ${
                            email.type === 'welcome' 
                              ? 'bg-brand-mint/30 text-brand-mint-dark border border-brand-mint/45' 
                              : 'bg-brand-lavender text-brand-clay border border-brand-clay/10'
                          }`}>
                            {email.type === 'welcome' ? 'welcome_email' : 'order_receipt'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* RIGHT COLUMN: RICH EMAIL BODY RENDERER */}
                  <div className="flex-grow flex flex-col bg-white overflow-y-auto">
                    {selectedEmail ? (
                      <div className="flex-grow flex flex-col">
                        
                        {/* Email Header Panel */}
                        <div className="p-4 border-b border-brand-clay/5 space-y-2 flex-shrink-0 bg-brand-cream/30 text-xs">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <p className="text-brand-clay/50 font-sans">
                                From: <strong className="text-brand-clay font-bold">{selectedEmail.sender}</strong>
                              </p>
                              <p className="text-brand-clay/50 font-sans mt-0.5">
                                To: <strong className="text-brand-clay font-bold">{selectedEmail.recipient}</strong>
                              </p>
                            </div>
                            <span className="font-mono text-[10px] bg-brand-beige border border-brand-clay/10 px-2 py-0.5 rounded text-brand-clay/60">
                              HTML Mailer
                            </span>
                          </div>
                          
                          <div className="pt-2 border-t border-brand-clay/5">
                            <h4 className="font-sans font-black text-sm text-brand-clay-dark leading-tight">
                              {selectedEmail.subject}
                            </h4>
                          </div>
                        </div>

                        {/* Email Body Iframe Preview Simulator */}
                        <div className="flex-grow p-4 bg-brand-beige/20 select-text overflow-y-auto">
                          <div 
                            className="bg-white border border-brand-clay/10 rounded-2xl p-4 sm:p-6 shadow-sm font-sans text-xs space-y-4 max-w-md mx-auto"
                            dangerouslySetInnerHTML={{ __html: selectedEmail.bodyHtml }}
                          />
                        </div>

                        {/* Email Footer Banner */}
                        <div className="p-3 bg-brand-cream/30 border-t border-brand-clay/5 text-center text-[10px] text-brand-clay/40 font-mono flex-shrink-0">
                          SMTP SIMULATION DISPATCH SUCCESS • CODE 250 OK
                        </div>

                      </div>
                    ) : (
                      <div className="flex-grow flex items-center justify-center text-center p-8 text-brand-clay/40 text-xs font-sans">
                        Select an email from the left sidebar to preview its raw HTML body
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
