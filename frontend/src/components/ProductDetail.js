import React, { useState, useEffect } from 'react';
import {
    Box,
    Image,
    Text,
    Button,
    Stack,
    Input,
    useToast
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const toast = useToast();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        try {
            await axios.post('http://localhost:5000/api/cart', {
                productId: product.id,
                quantity: parseInt(quantity)
            });
            toast({
                title: 'Added to cart.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    if (!product) return <Text>Loading...</Text>;

    return (
        <Box maxW="800px" mx="auto" p={4}>
            <Stack direction={['column', 'row']} spacing={4}>
                <Image src={product.image} alt={product.name} boxSize="300px" objectFit="cover" />
                <Box>
                    <Text fontSize="2xl" fontWeight="bold">{product.name}</Text>
                    <Text fontSize="xl" color="teal.600">${product.price.toFixed(2)}</Text>
                    <Text mt={4}>{product.description}</Text>
                    <Stack direction="row" mt={4} alignItems="center">
                        <Text>Quantity:</Text>
                        <Input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            width="60px"
                            min="1"
                        />
                    </Stack>
                    <Button colorScheme="teal" mt={4} onClick={addToCart}>
                        Add to Cart
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}

export default ProductDetail;
