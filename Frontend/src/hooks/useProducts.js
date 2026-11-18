import { useState, useEffect, useCallback } from 'react';
import { PRODUCTS } from '../data/products';

const STORAGE_KEY = 'campus_all_products_v3';
const EVENT_KEY = 'campus_products_updated';

export const useProducts = () => {
  const getStoredProducts = () => {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) {
          // Luôn đồng bộ lại ảnh mới nhất từ mã nguồn cho các sản phẩm mặc định
          const defaultMap = new Map(PRODUCTS.map(p => [String(p.id), p]));
          const updated = parsed.map(item => {
            const def = defaultMap.get(String(item.id));
            if (def) {
              return {
                ...def,
                ...item,
                images: def.images, // Đồng bộ đường dẫn ảnh nội bộ mới nhất
              };
            }
            return item;
          });

          // Bổ sung những sản phẩm mới trong code nếu localStorage chưa có
          const existingIds = new Set(updated.map(p => String(p.id)));
          const missing = PRODUCTS.filter(p => !existingIds.has(String(p.id)));
          const merged = missing.length > 0 ? [...updated, ...missing] : updated;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          return merged;
        }
      } catch (e) {
        return PRODUCTS;
      }
    }
    // Lần đầu khởi tạo lưu toàn bộ danh sách PRODUCTS vào localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(PRODUCTS));
    return PRODUCTS;
  };

  const [products, setProducts] = useState(getStoredProducts);

  const syncProducts = useCallback(() => {
    setProducts(getStoredProducts());
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        syncProducts();
      }
    };
    const handleCustomChange = () => {
      syncProducts();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(EVENT_KEY, handleCustomChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(EVENT_KEY, handleCustomChange);
    };
  }, [syncProducts]);

  const notifyChange = (updatedList) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    setProducts(updatedList);
    window.dispatchEvent(new Event(EVENT_KEY));
  };

  // Thêm tin đăng mới (mặc định trạng thái pending để chờ Admin duyệt)
  const addProduct = (newProduct) => {
    const created = {
      ...newProduct,
      id: 'prod_' + Date.now(),
      createdAt: new Date().toISOString(),
      views: 1,
      isFeatured: false,
      status: newProduct.status || 'pending',
    };

    const currentList = getStoredProducts();
    const updated = [created, ...currentList];
    notifyChange(updated);
    return created;
  };

  // Cập nhật trạng thái tin (Admin duyệt -> 'active', Admin từ chối -> 'rejected', Hủy -> 'deleted')
  const updateProductStatus = (id, newStatus) => {
    const currentList = getStoredProducts();
    const updated = currentList.map(p => 
      String(p.id) === String(id) ? { ...p, status: newStatus } : p
    );
    notifyChange(updated);
  };

  // Xóa / Hủy tin đăng vĩnh viễn
  const deleteProduct = (id) => {
    const currentList = getStoredProducts();
    const updated = currentList.filter(p => String(p.id) !== String(id));
    notifyChange(updated);
  };

  const getProductById = (id) => {
    return products.find(p => String(p.id) === String(id));
  };

  return {
    products,
    addProduct,
    updateProductStatus,
    deleteProduct,
    getProductById
  };
};
