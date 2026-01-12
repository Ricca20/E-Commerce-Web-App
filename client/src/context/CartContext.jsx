
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
                    // 1. Fetch backend cart
                    const { data: remoteItems } = await api.get('/api/cart');

                    // 2. Merge local items with backend items
                    // Strategy: If local has items, they take precedence or are added? 
                    // Let's adopt a strategy: Combine. If same product+size, sum quantities.

                    const localItems = [...cartItems];
                    const mergedItems = [...remoteItems];

                    localItems.forEach(localItem => {
                        const existingIdx = mergedItems.findIndex(
                            ri => ri.product._id === localItem.product._id && ri.size === localItem.size
                        );

                        if (existingIdx > -1) {
                            // Update quantity if exists (max of local or remote? or sum? Let's keep local if it's newer, usually overwrites. Or sum them.)
                            // Simpler approach for now: Local overwrites if meaningful action happened, but on initial load, maybe sum?
                            // Let's implement SUM for now.
                            // However, simplified approach from plan: Client is source of truth during session.
                            // BUT, on fresh login, we want the saved cart.
                            // IF we have local items (guest cart), we should add them to the remote cart.
                            // mergedItems[existingIdx].qty += localItem.qty; // Issue: product population might differ structure.
                            // Remote items come populated. Local items might be populated too from product page.
                        } else {
                            mergedItems.push(localItem);
                        }
                    });

                    // De-duplicate (simple merge logic above was imperfect, let's refine)
                    // Better Merge: Map by ID+Size
                    const itemMap = new Map();

                    remoteItems.forEach(item => {
                        const key = `${item.product._id}-${item.selectedSize || item.size}`; // Handle backend schema diff if any
                        // Backend 'cartItems' schema has 'selectedSize', frontend uses 'size'.
                        // We need to normalize. Backend returns populated product.
                        // Let's normalize remote items to frontend structure
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
                            // Item exists in both. If this is a fresh login, we might want to prioritize the non-empty local cart?
                            // Actually, standard behavior: Merge.
                            const existing = itemMap.get(key);
                            existing.qty = Math.max(existing.qty, item.qty); // Keep max? Or sum?
                            // Let's just keep the local one if we have one, assuming user just added it.
                            itemMap.set(key, item);
                        } else {
                            itemMap.set(key, item);
                        }
                    });

                    const finalItems = Array.from(itemMap.values());

                    setCartItems(finalItems);

                    // 3. Save merged cart back to server
                    // Map back to backend structure for saving
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
                // optionally clear cart on logout? or keep for guest?
                // usually keep for guest.
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
