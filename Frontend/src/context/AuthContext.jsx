import React, { createContext, useContext, useState, useEffect } from 'react';
import { USERS } from '../data/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Mặc định là null (chưa đăng nhập) khi mới vào web lần đầu
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campus_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [savedProducts, setSavedProducts] = useState(() => {
    const saved = localStorage.getItem('campus_saved_products');
    return saved ? JSON.parse(saved) : ['prod_1', 'prod_3'];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('campus_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('campus_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('campus_saved_products', JSON.stringify(savedProducts));
  }, [savedProducts]);

  const login = (email, password) => {
    const found = USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
      id: 'user_' + Date.now(),
      name: email.split('@')[0],
      email: email,
      studentId: '2352' + Math.floor(1000 + Math.random() * 9000),
      schoolId: 'UIT',
      schoolName: 'ĐH Công nghệ Thông tin',
      rating: 5.0,
      verifiedStudent: true,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      initials: email.substring(0, 2).toUpperCase()
    };
    setUser(found);
    return found;
  };

  const register = ({ name, email, schoolName, phone }) => {
    const newUser = {
      id: 'user_' + Date.now(),
      name: name || email.split('@')[0],
      email: email,
      schoolName: schoolName || 'Đại học Quốc gia TP.HCM',
      phone: phone || '',
      studentId: '24' + Math.floor(100000 + Math.random() * 900000),
      rating: 5.0,
      reviewCount: 0,
      listingCount: 0,
      positiveRate: 100,
      joinedDate: new Date().toISOString().split('T')[0],
      verifiedStudent: true,
      avatar: null,
      initials: (name ? name.split(' ').map(w => w[0]).slice(-2).join('') : email.substring(0, 2)).toUpperCase(),
    };
    setUser(newUser);
    return newUser;
  };

  const updateUser = (updatedData) => {
    setUser(prev => {
      if (!prev) return prev;
      const merged = { ...prev, ...updatedData };
      if (merged.name) {
        merged.initials = merged.name.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase();
      }
      return merged;
    });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleSaveProduct = (productId) => {
    setSavedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isSaved = (productId) => savedProducts.includes(productId);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      updateUser,
      logout,
      savedProducts,
      toggleSaveProduct,
      isSaved
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
