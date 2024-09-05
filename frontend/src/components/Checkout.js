import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    Heading,
    Textarea,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        city: '',
        zip: ''
    });
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/checkout', {
                shippingInfo,
                paymentInfo
            });
            toast({
                title: 'Purchase successful.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/');
        } catch (error) {
            console.error('Error during checkout:', error);
            toast({
                title: 'Checkout failed.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box maxW="600px" mx="auto" p={4}>
            <Heading mb={4}>Checkout</Heading>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <Box>
                        <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                value={shippingInfo.name}
                                onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="address" isRequired>
                            <FormLabel>Address</FormLabel>
                            <Textarea
                                value={shippingInfo.address}
                                onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="city" isRequired>
                            <FormLabel>City</FormLabel>
                            <Input
                                type="text"
                                value={shippingInfo.city}
                                onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="zip" isRequired>
                            <FormLabel>ZIP Code</FormLabel>
                            <Input
                                type="text"
                                value={shippingInfo.zip}
                                onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="cardNumber" isRequired>
                            <FormLabel>Card Number</FormLabel>
                            <Input
                                type="text"
                                value={paymentInfo.cardNumber}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="expiry" isRequired>
                            <FormLabel>Expiry Date</FormLabel>
                            <Input
                                type="text"
                                placeholder="MM/YY"
                                value={paymentInfo.expiry}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl id="cvv" isRequired>
                            <FormLabel>CVV</FormLabel>
                            <Input
                                type="text"
                                value={paymentInfo.cvv}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                            />
                        </FormControl>
                    </Box>
                    <Button colorScheme="teal" type="submit">
                        Submit Order
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}

export default Checkout;
