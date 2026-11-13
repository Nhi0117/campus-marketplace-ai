import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { AdminLayout } from '../components/layout/AdminLayout';

// Public & Main Pages
import { HomePage } from '../pages/Home';
import { ProductListPage } from '../pages/ProductList';
import { ProductDetailPage } from '../pages/ProductDetail';
import { CreateListingPage } from '../pages/CreateListing';
import { ChatPage } from '../pages/Chat';
import { LoginPage } from '../pages/Auth/Login';
import { RegisterPage } from '../pages/Auth/Register';

// Profile & Student Features
import { ProfilePage } from '../pages/Profile';
import { SettingsPage } from '../pages/Profile/Settings';
import { ManageListingsPage } from '../pages/Profile/ManageListings';
import { SellerProfilePage } from '../pages/Profile/SellerProfile';
import { SavedListingsPage } from '../pages/Profile/SavedListings';
import { TransactionsPage } from '../pages/Profile/Transactions';
import { EditListingPage } from '../pages/Profile/EditListing';

// Transaction Interactions
import { RatingPage } from '../pages/Rating';
import { ReportPage } from '../pages/Report';
import { VerifyTransactionPage } from '../pages/VerifyTransaction';

// Admin Pages
import { AdminPage } from '../pages/Admin';
import { AdminReportsPage } from '../pages/Admin/Reports';
import { AdminReportDetailPage } from '../pages/Admin/ReportDetail';
import { AdminUsersPage } from '../pages/Admin/Users';

// Other
import { NotFoundPage } from '../pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Trang công khai */}
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="seller/:id" element={<SellerProfilePage />} />
        
        {/* Đăng tin & Chat */}
        <Route path="create-listing" element={<CreateListingPage />} />
        <Route path="products/:id/edit" element={<EditListingPage />} />
        <Route path="chat" element={<ChatPage />} />

        {/* Auth */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* Quản lý cá nhân (Profile) */}
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="manage-listings" element={<ManageListingsPage />} />
        <Route path="saved" element={<SavedListingsPage />} />
        <Route path="transactions" element={<TransactionsPage />} />

        {/* Tương tác giao dịch */}
        <Route path="rating/:id" element={<RatingPage />} />
        <Route path="report/:id" element={<ReportPage />} />
        <Route path="verify-transaction/:id" element={<VerifyTransactionPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Khu vực Quản trị Admin riêng biệt (Không dùng chung Layout public của user) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="reports/:id" element={<AdminReportDetailPage />} />
        <Route path="users" element={<AdminUsersPage />} />
      </Route>
    </Routes>
  );
};
