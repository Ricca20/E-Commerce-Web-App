const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');
        if (cart) {
            res.json(cart.cartItems);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update user cart
// @route   POST /api/cart
// @access  Private
const updateCart = async (req, res) => {
    try {
        const { cartItems } = req.body;

        let cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            cart.cartItems = cartItems;
            await cart.save();
        } else {
            cart = await Cart.create({
                user: req.user._id,
                cartItems
            });
        }

        res.json(cart.cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getCart, updateCart };
