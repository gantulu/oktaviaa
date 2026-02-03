
import React from 'react';
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Oktavia Silk Dress",
    price: 850000,
    category: "Dress",
    image: "https://picsum.photos/id/1011/400/600",
    description: "Elegant silk dress for special occasions."
  },
  {
    id: 2,
    name: "Velvet Evening Gown",
    price: 1200000,
    category: "Dress",
    image: "https://picsum.photos/id/22/400/600",
    description: "Deep red velvet gown with a luxurious finish."
  },
  {
    id: 3,
    name: "Chiffon Summer Top",
    price: 350000,
    category: "Top",
    image: "https://picsum.photos/id/64/400/600",
    description: "Lightweight and breathable chiffon top."
  },
  {
    id: 4,
    name: "Classic Beige Trench",
    price: 1500000,
    category: "Outerwear",
    image: "https://picsum.photos/id/1027/400/600",
    description: "Timeless trench coat in a versatile beige shade."
  },
  {
    id: 5,
    name: "Floral Satin Skirt",
    price: 450000,
    category: "Bottom",
    image: "https://picsum.photos/id/625/400/600",
    description: "Smooth satin skirt with vintage floral patterns."
  },
  {
    id: 6,
    name: "Cashmere Knit Sweater",
    price: 780000,
    category: "Top",
    image: "https://picsum.photos/id/325/400/600",
    description: "Premium cashmere for ultimate comfort."
  }
];

export const Icons = {
  Cart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  Minus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
  ),
  ArrowLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
  )
};
