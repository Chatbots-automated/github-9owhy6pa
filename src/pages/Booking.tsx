import React from 'react';
import { motion } from 'framer-motion';
import BookingCalendar from '../components/BookingCalendar';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard';

export default function Booking() {
  const { user } = useAuth();
  const isAdmin = user?.email === 'admin@elida.lt'; // Replace with your admin email

  return (
    <div className="pt-20">
      <section className="bg-elida-warm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-playfair text-4xl md:text-5xl text-gray-900 mb-6">
              {isAdmin ? 'Booking Management' : 'Book Your Session'}
            </h1>
            <p className="text-lg text-gray-600">
              {isAdmin
                ? 'Manage all bookings and view the calendar'
                : 'Choose your preferred cabin and time slot'}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isAdmin ? <AdminDashboard /> : <BookingCalendar />}
        </div>
      </section>
    </div>
  );
}