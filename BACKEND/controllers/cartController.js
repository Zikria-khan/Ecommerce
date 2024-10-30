const Order = require('../models/orderModel'); // Adjust the import based on your project structure
const Product = require('../models/productModel'); // Import your product model
const stripe = require('../config/stripeConfig'); // Import your Stripe configuration

// Add product to cart
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body; // Make sure to get productId and quantity from request body
    const userId = req.user.id; // Ensure you're getting the user's ID correctly
  
    try {
      // Logic to add the product to the cart goes here
      const cart = await Order.findOne({ user: userId }) || new Order({ user: userId, products: [] });
  
      const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId);
      if (existingProductIndex > -1) {
        // Product already exists in cart, update quantity
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // Add new product to cart
        cart.products.push({ product: productId, quantity });
      }
  
      await cart.save();
  
      return res.status(200).json({ success: true, message: 'Product added to cart successfully!' });
    } catch (error) {
      console.error('Error adding to cart:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  // Remove product from cart
const removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        // Find the user's cart
        const cart = await Order.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove item from the cart
        cart.products = cart.products.filter(item => item.product.toString() !== productId);
        await cart.save();

        return res.status(200).json({ message: 'Product removed from cart', products: cart.products });
    } catch (error) {
        console.error('Error removing from cart:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
// Get all cart items for a specific user
const getCartItems = async (req, res) => {
    const { userId } = req.body; // Extract userId from the request body

    try {
        const cart = await Order.findOne({ user: userId }).populate('products.product');

        if (!cart || cart.products.length === 0) {
            return res.status(200).json({ message: 'Cart is empty.', products: [] });
        }

        return res.status(200).json(cart.products);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// Checkout process
const checkout = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Order.findOne({ user: userId }).populate('products.product');

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty.' });
        }

        // Calculate total amount
        const totalAmount = cart.products.reduce((total, item) => total + item.quantity * item.product.price, 0);

        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100, // Amount in cents
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating Stripe payment:', error);
        res.status(500).json({ message: 'Error creating payment' });
    }
};

module.exports = {
    addToCart,
    removeFromCart,
    getCartItems,
    checkout,
};
