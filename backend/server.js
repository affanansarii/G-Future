const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Sample in-memory cart
let cart = [];
const users = [];

app.post('/api/register', (req, res) => {
    const { email, password } = req.body;

    const userExists = users.find((user) => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    users.push({ email, password });
    return res.status(200).json({ message: 'Registration successful' });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
        return res.status(200).json({ message: 'Login successful', token: 'fake-jwt-token' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});

// Load products
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, 'data', 'products.json');
let products = [];

fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading products file:', err);
        products = [];
    } else {
        products = JSON.parse(data);
    }
});

// Routes

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Get a single product by ID
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Add item to cart
app.post('/api/cart', (req, res) => {
    const { productId, quantity } = req.body;
    const product = products.find((p) => p.id === productId);
    if (product) {
        const existingItem = cart.find((item) => item.product.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ product, quantity });
        }
        res.json(cart);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Get cart items
app.get('/api/cart', (req, res) => {
    res.json(cart);
});

// Remove item from cart
app.delete('/api/cart/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    cart = cart.filter((item) => item.product.id !== productId);
    res.json(cart);
});

// Checkout
app.post('/api/checkout', (req, res) => {
    const { shippingInfo, paymentInfo } = req.body;
    // Here you would handle payment processing and order creation
    // For simplicity, we'll just clear the cart
    cart = [];
    res.json({ message: 'Checkout successful' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
