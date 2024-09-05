import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    Image,
    Button,
    Stack,
    Divider,
    Heading
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Cart() {
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/cart');
            setCart(res.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const removeFromCart = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/${id}`);
            fetchCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <Box maxW="800px" mx="auto" p={4}>
            <Heading mb={4}>Shopping Cart</Heading>
            {cart.length === 0 ? (
                <Text>Your cart is empty.</Text>
            ) : (
                <Stack spacing={4}>
                    {cart.map((item) => (
                        <Stack key={item.product.id} direction="row" spacing={4} alignItems="center">
                            <Image src={item.product.image} alt={item.product.name} boxSize="100px" objectFit="cover" />
                            <Box flex="1">
                                <Text fontWeight="bold">{item.product.name}</Text>
                                <Text>${item.product.price.toFixed(2)} x {item.quantity}</Text>
                            </Box>
                            <Button colorScheme="red" onClick={() => removeFromCart(item.product.id)} leftIcon={<DeleteIcon />}>
                                Remove
                            </Button>
                        </Stack>
                    ))}
                    <Divider />
                    <Text fontSize="xl" textAlign="right">Total: ${total.toFixed(2)}</Text>
                    <Link to="/checkout">
                        <Button colorScheme="teal" alignSelf="flex-end">
                            Proceed to Checkout
                        </Button>
                    </Link>
                </Stack>
            )}
        </Box>
    );
}

export default Cart;
