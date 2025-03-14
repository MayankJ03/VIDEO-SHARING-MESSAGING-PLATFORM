import React, { useState } from 'react';
import { VideoFeed } from './components/VideoFeed';
import { Chat } from './components/Chat';
import { VideoRecorder } from './components/VideoRecorder';
import { UserProfile } from './components/UserProfile';
import { Navigation } from './components/Navigation';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-lg shadow-lg z-50"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6 text-yellow-500" />
        ) : (
          <Moon className="w-6 h-6 text-gray-700" />
        )}
      </button>

      <div className="flex h-screen">
        <Navigation />
        <main className="flex-1 relative">
          <VideoFeed />
          <VideoRecorder />
          <Chat />
        </main>
      </div>
    </div>
  );
}

export default App;