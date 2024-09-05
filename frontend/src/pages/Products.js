import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { SpinnerIcon } from '@chakra-ui/icons';

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchAll();
    }, []);

    return (
        <Box>
            <Heading mb={4}>All Products</Heading>
            {products.length === 0 ? (
                <Text><SpinnerIcon /></Text>
            ) : (
                <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
}

export default Products;
