
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems, openCart } = useCart();

    // Persistent header with minimal backdrop blur
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-zinc-100 py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Mobile Menu */}
                <button className="md:hidden text-zinc-900">
                    <FaBars size={20} />
                </button>

                {/* Logo - Text Based, Bold Geometric */}
                <Link to="/" className="text-2xl font-bold tracking-tighter text-black uppercase">
                    Pasovit
                </Link>

                {/* Desktop Links - Clean Sans */}
                <div className="hidden md:flex items-center space-x-10 text-sm font-medium text-zinc-500">
                    <Link to="/" className="hover:text-black transition-colors">Shop</Link>
                    <Link to="/" className="hover:text-black transition-colors">New Arrivals</Link>
                    <Link to="/" className="hover:text-black transition-colors">About</Link>
                </div>

                {/* Icons - Minimal */}
                <div className="flex items-center space-x-6">
                    {user ? (
                        <div className="hidden md:flex items-center space-x-4">
                            <span className="text-xs font-semibold text-zinc-400">{user.name}</span>
                            <button
                                onClick={logout}
                                className="text-xs font-bold uppercase tracking-wide hover:text-red-500 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="text-zinc-900 hover:text-zinc-600 transition-colors">
                            <FaUser size={18} />
                        </Link>
                    )}

                    <button
                        onClick={openCart}
                        className="relative text-zinc-900 hover:text-zinc-600 transition-colors flex items-center gap-2"
                    >
                        <FaShoppingCart size={20} />
                        <span className="text-sm font-bold">{totalItems}</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
