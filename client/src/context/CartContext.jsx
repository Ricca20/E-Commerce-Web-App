
import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api'; // Import API
import { useAuth } from './AuthContext'; // Import AuthContext

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();
    const [isLoaded, setIsLoaded] = useState(false); // To prevent initial overwrite

    // Load from local storage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
        setIsLoaded(true);
    }, []);

    // Sync with backend on login
    useEffect(() => {
        const syncCart = async () => {
            if (user && isLoaded) {
                try {
                    const { data: remoteItems } = await api.get('/api/cart');

                    // Merge local items with backend items
                    const localItems = [...cartItems];
                    const mergedItems = [...remoteItems];

                    const itemMap = new Map();

                    remoteItems.forEach(item => {
                        const key = `${item.product._id}-${item.selectedSize || item.size}`;
                        const normalizedItem = {
                            product: item.product,
                            qty: item.quantity,
                            size: item.selectedSize
                        };
                        itemMap.set(key, normalizedItem);
                    });

                    localItems.forEach(item => {
                        const key = `${item.product._id}-${item.size}`;
                        if (itemMap.has(key)) {
                            const existing = itemMap.get(key);
                            existing.qty = Math.max(existing.qty, item.qty);
                            itemMap.set(key, item);
                        } else {
                            itemMap.set(key, item);
                        }
                    });

                    const finalItems = Array.from(itemMap.values());
                    setCartItems(finalItems);

                    // Sync merged cart back to server
                    const backendCart = finalItems.map(item => ({
                        product: item.product._id,
                        quantity: item.qty,
                        selectedSize: item.size
                    }));
                    await api.post('/api/cart', { cartItems: backendCart });

                } catch (error) {
                    console.error("Failed to sync cart", error);
                }
            } else if (!user && isLoaded) {
                // Keep cart for guest
            }
        };

        syncCart();
    }, [user, isLoaded]); // Run when user logs in

    // Persist changes to backend whenever cartItems changes
    useEffect(() => {
        if (!isLoaded) return;

        // Save to local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Save to backend if logged in
        if (user) {
            const saveToBackend = async () => {
                try {
                    const backendCart = cartItems.map(item => ({
                        product: item.product._id,
                        quantity: item.qty,
                        selectedSize: item.size
                    }));
                    await api.post('/api/cart', { cartItems: backendCart });
                } catch (error) {
                    console.error("Failed to save cart", error);
                }
            };
            // Debounce could be good here, but for now direct call
            saveToBackend();
        }
    }, [cartItems, user, isLoaded]);

    const [isCartOpen, setIsCartOpen] = useState(false);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const addToCart = (product, size) => {
        const existItem = cartItems.find((x) => x.product._id === product._id && x.size === size);

        if (existItem) {
            setCartItems(
                cartItems.map((x) =>
                    x.product._id === product._id && x.size === size
                        ? { ...existItem, qty: existItem.qty + 1 }
                        : x
                )
            );
        } else {
            setCartItems([...cartItems, { product, qty: 1, size }]);
        }
        setIsCartOpen(true);
    };

    const removeFromCart = (id, size) => {
        setCartItems(cartItems.filter((x) => !(x.product._id === id && x.size === size)));
    };

    const updateQty = (id, size, qty) => {
        if (qty < 1) return;
        setCartItems(
            cartItems.map((x) =>
                x.product._id === id && x.size === size ? { ...x, qty } : x
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, isCartOpen, openCart, closeCart }}>
            {children}
        </CartContext.Provider>
    );
};
