import { useCart } from '../context/CartContext';
import { FaPlus } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="group flex flex-col h-full bg-white border border-zinc-100 hover:border-zinc-200 hover:shadow-sm transition-all rounded-xl overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-[4/5] bg-zinc-50 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Info Container */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-zinc-900 text-lg leading-tight">
                            {product.name}
                        </h3>
                        <p className="text-xs text-zinc-500 font-medium mt-1">{product.category}</p>
                    </div>
                    <span className="font-bold text-zinc-900">${product.price}</span>
                </div>

                <div className="mt-auto pt-4">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, product.sizes[0]);
                        }}
                        className="w-full bg-zinc-900 text-white py-3 rounded-lg text-sm font-bold hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <FaPlus size={10} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
