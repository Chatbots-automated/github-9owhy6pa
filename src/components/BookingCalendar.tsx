import React, { useState, useEffect } from 'react';
import { format, addDays, isBefore, startOfToday } from 'date-fns';
import { Calendar, Clock, Loader2 } from 'lucide-react';
import { cabins } from '../config/cabins';
import { TimeSlot, BookingFormData } from '../types/booking';
import { useAuth } from '../context/AuthContext';
import { createBooking, fetchAvailableTimeSlots, workingHours } from '../services/bookingService';

export default function BookingCalendar() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCabin, setSelectedCabin] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTimeSlots = async () => {
      try {
        setLoading(true);
        const slots = await fetchAvailableTimeSlots(format(selectedDate, 'yyyy-MM-dd'));
        setTimeSlots(slots);
        setError('');
      } catch (err) {
        setError('Failed to load available time slots');
        setTimeSlots([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedDate) {
      loadTimeSlots();
    }
  }, [selectedDate]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Please sign in to make a booking');
      return;
    }

    if (!selectedCabin || !selectedTime) {
      setError('Please select a cabin and time');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const bookingData: BookingFormData = {
        cabin: selectedCabin,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
      };

      await createBooking({
        ...bookingData,
        userId: user.uid,
        userEmail: user.email || '',
        status: 'confirmed',
      });

      // Reset form
      setSelectedCabin('');
      setSelectedTime('');
      setError('');
      
      // Show success message
      alert('Booking confirmed successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const getDayWorkingHours = (date: Date) => {
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" }).toLowerCase();
    return workingHours[dayOfWeek as keyof typeof workingHours];
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-8">
        {/* Cabin Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-elida-gold" />
            Select Cabin
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cabins.map((cabin) => (
              <button
                key={cabin.id}
                onClick={() => setSelectedCabin(cabin.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedCabin === cabin.id
                    ? 'border-elida-gold bg-elida-gold/5'
                    : 'border-gray-200 hover:border-elida-gold/50'
                }`}
              >
                <h4 className="font-medium text-gray-900">{cabin.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{cabin.description}</p>
                <p className="text-sm font-medium text-elida-gold mt-2">
                  €{cabin.pricePerMinute}/min
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, i) => {
              const date = addDays(new Date(), i);
              const isDisabled = isBefore(date, startOfToday());
              const workingHours = getDayWorkingHours(date);
              
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  disabled={isDisabled}
                  className={`p-4 rounded-lg text-center transition-all ${
                    format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                      ? 'bg-elida-gold text-white'
                      : isDisabled
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-50 hover:bg-elida-gold/20'
                  }`}
                >
                  <div className="text-sm font-medium">
                    {format(date, 'EEE')}
                  </div>
                  <div className="text-lg font-semibold mt-1">
                    {format(date, 'd')}
                  </div>
                  <div className="text-xs mt-1 text-gray-500">
                    {workingHours.start}-{workingHours.end}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-elida-gold" />
            Select Time
          </h3>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 text-elida-gold animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`p-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTime === slot.time
                      ? 'bg-elida-gold text-white'
                      : !slot.available
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-50 hover:bg-elida-gold/20'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Booking Button */}
        <button
          onClick={handleBooking}
          disabled={loading || !selectedCabin || !selectedTime}
          className="w-full py-4 bg-elida-gold text-white rounded-xl font-medium 
                   hover:bg-elida-accent transition-colors duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Confirming Booking...
            </div>
          ) : (
            'Confirm Booking'
          )}
        </button>
      </div>
    </div>
  );
}