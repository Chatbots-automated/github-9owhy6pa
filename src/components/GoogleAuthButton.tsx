import React from 'react';
import { Calendar } from 'lucide-react';
import { getAuthUrl } from '../services/googleAuth';

export default function GoogleAuthButton() {
  const handleAuth = async () => {
    try {
      const authUrl = getAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Error initiating Google auth:', error);
    }
  };

  return (
    <button
      onClick={handleAuth}
      className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
    >
      <Calendar className="h-5 w-5 text-blue-500" />
      <span>Connect Google Calendar</span>
    </button>
  );
}