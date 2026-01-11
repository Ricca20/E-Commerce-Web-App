
import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

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
        setIsCartOpen(true); // Auto open cart on add
    };

    const removeFromCart = (id, size) => {
        setCartItems(cartItems.filter((x) => !(x.product._id === id && x.size === size)));
    };

    const updateQty = (id, size, qty) => {
        if (qty < 1) return; // Keep this check from original
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
