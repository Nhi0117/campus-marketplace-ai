import { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState(() => {
    const local = localStorage.getItem('campus_custom_products');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        return [...parsed, ...PRODUCTS];
      } catch (e) {
        return PRODUCTS;
      }
    }
    return PRODUCTS;
  });

  const addProduct = (newProduct) => {
    const created = {
      ...newProduct,
      id: 'prod_' + Date.now(),
      createdAt: new Date().toISOString(),
      views: 1,
      isFeatured: false
    };

    setProducts(prev => [created, ...prev]);

    // Lưu vào localStorage
    const local = localStorage.getItem('campus_custom_products');
    const existing = local ? JSON.parse(local) : [];
    localStorage.setItem('campus_custom_products', JSON.stringify([created, ...existing]));

    return created;
  };

  const getProductById = (id) => {
    return products.find(p => String(p.id) === String(id));
  };

  return {
    products,
    addProduct,
    getProductById
  };
};
