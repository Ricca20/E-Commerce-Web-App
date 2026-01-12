
import { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('');
    const [search, setSearch] = useState('');
    const [size, setSize] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (activeCategory) params.append('category', activeCategory);
                if (size) params.append('size', size);
                if (minPrice) params.append('minPrice', minPrice);
                if (maxPrice) params.append('maxPrice', maxPrice);
                params.append('pageNumber', page);

                const { data } = await api.get(`/products?${params.toString()}`);
                setProducts(data.products || []);
                setTotalPages(data.pages || 1);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [activeCategory, search, size, minPrice, maxPrice, page]);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [activeCategory, search, size, minPrice, maxPrice]);

    const clearFilters = () => {
        setSearch('');
        setActiveCategory('');
        setSize('');
        setMinPrice('');
        setMaxPrice('');
        setPage(1);
    };

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
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Sidebar Filters */}
                    <div className="lg:w-1/4 space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-zinc-900 mb-4">Search</h3>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-4 py-3 bg-zinc-50 border-none rounded-lg focus:ring-2 focus:ring-black transition-all"
                            />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-zinc-900 mb-4">Categories</h3>
                            <div className="flex flex-wrap gap-2">
                                {['', 'Men', 'Women', 'Kids'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all w-full text-left ${activeCategory === cat
                                            ? 'bg-black text-white'
                                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                            }`}
                                    >
                                        {cat || "All Categories"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-zinc-900 mb-4">Size</h3>
                            <div className="flex flex-wrap gap-2">
                                {['S', 'M', 'L', 'XL'].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(size === s ? '' : s)}
                                        className={`w-10 h-10 rounded-lg text-sm font-bold transition-all border ${size === s
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-zinc-900 mb-4">Price Range</h3>
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="w-full px-4 py-2 bg-zinc-50 border-none rounded-lg focus:ring-2 focus:ring-black text-sm"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-full px-4 py-2 bg-zinc-50 border-none rounded-lg focus:ring-2 focus:ring-black text-sm"
                                />
                            </div>
                        </div>

                        <button
                            onClick={clearFilters}
                            className="w-full py-3 text-sm font-bold text-zinc-500 hover:text-red-500 transition-colors border-t border-zinc-100 mt-4"
                        >
                            Clear All Filters
                        </button>
                    </div>

                    {/* Product Grid */}
                    <div className="lg:w-3/4">
                        <div className="mb-6 flex justify-between items-end">
                            <h2 className="text-2xl font-bold text-zinc-900">Latest Drops</h2>
                            <span className="text-sm text-zinc-500 font-medium">{products.length} products found</span>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 animate-pulse">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="aspect-[4/5] bg-zinc-100 rounded-xl"></div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6">
                                    {products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>

                                {products.length === 0 && (
                                    <div className="text-center py-20 bg-zinc-50 rounded-xl mt-10">
                                        <p className="text-zinc-500 font-medium">No products found matching your criteria.</p>
                                        <button
                                            onClick={clearFilters}
                                            className="mt-4 text-black font-bold underline"
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                )}

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center mt-16 gap-2">
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            className="px-4 py-2 rounded-lg text-sm font-bold bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Previous
                                        </button>
                                        <span className="px-4 py-2 text-sm font-bold bg-white border border-zinc-200 rounded-lg">
                                            Page {page} of {totalPages}
                                        </span>
                                        <button
                                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                            disabled={page === totalPages}
                                            className="px-4 py-2 rounded-lg text-sm font-bold bg-zinc-100 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
