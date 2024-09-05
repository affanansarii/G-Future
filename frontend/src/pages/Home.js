import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function Home() {
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        // For simplicity, consider the first 3 products as featured
        const fetchFeatured = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setFeatured(res.data.slice(0, 3));
            } catch (error) {
                console.error('Error fetching featured products:', error);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <Box>
            <Heading mb={4}>Featured Products</Heading>
            {featured.length === 0 ? (
                <Text>Loading...</Text>
            ) : (
                <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                    {featured.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
}

export default Home;
