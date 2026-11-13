import React, { createContext, useContext, useState, useEffect } from 'react';
import { USERS } from '../data/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Quản lý danh sách toàn bộ người dùng trong hệ thống (lưu localStorage để Admin quản lý)
  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem('campus_users_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return USERS;
      }
    }
    // Mặc định lưu danh sách người dùng ban đầu nhưng bỏ ảnh mẫu sẵn có (avatar: null)
    const initialUsers = USERS.map(u => ({ ...u, avatar: null }));
    localStorage.setItem('campus_users_list', JSON.stringify(initialUsers));
    return initialUsers;
  });

  // 2. Tài khoản đang đăng nhập trong phiên hiện tại (mặc định null khi vào web lần đầu)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campus_user');
    return saved ? JSON.parse(saved) : null;
  });

  // 3. Danh sách sản phẩm đã lưu (thả tim)
  const [savedProducts, setSavedProducts] = useState(() => {
    const saved = localStorage.getItem('campus_saved_products');
    return saved ? JSON.parse(saved) : ['prod_1', 'prod_2'];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('campus_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('campus_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('campus_users_list', JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    localStorage.setItem('campus_saved_products', JSON.stringify(savedProducts));
  }, [savedProducts]);

  // Đăng nhập: kiểm tra xem tài khoản đã có trong danh sách chưa
  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const found = usersList.find(u => u.email.toLowerCase() === normalizedEmail);

    if (!found) {
      // Chưa có dữ liệu -> Báo lỗi để chuyển sang trang Đăng ký
      return {
        success: false,
        error: 'USER_NOT_FOUND',
        message: 'Tài khoản chưa tồn tại trong hệ thống. Vui lòng đăng ký tài khoản mới!'
      };
    }

    setUser(found);
    return { success: true, user: found };
  };

  // Đăng ký tài khoản mới: ghi dữ liệu vào usersList
  const register = ({ name, email, schoolName, phone }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = usersList.find(u => u.email.toLowerCase() === normalizedEmail);

    if (existing) {
      return {
        success: false,
        error: 'EMAIL_EXISTS',
        message: 'Email này đã tồn tại trong hệ thống. Vui lòng đăng nhập!'
      };
    }

    const cleanName = name.trim();
    // Tạo 2 chữ cái viết tắt (Initials) từ tên
    const nameWords = cleanName.split(' ').filter(Boolean);
    const initials = nameWords.length > 1
      ? (nameWords[0][0] + nameWords[nameWords.length - 1][0]).toUpperCase()
      : cleanName.substring(0, 2).toUpperCase();

    const newUser = {
      id: 'user_' + Date.now(),
      name: cleanName,
      email: normalizedEmail,
      schoolName: schoolName || 'Đại học Quốc gia TP.HCM',
      phone: phone || '',
      studentId: '24' + Math.floor(100000 + Math.random() * 900000),
      rating: 5.0,
      reviewCount: 0,
      listingCount: 0,
      positiveRate: 100,
      joinedDate: new Date().toISOString().split('T')[0],
      verifiedStudent: true,
      avatar: null, // Không dùng ảnh người mẫu có sẵn, chỉ hiển thị tên viết tắt
      initials: initials,
      status: 'active',
      statusText: 'Hoạt động',
    };

    setUsersList(prev => [newUser, ...prev]);
    setUser(newUser);

    return { success: true, user: newUser };
  };

  // Cập nhật thông tin hồ sơ
  const updateUser = (updatedData) => {
    setUser(prev => {
      if (!prev) return prev;
      const merged = { ...prev, ...updatedData };
      if (merged.name) {
        const words = merged.name.trim().split(' ').filter(Boolean);
        merged.initials = words.length > 1
          ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
          : merged.name.substring(0, 2).toUpperCase();
      }

      // Cập nhật lại trong usersList
      setUsersList(list => list.map(u => u.id === prev.id ? merged : u));
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
      usersList,
      setUsersList,
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
