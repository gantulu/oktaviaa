
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full border border-gray-100">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-full text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-gray-500 text-xs mb-3 line-clamp-2">{product.description}</p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-rose-600 font-bold text-sm">
            {formatPrice(product.price)}
          </span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-gray-900 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-rose-600 active:scale-95 transition-all"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
