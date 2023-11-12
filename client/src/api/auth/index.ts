// Auth related api calls
import apiClient from '..';

const loginUser = (data: { username: string; password: string }) => {
    return apiClient.post('/auth/login', data);
};

export interface RegisterUser{
    username: string;
    password: string;
    email: string;
    role: string;
}

const registerUser = (data:RegisterUser) => {
    return apiClient.post('/auth/register', data);
};

export { loginUser, registerUser };
