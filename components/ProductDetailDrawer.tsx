
import React, { useState, useMemo } from 'react';
import { Icons } from '../constants';
import { ProductGroup, RawProduct } from '../types';

interface ProductDetailDrawerProps {
  productGroup: ProductGroup | null;
  onClose: () => void;
  onAddToCart: (variant: RawProduct) => void;
}

const ProductDetailDrawer: React.FC<ProductDetailDrawerProps> = ({ productGroup, onClose, onAddToCart }) => {
  if (!productGroup) return null;

  const [selectedColor, setSelectedColor] = useState(productGroup.variants[0].color);
  const [selectedSize, setSelectedSize] = useState(productGroup.variants[0].size);

  const colors = useMemo(() => Array.from(new Set(productGroup.variants.map(v => v.color))), [productGroup]);
  const sizes = useMemo(() => 
    Array.from(new Set(productGroup.variants.filter(v => v.color === selectedColor).map(v => v.size))), 
    [productGroup, selectedColor]
  );

  const currentVariant = useMemo(() => 
    productGroup.variants.find(v => v.color === selectedColor && v.size === selectedSize) || 
    productGroup.variants.find(v => v.color === selectedColor) ||
    productGroup.variants[0],
    [productGroup, selectedColor, selectedSize]
  );

  const gallery = useMemo(() => {
    const main = currentVariant.image_link;
    const additional = currentVariant.additional_image_link ? currentVariant.additional_image_link.split(',') : [];
    return [main, ...additional].filter(url => url && url.trim() !== '');
  }, [currentVariant]);

  const [activeImage, setActiveImage] = useState(0);

  const formatPrice = (priceStr: string | number) => {
    const price = typeof priceStr === 'string' ? parseFloat(priceStr.replace(/[^0-9]/g, '')) : priceStr;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-300 overflow-hidden">
      {/* Header Sticky */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <Icons.ArrowLeft />
        </button>
        <span className="font-bold text-sm truncate max-w-[200px]">{productGroup.title}</span>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      <div className="flex-grow overflow-y-auto no-scrollbar">
        {/* Gallery */}
        <div className="relative aspect-square bg-gray-50">
          <img 
            src={gallery[activeImage]} 
            alt={productGroup.title} 
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {gallery.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all ${i === activeImage ? 'w-6 bg-rose-600' : 'w-1.5 bg-gray-300'}`}
              />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 overflow-x-auto p-4 flex gap-2 no-scrollbar bg-gradient-to-t from-black/20 to-transparent">
            {gallery.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImage(i)}
                className={`w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${i === activeImage ? 'border-rose-500 scale-105' : 'border-transparent opacity-70'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-6 space-y-6">
          <div>
            <div className="flex justify-between items-start gap-4 mb-2">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">{productGroup.title}</h1>
              <div className="flex items-center gap-1 text-rose-500">
                <span className="text-sm font-bold">★ {productGroup.rating}</span>
              </div>
            </div>
            <p className="text-rose-600 text-lg font-black">{formatPrice(currentVariant.sale_price)}</p>
            {currentVariant.discount_percentage && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400 line-through">{formatPrice(currentVariant.price)}</span>
                <span className="text-[10px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded font-bold">-{currentVariant.discount_percentage}%</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Colors */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Warna</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color);
                      // Reset size if the new color doesn't have the selected size
                      const newSizes = productGroup.variants.filter(v => v.color === color).map(v => v.size);
                      if (!newSizes.includes(selectedSize)) setSelectedSize(newSizes[0]);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedColor === color 
                        ? 'bg-gray-900 text-white border-gray-900 shadow-lg' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Ukuran</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[44px] h-11 flex items-center justify-center rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size 
                        ? 'bg-rose-600 text-white border-rose-600 shadow-lg' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-rose-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Deskripsi Produk</h3>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {productGroup.description}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Sticky */}
      <div className="p-4 border-t border-gray-100 bg-white flex gap-3 pb-8">
        <div className="flex flex-col justify-center px-2">
          <span className="text-[10px] text-gray-400 font-bold uppercase">Stok</span>
          <span className="text-sm font-bold text-gray-900">{currentVariant.availability === 'in stock' ? 'Tersedia' : 'Habis'}</span>
        </div>
        <button 
          disabled={currentVariant.availability !== 'in stock'}
          onClick={() => onAddToCart(currentVariant)}
          className="flex-grow bg-rose-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-rose-200 hover:bg-rose-700 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:scale-100"
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
};

export default ProductDetailDrawer;
