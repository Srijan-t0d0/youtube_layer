import React, { useState } from 'react';
import {
    Button,
    CssBaseline,
    Container,
    Box,
    Typography,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';

import { Link } from 'react-router-dom';
import { registerUser } from '../api/auth';

interface RegisterFormData {
    username: string;
    email: string;
    role: string;
    password: string;
}

const Register = () => {
    // const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        email: '',
        role: '',
        password: '',
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.role
        )
            return;

        try {
            console.log('registering user...');
            const res = await registerUser(formData);
            console.log(res);
            const { message, token } = res.data;
            console.log(message, token);
            localStorage.setItem('token', token);
        } catch (error) {
            console.log('[REGISTER] ', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (event: SelectChangeEvent) => {
        const { value, name } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Container component={'main'} maxWidth="xs">
            <CssBaseline />

            <Box>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                        value={formData.email}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        onChange={handleChange}
                        value={formData.username}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        value={formData.password}
                    />

                    <FormControl sx={{ marginTop: 1, width: '100%' }}>
                        <InputLabel id="roleLabel">Role</InputLabel>
                        <Select
                            labelId="roleLabel"
                            id="roleLabel"
                            name="role"
                            label="Role"
                            onChange={handleRoleChange}
                            value={formData.role}
                        >
                            <MenuItem value={'youtuber'}>Youtuber</MenuItem>
                            <MenuItem value={'editor'}>Editor</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid marginInline={'auto'} item>
                            <Link to={'/sign-in'}>
                                {'Already have an account? Sign In'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
