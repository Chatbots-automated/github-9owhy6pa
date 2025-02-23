import React from 'react';
import { Shield } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-elida-gold/10 rounded-lg">
            <Shield className="h-6 w-6 text-elida-gold" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            {/* Add your admin dashboard content here */}
            <div className="p-6">
              <p className="text-gray-600">Welcome to the admin dashboard. Manage your bookings and settings here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}