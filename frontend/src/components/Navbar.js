import React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Flex,
    Heading,
    Spacer,
    Button,
    IconButton,
    Badge
} from '@chakra-ui/react';
import { BellIcon } from "@chakra-ui/icons"
import axios from 'axios';
import { useState, useEffect } from 'react';

function Navbar() {
    const [cartCount, setCartCount] = useState(0);

    const fetchCart = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/cart');
            const count = res.data.reduce((acc, item) => acc + item.quantity, 0);
            setCartCount(count);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <Box bg="teal.500" px={4} py={2} color="white">
            <Flex alignItems="center">
                <Link to="/">
                    <Heading size="md">E-Commerce</Heading>
                </Link>
                <Spacer />
                <Link to="/products">
                    <Button variant="ghost" color="white" mr={4}>
                        Products
                    </Button>
                </Link>
                <Link to="/cart">
                    <IconButton
                        icon={<BellIcon />}
                        variant="ghost"
                        color="white"
                        position="relative"
                    >
                        {cartCount > 0 && (
                            <Badge
                                position="absolute"
                                top="0"
                                right="0"
                                rounded="full"
                                bg="red.500"
                                color="white"
                                fontSize="0.8em"
                            >
                                {cartCount}
                            </Badge>
                        )}
                    </IconButton>
                </Link>
                <Link to="/login">
                    <Button colorScheme='teal' variant="outline" ml={4}>Login</Button>
                </Link>
            </Flex>
        </Box>
    );
}

export default Navbar;
