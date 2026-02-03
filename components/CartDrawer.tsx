
import React from 'react';
import { Icons } from '../constants';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-[60] shadow-2xl flex flex-col transition-transform animate-slide-in">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Tas Belanja</h2>
            <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">{items.length}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Icons.X />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-5 no-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-6">
              <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center text-rose-300">
                <Icons.Cart />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-900 mb-1">Masih Kosong Nih...</p>
                <p className="text-xs text-gray-400">Yuk, isi dengan barang-barang impianmu!</p>
              </div>
              <button 
                onClick={onClose}
                className="bg-rose-600 text-white text-xs font-bold px-8 py-3 rounded-2xl shadow-lg shadow-rose-100 hover:bg-rose-700 active:scale-95 transition-all"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex gap-4 group">
                  <div className="w-24 h-28 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">{item.title}</h4>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-gray-300 hover:text-rose-500 transition-colors"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1 mb-2">
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold">{item.variant.color}</span>
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold">{item.variant.size}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <p className="text-rose-600 text-sm font-black">{formatPrice(item.price)}</p>
                      <div className="flex items-center bg-gray-100 rounded-xl p-0.5">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                        >
                          <Icons.Minus />
                        </button>
                        <span className="w-8 text-center text-xs font-black text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                        >
                          <Icons.Plus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-white space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between text-gray-900 font-black text-lg">
              <span className="uppercase text-xs tracking-widest text-gray-400">Total Pembayaran</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <button className="w-full bg-rose-600 text-white font-bold py-5 rounded-3xl shadow-2xl shadow-rose-200 hover:bg-rose-700 active:scale-95 transition-all text-sm uppercase tracking-widest">
              Lanjut Checkout
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
};

export default CartDrawer;
