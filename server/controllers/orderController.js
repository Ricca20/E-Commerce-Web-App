const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User'); // Import User model
const sendEmail = require('../utils/sendEmail'); // Import Email utility

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
            isPaid: true,
            paidAt: Date.now(),
        });

        const createdOrder = await order.save();

        // Send Confirmation Email
        try {
            const user = await User.findById(req.user._id);

            const message = `
                <h1>Thank you for your order!</h1>
                <p>Hi ${user.name},</p>
                <p>We have received your order. Here is the summary:</p>
                <h2>Order ID: ${createdOrder._id}</h2>
                <p><strong>Date:</strong> ${new Date(createdOrder.createdAt).toLocaleDateString()}</p>
                
                <h3>Items:</h3>
                <ul>
                    ${createdOrder.orderItems.map(item => `
                        <li>
                            <strong>${item.name}</strong> - Size: ${item.size} - Qty: ${item.qty} - $${item.price}
                        </li>
                    `).join('')}
                </ul>

                <h3>Total: $${createdOrder.totalPrice}</h3>
                <p>We will notify you when your order ships.</p>
            `;

            await sendEmail({
                email: user.email,
                subject: 'Order Confirmation - Clothing Brand',
                message
            });
        } catch (error) {
            console.error("Email could not be sent", error);
        }

        res.status(201).json(createdOrder);
    }
};

module.exports = { addOrderItems };
