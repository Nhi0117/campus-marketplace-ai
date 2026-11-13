import React, { createContext, useContext, useState, useEffect } from 'react';
import { USERS, CURRENT_USER } from '../data/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campus_user');
    return saved ? JSON.parse(saved) : CURRENT_USER;
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
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };
    setUser(found);
    return found;
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
