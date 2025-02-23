import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Booking, TimeSlot } from '../types/booking';

const WEBHOOK_URL = 'https://hook.eu2.make.com/p2yjukhy5vs8xqfaq39j70vhrzbsbodl';

export const workingHours = {
  monday: { start: "09:00", end: "20:00" },
  tuesday: { start: "09:00", end: "20:00" },
  wednesday: { start: "09:00", end: "20:00" },
  thursday: { start: "09:00", end: "20:00" },
  friday: { start: "09:00", end: "20:00" },
  saturday: { start: "09:00", end: "16:00" },
  sunday: { start: "09:00", end: "14:00" }
};

const generateTimeSlots = (date: string): string[] => {
  const dayOfWeek = new Date(date).toLocaleString("en-US", { weekday: "long" }).toLowerCase();
  const { start, end } = workingHours[dayOfWeek as keyof typeof workingHours];

  const slots: string[] = [];
  let currentTime = new Date(`${date}T${start}:00`);
  const endTime = new Date(`${date}T${end}:00`);

  while (currentTime < endTime) {
    const hours = String(currentTime.getHours()).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    slots.push(`${hours}:${minutes}`);
    currentTime.setMinutes(currentTime.getMinutes() + 15); // 15-minute intervals
  }

  return slots;
};

const filterAvailableSlots = (allSlots: string[], bookedEvents: any[]): TimeSlot[] => {
  const bookedSlots = bookedEvents.map(event => {
    const startTime = new Date(event.start.dateTime);
    return `${String(startTime.getHours()).padStart(2, "0")}:${String(startTime.getMinutes()).padStart(2, "0")}`;
  });

  return allSlots.map(slot => ({
    time: slot,
    available: !bookedSlots.includes(slot)
  }));
};

export const fetchAvailableTimeSlots = async (date: string): Promise<TimeSlot[]> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch time slots');
    }

    const bookedEvents = await response.json();
    const allSlots = generateTimeSlots(date);
    return filterAvailableSlots(allSlots, bookedEvents.items || []);
  } catch (error) {
    console.error('Error fetching time slots:', error);
    throw error;
  }
};

export const checkCabinAvailability = async (cabinId: string, date: string = new Date().toISOString().split('T')[0]) => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        cabinId,
        date,
        type: 'availability_check'
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to check availability');
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking cabin availability:', error);
    throw error;
  }
};

export const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const now = new Date().toISOString();

    // Create Firestore booking
    const bookingRef = await addDoc(collection(db, 'bookings'), {
      ...bookingData,
      createdAt: now,
      updatedAt: now,
      status: 'confirmed',
    });

    // Notify webhook about the new booking
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'new_booking',
        booking: {
          ...bookingData,
          id: bookingRef.id,
        },
      }),
    });

    return bookingRef.id;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const getUserBookings = async (userId: string) => {
  try {
    const bookingsQuery = query(
      collection(db, 'bookings'),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(bookingsQuery);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
};

export const cancelBooking = async (bookingId: string) => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      status: 'cancelled',
      updatedAt: new Date().toISOString(),
    });

    // Notify webhook about the cancellation
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'cancel_booking',
        bookingId,
      }),
    });
  } catch (error) {
    console.error('Error canceling booking:', error);
    throw error;
  }
};