import React from 'react';
import {
    Box,
    Image,
    Text,
    Button,
    Stack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ViewIcon } from '@chakra-ui/icons';

function ProductCard({ product }) {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={product.image} alt={product.name} boxSize="200px" objectFit="cover" mx="auto" mt={4} />
            <Box p="6">
                <Stack spacing={3}>
                    <Text fontWeight="bold" as="h4" lineHeight="tight" noOfLines={1}>
                        {product.name}
                    </Text>
                    <Text>${product.price.toFixed(2)}</Text>
                    <Link to={`/products/${product.id}`}>
                        <Button colorScheme="teal" size="sm" leftIcon={<ViewIcon />}>
                            View Details
                        </Button>
                    </Link>
                </Stack>
            </Box>
        </Box>
    );
}

export default ProductCard;
