'use client';

import { createContext, useState, useContext, type ReactNode } from 'react';

type CartItem = {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    quantity: number;
    size: string;
    color: string;
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getItemCount: () => number;
    getTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (item: CartItem) => {
        setItems((prevItems) => {
            // Check if item already exists in cart
            const existingItemIndex = prevItems.findIndex(
                (i) =>
                    i.id === item.id &&
                    i.size === item.size &&
                    i.color === item.color
            );

            if (existingItemIndex >= 0) {
                // Update quantity if item exists
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += item.quantity;
                return updatedItems;
            } else {
                // Add new item if it doesn't exist
                return [...prevItems, item];
            }
        });
    };

    const removeItem = (id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: Math.max(1, quantity) };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const getItemCount = () => {
        return items.reduce((count, item) => count + item.quantity, 0);
    };

    const getTotal = () => {
        return items.reduce(
            (total, item) => total + +item.price * +item.quantity,
            0
        );
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                getItemCount,
                getTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
