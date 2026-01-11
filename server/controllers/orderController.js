const Order = require('../models/Order');
const Cart = require('../models/Cart'); // Ideally we clear the server cart too, but for now we trust client to clear context

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid: true, // Mock payment
            paidAt: Date.now(),
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
};

module.exports = { addOrderItems };
