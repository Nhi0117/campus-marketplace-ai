import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AIChatbot } from '../ai/AIChatbot';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Floating AI Chatbot Widget (AI01) */}
      <AIChatbot />
    </div>
  );
};
