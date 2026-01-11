
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = () => {
    const { cartItems, removeFromCart, updateQty, clearCart } = useCart();

    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-8 py-32 text-center bg-zinc-50 min-h-screen">
                <h2 className="text-3xl font-bold mb-4 tracking-tight">Your Cart is Empty</h2>
                <p className="text-zinc-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link to="/" className="inline-block bg-black text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-zinc-800 transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold mb-10 tracking-tight text-center md:text-left">Shopping Cart</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items List */}
                    <div className="lg:w-2/3 space-y-6">
                        {cartItems.map((item) => (
                            <div key={`${item.product._id}-${item.size}`} className="flex gap-6 bg-white p-6 rounded-lg shadow-sm border border-zinc-100 items-start">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-24 h-32 object-cover object-center bg-zinc-100 rounded-sm"
                                />
                                <div className="flex-1 flex flex-col justify-between h-32 py-1">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-medium text-zinc-900">
                                                <Link to={`/product/${item.product._id}`} className="hover:underline">
                                                    {item.product.name}
                                                </Link>
                                            </h3>
                                            <p className="text-lg font-semibold text-zinc-900">${item.product.price}</p>
                                        </div>
                                        <p className="text-sm text-zinc-500 mt-1">Size: {item.size}</p>
                                    </div>

                                    <div className="flex justify-between items-center mt-auto">
                                        <div className="flex items-center border border-zinc-200 rounded-md">
                                            <button
                                                className="p-2 text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors"
                                                onClick={() => updateQty(item.product._id, item.size, item.qty - 1)}
                                                disabled={item.qty <= 1}
                                            >
                                                <FaMinus size={10} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                                            <button
                                                className="p-2 text-zinc-500 hover:text-black hover:bg-zinc-50 transition-colors"
                                                onClick={() => updateQty(item.product._id, item.size, item.qty + 1)}
                                            >
                                                <FaPlus size={10} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product._id, item.size)}
                                            className="text-sm text-red-500 hover:text-red-700 underline underline-offset-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-8 rounded-lg shadow-lg border border-zinc-100 sticky top-24">
                            <h2 className="text-xl font-bold mb-6 tracking-tight">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-zinc-600">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-zinc-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                            </div>

                            <div className="border-t border-zinc-200 pt-6 mb-8">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-zinc-900">Total</span>
                                    <span className="text-2xl font-bold text-zinc-900">${total.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-zinc-400 mt-2">Including taxes</p>
                            </div>

                            <Link
                                to="/checkout"
                                className="block w-full bg-black text-white text-center py-4 text-sm font-bold uppercase tracking-wider rounded hover:bg-zinc-800 transition-all transform hover:-translate-y-0.5"
                            >
                                Checkout
                            </Link>

                            <button
                                onClick={clearCart}
                                className="block w-full text-center mt-4 text-xs text-zinc-400 hover:text-red-500 transition-colors"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
