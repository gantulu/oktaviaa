
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Icons } from '../constants';
import { ProductGroup, RawProduct } from '../types';

interface CatalogProps {
  onItemClick: (product: ProductGroup) => void;
}

const BANNERS = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1000&q=80"
];

const Catalog: React.FC<CatalogProps> = ({ onItemClick }) => {
  const [rawProducts, setRawProducts] = useState<RawProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerTimer = useRef<number | null>(null);

  // Auto-swipe banner
  useEffect(() => {
    bannerTimer.current = window.setInterval(() => {
      setBannerIndex(prev => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => {
      if (bannerTimer.current) clearInterval(bannerTimer.current);
    };
  }, []);

  // Fetch API Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opensheet.elk.sh/1x2Rtyeyq3WR6yFybA8stGP0mdI2dlKvBz6fhx7FIjhQ/Sheet1');
        const data = await response.json();
        setRawProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Grouping Logic
  const productGroups = useMemo(() => {
    const groups: Record<string, ProductGroup> = {};

    rawProducts.forEach(raw => {
      const gid = raw.item_group_id || raw.id;
      if (!groups[gid]) {
        groups[gid] = {
          id: gid,
          title: raw.title,
          brand: raw.brand,
          category: raw.category,
          image: raw.image_link,
          minPrice: parseFloat(raw.sale_price.replace(/[^0-9]/g, '')),
          maxDiscount: parseFloat(raw.discount_percentage) || 0,
          rating: parseFloat(raw.rating) || 5.0,
          sold: parseInt(raw.sold) || 0,
          description: raw.description,
          variants: [raw]
        };
      } else {
        const price = parseFloat(raw.sale_price.replace(/[^0-9]/g, ''));
        const discount = parseFloat(raw.discount_percentage) || 0;
        groups[gid].variants.push(raw);
        if (price < groups[gid].minPrice) groups[gid].minPrice = price;
        if (discount > groups[gid].maxDiscount) groups[gid].maxDiscount = discount;
      }
    });

    return Object.values(groups);
  }, [rawProducts]);

  const categories = useMemo(() => 
    ["All", ...Array.from(new Set(productGroups.map(p => p.category)))], 
    [productGroups]
  );

  const filteredGroups = useMemo(() => 
    selectedCategory === 'All' 
      ? productGroups 
      : productGroups.filter(p => p.category === selectedCategory),
    [productGroups, selectedCategory]
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
        <p className="text-gray-400 font-medium animate-pulse">Menyiapkan koleksi terbaik...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      {/* Banner Carousel */}
      <div className="px-4 py-4">
        <div className="relative h-44 rounded-3xl overflow-hidden shadow-xl shadow-rose-100 bg-gray-100">
          {BANNERS.map((banner, i) => (
            <div 
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === bannerIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={banner} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-6">
                <span className="text-rose-400 text-[10px] font-bold tracking-widest uppercase mb-1">Eksklusif</span>
                <h2 className="text-white text-xl font-bold mb-3">Gaya Baru,<br/>Semangat Baru</h2>
                <button className="bg-rose-600 text-white text-[10px] font-bold px-5 py-2 rounded-full self-start hover:bg-rose-700 transition-colors">
                  LIHAT KOLEKSI
                </button>
              </div>
            </div>
          ))}
          <div className="absolute bottom-3 right-6 flex gap-1.5">
            {BANNERS.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all ${i === bannerIndex ? 'w-4 bg-white' : 'w-1 bg-white/40'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Categories */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md px-4 py-3 border-b border-gray-100">
        <div className="overflow-x-auto no-scrollbar flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-200 ring-2 ring-rose-100' 
                  : 'bg-white text-gray-500 border border-gray-100 hover:border-rose-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 pt-6 grid grid-cols-2 gap-x-4 gap-y-6 pb-24">
        {filteredGroups.map(product => (
          <div 
            key={product.id} 
            onClick={() => onItemClick(product)}
            className="group cursor-pointer active:scale-95 transition-transform"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-50 mb-3">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {product.maxDiscount > 0 && (
                <div className="absolute top-3 left-3 bg-rose-600 text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-lg">
                  -{product.maxDiscount}%
                </div>
              )}
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[9px] font-bold text-gray-900 shadow-sm border border-gray-100 flex items-center gap-1">
                <span>⭐</span> {product.rating}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">{product.brand}</p>
              <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 line-clamp-1">{product.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-rose-600 font-black text-sm">
                  {formatPrice(product.minPrice)}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">{product.sold}+ Terjual</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
