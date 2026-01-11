
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-zinc-100">

                {/* Right Side - Form */}
                <div className="p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <Link to="/" className="text-2xl font-bold tracking-tighter uppercase mb-8 block">Pasovit</Link>
                        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Create Account</h2>
                        <p className="text-zinc-500">Sign up in seconds.</p>
                    </div>

                    {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg mb-6 text-center">{error}</div>}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:border-black focus:bg-white outline-none transition-all"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:border-black focus:bg-white outline-none transition-all"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:border-black focus:bg-white outline-none transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-4 rounded-lg text-sm font-bold uppercase hover:bg-zinc-800 transition-all transform active:scale-[0.98] disabled:opacity-50 mt-4"
                        >
                            {loading ? 'Processing...' : 'Register'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-zinc-500 mt-8">
                        Already have an account?{' '}
                        <Link to="/login" className="text-black font-bold hover:underline">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
