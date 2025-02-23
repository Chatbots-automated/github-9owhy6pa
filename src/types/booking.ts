export interface Booking {
  id?: string;
  userId: string;
  userEmail: string;
  cabin: string;
  date: string;
  time: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Cabin {
  id: string;
  name: string;
  type: 'lying' | 'standing';
  description: string;
  image: string;
  pricePerMinute: number;
}

export interface BookingFormData {
  cabin: string;
  date: string;
  time: string;
}