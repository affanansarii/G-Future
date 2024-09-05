import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                localStorage.setItem('authToken', 'user-token');
                navigate('/');
            } else {
                setError('Invalid credentials.');
            }
        } catch (error) {
            setError('An error occurred. Try again.');
        }
    };

    return (
        <Box maxW="400px" mx="auto" mt={8} p={4}>
            <Text fontSize="2xl" mb={4}>Login</Text>
            {error && <Text color="red.500" mb={4}>{error}</Text>}
            <FormControl id="email" mb={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" mb={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button colorScheme="teal" onClick={handleLogin} width="full">Login</Button>

            <Text mt={4}>Don't have an account?</Text>

            <Link to="/register">
                <Button color={'teal'} mt={4}>Register</Button>
            </Link>
        </Box>
    );
};

export default Login;
