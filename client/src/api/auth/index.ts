// Auth related api calls
import apiClient from '..';

const loginUser = (data: { username: string; password: string }) => {
    return apiClient.post('/auth/login', data);
};

const registerUser = (data: {
    username: string;
    password: string;
    email: string;
    role: string;
}) => {
    return apiClient.post('/auth/register', data);
};

export { loginUser, registerUser };
