
import { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (activeCategory) params.append('category', activeCategory);
                const { data } = await api.get(`/products?${params.toString()}`);
                setProducts(data.products || []);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [activeCategory]);

    return (
        <div className="bg-white min-h-screen pb-20 pt-20">
            {/* Hero Section - Clean & Geometric */}
            <section className="container mx-auto px-6 md:px-12 mb-20">
                <div className="bg-zinc-100 rounded-2xl overflow-hidden relative h-[50vh] flex items-center justify-center text-center px-4">
                    <div className="relative z-10 max-w-3xl">
                        <span className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-4 block">New Collection</span>
                        <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-8 leading-tight tracking-tight">
                            Elevate Your <br /> Everyday.
                        </h1>
                        <button onClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })} className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-zinc-800 transition-colors">
                            Shop Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Shop Section */}
            <div id="shop" className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold text-zinc-900 mb-6 md:mb-0">Latest Drops</h2>

                    {/* Category Navigation - Pills */}
                    <div className="flex flex-wrap gap-2">
                        {['', 'Men', 'Women', 'Kids'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                                    ? 'bg-black text-white'
                                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                    }`}
                            >
                                {cat || "All"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 animate-pulse">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-[4/5] bg-zinc-100 rounded-xl"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}

                {products.length === 0 && !loading && (
                    <div className="text-center py-20 bg-zinc-50 rounded-xl mt-10">
                        <p className="text-zinc-500 font-medium">No products found in this category.</p>
                        <button
                            onClick={() => setActiveCategory('')}
                            className="mt-4 text-black font-bold underline"
                        >
                            View All Items
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
