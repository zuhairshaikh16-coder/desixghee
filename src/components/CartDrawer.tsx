import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToOrder: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToOrder,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#160f09] border-l border-[#362515] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#2e2013] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury font-bold text-lg text-white">
                  Your Fresh Batch Order
                </h3>
                <span className="text-xs text-[#a89582]">{totalItems} items selected</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#a89582] hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <div className="w-16 h-16 rounded-full bg-[#20150b] flex items-center justify-center text-[#786553]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="text-base font-bold text-white font-serif-luxury">
                  Your bag is empty
                </div>
                <p className="text-xs text-[#a89582] max-w-xs">
                  Select your favorite artisanal Panjiri variety or pure Bilona Desi Ghee from the menu.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#1d140b] border border-[#382613] flex gap-3.5 items-center justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover border border-[#3b2714] shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-white truncate font-serif-luxury">
                      {item.name}
                    </h4>
                    <div className="text-[11px] text-amber-400 font-semibold">
                      {item.weightOrVolume} {item.sweetener ? `· ${item.sweetener}` : ''}
                    </div>
                    <div className="text-xs font-bold text-amber-300 font-mono">
                      Rs. {item.price * item.quantity}
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#8c7866] hover:text-red-400 p-1 cursor-pointer transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-[#120d07] border border-[#332212] rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-5 h-5 flex items-center justify-center text-[#cfbca4] hover:text-white rounded hover:bg-white/5 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold text-white px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#cfbca4] hover:text-white rounded hover:bg-white/5 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout button */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#2e2013] space-y-4 bg-[#140e08]">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#baa792]">
                  <span>Subtotal</span>
                  <span className="font-mono text-white font-semibold">Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-[#baa792]">
                  <span>Packaging (Airtight Heritage Tin)</span>
                  <span className="text-emerald-400 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#2d1e11]">
                  <span>Total Amount</span>
                  <span className="text-amber-300 font-mono text-base font-bold">Rs. {subtotal}</span>
                </div>
              </div>

              <button
                onClick={onProceedToOrder}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-950/60 cursor-pointer active:scale-95 transition-all"
              >
                <span>Proceed to Direct Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#baa792]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>100% Satisfaction Guarantee · Fast Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
