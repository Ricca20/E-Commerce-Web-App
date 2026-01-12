import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { FaArrowLeft } from 'react-icons/fa';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                if (data.sizes && data.sizes.length > 0) {
                    setSelectedSize(data.sizes[0]);
                }
            } catch (err) {
                setError('Product not found');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
                <div className="animate-pulse text-zinc-400">Loading details...</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center items-center gap-4">
                <p className="text-red-500 font-medium">{error || 'Product not found'}</p>
                <button
                    onClick={() => navigate('/')}
                    className="text-zinc-900 underline font-bold"
                >
                    Back to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-medium text-sm"
                >
                    <FaArrowLeft size={12} />
                    Back
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Section */}
                    <div className="bg-zinc-50 rounded-2xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[calc(100vh-200px)] sticky top-24">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <div>
                            <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-500 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                {product.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-2xl font-medium text-zinc-900 mb-8">
                                ${product.price}
                            </p>
                        </div>

                        <div className="prose prose-zinc mb-10 text-zinc-600">
                            <p>{product.description}</p>
                        </div>

                        {/* Size Selector */}
                        <div className="mb-10">
                            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wide mb-4">Select Size</h3>
                            <div className="flex flex-wrap gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-14 h-14 rounded-lg flex items-center justify-center text-sm font-bold transition-all border-2
                                            ${selectedSize === size
                                                ? 'border-zinc-900 bg-zinc-900 text-white'
                                                : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => addToCart(product, selectedSize)}
                                className="flex-1 bg-zinc-900 text-white py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-zinc-800 transition-colors"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
