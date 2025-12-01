import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CartItem {
  id: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  addToCart: (id: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  isInCart: (id: number) => boolean
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (id) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === id)
          if (existing) {
            return {
              items: state.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
            }
          } else {
            return { items: [...state.items, { id, quantity: 1 }] }
          }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item,
          ),
        })),

      isInCart: (id) => get().items.some((item) => item.id === id),
    }),
    {
      name: 'cart-storage', // key in localStorage
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
