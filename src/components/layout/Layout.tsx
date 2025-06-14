'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Header from './Header';
import PWAInstallPrompt from './PWAInstallPrompt';
import NotificationContainer from '@/components/ui/Notification';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export default function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`pt-16 ${className}`}
      >
        {children}
      </motion.main>
      
      {/* フローティングアクションボタン（モバイル用） */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-40 md:hidden"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl"
        >
          🌤️
        </motion.button>
      </motion.div>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* Notifications */}
      <NotificationContainer />
    </div>
  );
}