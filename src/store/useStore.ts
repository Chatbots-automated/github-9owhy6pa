import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface WishlistItem extends Product {}

interface StoreState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (item: Product) => void;
  getCartTotal: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cart.find(
            (i) => 
              i.id === item.id && 
              i.selectedSize === item.selectedSize && 
              i.selectedColor === item.selectedColor
          );

          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i === existingItem
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { cart: [...state.cart, item] };
        });
      },

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      updateCartItemQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (item) =>
        set((state) => {
          const exists = state.wishlist.some((i) => i.id === item.id);
          return {
            wishlist: exists
              ? state.wishlist.filter((i) => i.id !== item.id)
              : [...state.wishlist, item],
          };
        }),

      getCartTotal: () => {
        const state = get();
        return state.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'tactical-store',
    }
  )
);