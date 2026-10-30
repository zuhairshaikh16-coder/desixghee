import React, { useState } from 'react';
import { MessageCircle, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  singleItemDirect?: CartItem | null;
  onClearCart: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  items,
  singleItemDirect,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  if (!isOpen) return null;

  const orderItems = singleItemDirect ? [singleItemDirect] : items;
  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const itemsSummary = orderItems
      .map(
        (it) =>
          `• ${it.name} (${it.weightOrVolume}${it.sweetener ? `, ${it.sweetener}` : ''}) x ${it.quantity} = Rs. ${it.price * it.quantity}`
      )
      .join('\n');

    const message = `*✨ New Order: Shuddh Desi Ghee & Artisanal Panjiri ✨*

*Customer Details:*
• Name: ${customerName || 'Customer'}
• Phone: ${phone || 'Not provided'}
• City: ${city || 'Not specified'}
• Address: ${address || 'To be shared on chat'}

*Ordered Items:*
${itemsSummary}

*Total Amount:* Rs. ${totalAmount}
*Packaging:* Royal Brass Tin / Vacuum Fresh Airtight Packaging
*Special Request:* ${notes || 'None'}

_Ref: @desixghee.insta Web Order_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setOrderSubmitted(true);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#18110a] border border-amber-600/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#302112] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-xl text-white">
                Complete Your Order
              </h3>
              <p className="text-xs text-[#a89582]">
                Direct hand-roasted batch dispatch with tracking
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#a89582] hover:text-white text-sm font-semibold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {orderSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="font-serif-luxury text-2xl font-bold text-white">
              Order Dispatched to WhatsApp!
            </h4>
            <p className="text-xs text-[#baa792] max-w-sm mx-auto leading-relaxed">
              Your order message has opened in WhatsApp. Our kitchen team will confirm your batch roasting slot and share payment & dispatch details shortly.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setOrderSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase cursor-pointer"
              >
                Back to Store
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendWhatsApp} className="space-y-4">
            
            {/* Order Preview Mini Box */}
            <div className="p-3.5 rounded-xl bg-[#120d07] border border-[#2e1f11] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-400">
                <span>Items in Order:</span>
                <span className="font-mono text-white text-sm font-bold">Total: Rs. {totalAmount}</span>
              </div>
              <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                {orderItems.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-[11px] text-[#baa792]">
                    <span className="truncate max-w-[200px]">
                      {it.name} ({it.weightOrVolume}) x {it.quantity}
                    </span>
                    <span className="font-mono text-amber-200">Rs. {it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                  Full Name:
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Aditi Sharma"
                  className="w-full mt-1 bg-[#100b06] border border-[#332212] focus:border-amber-500 text-xs text-[#f5ebd9] rounded-lg p-2.5 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                    WhatsApp Phone Number:
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full mt-1 bg-[#100b06] border border-[#332212] focus:border-amber-500 text-xs text-[#f5ebd9] rounded-lg p-2.5 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                    City:
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Delhi / Mumbai / Lahore"
                    className="w-full mt-1 bg-[#100b06] border border-[#332212] focus:border-amber-500 text-xs text-[#f5ebd9] rounded-lg p-2.5 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                  Delivery Address:
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House number, Street, Landmark, Pin code..."
                  className="w-full mt-1 bg-[#100b06] border border-[#332212] focus:border-amber-500 text-xs text-[#f5ebd9] rounded-lg p-2.5 outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                  Special Notes / Gift Message:
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Extra cardamom, gift ribbon for new mother..."
                  className="w-full mt-1 bg-[#100b06] border border-[#332212] focus:border-amber-500 text-xs text-[#f5ebd9] rounded-lg p-2.5 outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 cursor-pointer transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm & Send Order via WhatsApp</span>
              </button>
            </div>

            <div className="text-center text-[10px] text-[#8c7866] flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Direct WhatsApp with @desixghee.insta · Cash on Delivery & UPI</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
