import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Clock } from 'lucide-react';
import type { Message } from '../types';

const DEMO_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'John',
    content: "Hey! Check out my new video!",
    timestamp: Date.now() - 5000,
    isEphemeral: true
  },
  {
    id: '2',
    sender: 'Alice',
    content: "That's awesome! 🔥",
    timestamp: Date.now() - 3000,
    isEphemeral: true
  }
];

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(DEMO_MESSAGES);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: newMessage,
      timestamp: Date.now(),
      isEphemeral: true
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Remove ephemeral messages after 30 seconds
    if (message.isEphemeral) {
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== message.id));
      }, 30000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800"
    >
      <div className="p-4 border-b dark:border-gray-800 bg-gradient-to-r from-purple-500 to-pink-500">
        <h2 className="text-lg font-semibold text-white">Messages</h2>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl p-3 ${
                message.sender === 'You' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{message.sender}</span>
                  {message.isEphemeral && (
                    <div className="flex items-center gap-1 opacity-70">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">30s</span>
                    </div>
                  )}
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t dark:border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-pink-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};