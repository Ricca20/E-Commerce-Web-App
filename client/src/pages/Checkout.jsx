
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [address, setAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });

    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login to checkout");
            navigate('/login');
            return;
        }

        try {
            const orderData = {
                orderItems: cartItems.map(item => ({
                    product: item.product._id,
                    name: item.product.name,
                    qty: item.qty,
                    image: item.product.image,
                    price: item.product.price,
                    size: item.size
                })),
                shippingAddress: address,
                totalPrice: total
            };

            await api.post('/orders', orderData);
            clearCart();
            alert("Order placed successfully!");
            navigate('/');
        } catch (error) {
            console.error("Checkout failed", error);
            alert("Checkout failed. Please try again.");
        }
    };

    if (cartItems.length === 0) return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <button
                    onClick={() => navigate('/')}
                    className="text-zinc-600 hover:text-black underline"
                >
                    Return to Shop
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-zinc-50 py-20 px-4 sm:px-6 lg:px-8 pt-32">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-10 tracking-tight">Checkout</h1>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <h2 className="text-xl font-bold mb-6 text-zinc-900">Shipping Address</h2>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label className="block text-sm font-bold text-zinc-700 mb-2">Street Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:border-black focus:bg-white outline-none transition-all"
                                        placeholder="123 Main St"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-bold text-zinc-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:border-black focus:bg-white outline-none transition-all"
                                        placeholder="New York"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-bold text-zinc-700 mb-2">Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:border-black focus:bg-white outline-none transition-all"
                                        placeholder="10001"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-bold text-zinc-700 mb-2">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:border-black focus:bg-white outline-none transition-all"
                                        placeholder="USA"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-zinc-100 pt-8">
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-lg font-medium text-zinc-500">Total</span>
                                <span className="text-4xl font-bold text-zinc-900">${total.toFixed(2)}</span>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white py-5 rounded-xl text-lg font-bold hover:bg-zinc-800 transition-colors shadow-lg shadow-black/5"
                            >
                                Place Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
