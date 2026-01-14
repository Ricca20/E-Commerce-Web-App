import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaTimes, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const CartSidebar = () => {
    const { isCartOpen, closeCart, cartItems, removeFromCart, updateQty } = useCart();

    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
                    >
                        <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-white">
                            <h2 className="text-xl font-bold tracking-tight">Your Cart ({cartItems.length})</h2>
                            <button onClick={closeCart} className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4 text-zinc-400">
                                        <FaTimes size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-zinc-900 mb-2">Cart is Empty</h3>
                                    <p className="text-zinc-500 mb-6">Looks like you haven't added anything yet.</p>
                                    <button
                                        onClick={closeCart}
                                        className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-zinc-800 transition-colors"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={`${item.product._id}-${item.size}`} className="flex gap-4">
                                        <div className="w-24 aspect-[3/4] bg-zinc-50 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-100">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-sm pr-4 line-clamp-2">
                                                        <Link to={`/product/${item.product._id}`} onClick={closeCart} className="hover:text-zinc-600 transition-colors">
                                                            {item.product.name}
                                                        </Link>
                                                    </h3>
                                                    <span className="text-sm font-bold">${item.product.price}</span>
                                                </div>
                                                <p className="text-xs text-zinc-500 mt-1 font-medium bg-zinc-100 inline-block px-2 py-0.5 rounded-sm">Size: {item.size}</p>
                                            </div>

                                            <div className="flex justify-between items-end">
                                                <div className="flex items-center border border-zinc-200 rounded-lg h-8 px-2 bg-white">
                                                    <button
                                                        onClick={() => updateQty(item.product._id, item.size, item.qty - 1)}
                                                        disabled={item.qty <= 1}
                                                        className="p-1 hover:text-zinc-600 disabled:opacity-30"
                                                    >
                                                        <FaMinus size={8} />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold">{item.qty}</span>
                                                    <button
                                                        onClick={() => updateQty(item.product._id, item.size, item.qty + 1)}
                                                        className="p-1 hover:text-zinc-600"
                                                    >
                                                        <FaPlus size={8} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.product._id, item.size)}
                                                    className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                                                    title="Remove item"
                                                >
                                                    <FaTrash size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-zinc-100 bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-base font-bold text-zinc-500">Subtotal</span>
                                    <span className="text-xl font-bold text-zinc-900">${total.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-zinc-400 mb-6 text-center">Shipping & taxes calculated at checkout</p>
                                <Link
                                    to="/checkout"
                                    onClick={closeCart}
                                    className="block w-full bg-black text-white text-center py-4 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-zinc-800 transition-all hover:shadow-lg hover:shadow-black/10"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
