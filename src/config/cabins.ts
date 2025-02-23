import { Cabin } from '../types/booking';

export const cabins: Cabin[] = [
  {
    id: 'lying-1',
    name: 'Lying Cabin 1',
    type: 'lying',
    description: 'Premium lying tanning bed with 42 UV lamps and comfort cooling system',
    image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=1000',
    pricePerMinute: 0.70
  },
  {
    id: 'lying-2',
    name: 'Lying Cabin 2',
    type: 'lying',
    description: 'Deluxe lying tanning bed with aromatherapy and built-in music system',
    image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=1000',
    pricePerMinute: 0.70
  },
  {
    id: 'standing-1',
    name: 'Standing Cabin',
    type: 'standing',
    description: 'Advanced vertical tanning booth with 48 UV lamps and misting system',
    image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=1000',
    pricePerMinute: 0.70
  }
];