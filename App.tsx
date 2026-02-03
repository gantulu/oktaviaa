
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Catalog from './components/Catalog';
import Profile from './components/Profile';
import CartDrawer from './components/CartDrawer';
import ProductDetailDrawer from './components/ProductDetailDrawer';
import { ViewState, CartItem, ProductGroup, RawProduct } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('main');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductGroup | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Local Storage
  useEffect(() => {
    const saved = localStorage.getItem('oktavia_cart_v2');
    if (saved) {
      try { setCartItems(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('oktavia_cart_v2', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = useCallback((variant: RawProduct) => {
    const price = parseFloat(variant.sale_price.replace(/[^0-9]/g, ''));
    
    setCartItems(prev => {
      // Create a unique key for the item + specific variant
      const existingIdx = prev.findIndex(item => 
        item.id === variant.id && 
        item.variant.color === variant.color && 
        item.variant.size === variant.size
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = { 
          ...next[existingIdx], 
          quantity: next[existingIdx].quantity + 1 
        };
        return next;
      }

      return [...prev, {
        id: variant.id,
        title: variant.title,
        price: price,
        image: variant.image_link,
        variant: {
          color: variant.color,
          size: variant.size
        },
        quantity: 1
      }];
    });

    setIsCartOpen(true);
    setSelectedProduct(null); // Close detail after adding
  }, []);

  const handleUpdateQuantity = useCallback((id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  }, []);

  const handleRemoveItem = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-[500px] min-h-screen mx-auto bg-white shadow-2xl relative flex flex-col overflow-x-hidden">
      <Header 
        cartCount={cartCount} 
        onCartToggle={() => setIsCartOpen(true)}
        onProfileToggle={() => setActiveView('profile')}
        onLogoClick={() => setActiveView('main')}
      />

      <main className="flex-grow bg-[#FAFAFA]">
        {activeView === 'main' && (
          <Catalog onItemClick={(p) => setSelectedProduct(p)} />
        )}
        {activeView === 'profile' && (
          <Profile />
        )}
      </main>

      <ProductDetailDrawer 
        productGroup={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      />

      {/* Modern Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] h-20 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex items-center justify-around px-8 z-40 pb-4">
        <button 
          onClick={() => { setActiveView('main'); setSelectedProduct(null); }}
          className={`group flex flex-col items-center gap-1.5 transition-all ${activeView === 'main' ? 'text-rose-600 scale-110' : 'text-gray-400'}`}
        >
          <div className={`p-2 rounded-2xl transition-all ${activeView === 'main' ? 'bg-rose-50' : 'group-hover:bg-gray-50'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={activeView === 'main' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter">Home</span>
        </button>

        <button 
          className="group flex flex-col items-center gap-1.5 text-gray-400 hover:text-rose-600 transition-all hover:scale-110"
        >
          <div className="p-2 rounded-2xl group-hover:bg-rose-50 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter">Explore</span>
        </button>

        <button 
          onClick={() => setIsCartOpen(true)}
          className="group flex flex-col items-center gap-1.5 text-gray-400 hover:text-rose-600 transition-all hover:scale-110"
        >
          <div className="p-2 rounded-2xl group-hover:bg-rose-50 transition-all relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cartCount > 0 && <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-600 rounded-full border-2 border-white"></div>}
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter">Bag</span>
        </button>

        <button 
          onClick={() => { setActiveView('profile'); setSelectedProduct(null); }}
          className={`group flex flex-col items-center gap-1.5 transition-all ${activeView === 'profile' ? 'text-rose-600 scale-110' : 'text-gray-400'}`}
        >
          <div className={`p-2 rounded-2xl transition-all ${activeView === 'profile' ? 'bg-rose-50' : 'group-hover:bg-gray-50'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={activeView === 'profile' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
