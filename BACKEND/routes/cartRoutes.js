const express = require('express');
const { addToCart, removeFromCart, getCartItems } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/', getCartItems);

// Use middleware for authentication
router.use(authMiddleware);

// Route to add a product to the cart
router.post('/add', addToCart);

// Route to remove a product from the cart
router.post('/remove', removeFromCart);

// Route to get all cart items for a user

module.exports = router;
