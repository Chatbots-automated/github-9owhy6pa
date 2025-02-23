import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Keep the URL as is, don't navigate away immediately
    const handleCallback = async () => {
      try {
        // Get the URL parameters
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const state = params.get('state');

        if (!code) {
          throw new Error('No authorization code received');
        }

        // Here you would typically exchange the code for tokens
        // but we'll keep the URL as is for now
        console.log('Auth code received:', code);
        console.log('State:', state);

        // Don't navigate away - let the parent window handle the response
      } catch (error) {
        console.error('Authentication callback error:', error);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-elida-cream flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
        <Loader2 className="h-12 w-12 text-elida-gold animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-playfair text-gray-900 mb-2">Authorization Complete</h2>
        <p className="text-gray-600">You can now close this window and return to the application.</p>
      </div>
    </div>
  );
}