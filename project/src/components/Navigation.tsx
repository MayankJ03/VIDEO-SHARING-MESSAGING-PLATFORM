import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Search, 
  PlusSquare, 
  Heart, 
  User,
  Compass,
  MessageCircle,
  TrendingUp
} from 'lucide-react';

export const Navigation: React.FC = () => {
  return (
    <motion.nav 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Reelscape
        </h1>
      </div>

      <div className="flex-1 space-y-2">
        <NavItem icon={<Home />} label="Home" active />
        <NavItem icon={<Search />} label="Search" />
        <NavItem icon={<Compass />} label="Explore" />
        <NavItem icon={<TrendingUp />} label="Trending" />
        <NavItem icon={<MessageCircle />} label="Messages" />
        <NavItem icon={<Heart />} label="Notifications" />
        <NavItem icon={<PlusSquare />} label="Create" />
        <NavItem icon={<User />} label="Profile" />
      </div>

      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          <div>
            <p className="font-medium text-sm dark:text-white">John Doe</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">@johndoe</p>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}> = ({ icon, label, active }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
        active 
          ? 'bg-gray-100 dark:bg-gray-800 font-medium' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, {
        className: 'w-5 h-5'
      })}
      <span className="text-sm dark:text-white">{label}</span>
    </motion.button>
  );
};