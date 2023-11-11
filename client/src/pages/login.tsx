import React, { useState } from 'react';
import {
    Button,
    CssBaseline,
    Container,
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Grid,
    Checkbox,
} from '@mui/material';

import { Link } from 'react-router-dom';

interface LoginFormData {
    username: string;
    password: string;
}

const Login = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.username || !formData.password) return;
        // submitForm;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Container component={'main'} maxWidth="xs">
            <CssBaseline />

            <Box>
                <Typography component="h1" variant="h5">
                    Sign in
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
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid marginInline={'auto'} item>
                            <Link to={'/sign-up'}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
