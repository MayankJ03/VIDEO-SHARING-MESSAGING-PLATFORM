import React from 'react';
import { motion } from 'framer-motion';
import { Settings, User as UserIcon, Bell, Moon, LogOut } from 'lucide-react';

export const UserProfile: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 left-4 z-50"
    >
      <button className="p-2 rounded-full bg-white/10 backdrop-blur-lg shadow-lg">
        <UserIcon className="w-6 h-6 text-white" />
      </button>

      <div className="absolute top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div>
              <h3 className="font-semibold dark:text-white">John Doe</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">@johndoe</p>
            </div>
          </div>
        </div>

        <nav className="p-2">
          <button className="w-full p-2 flex items-center gap-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button className="w-full p-2 flex items-center gap-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </button>
          <button className="w-full p-2 flex items-center gap-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Moon className="w-5 h-5" />
            <span>Dark Mode</span>
          </button>
          <button className="w-full p-2 flex items-center gap-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </nav>
      </div>
    </motion.div>
  );
};