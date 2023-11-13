export interface RegisterUserInterface {
    username: string;
    password: string;
    email: string;
    role: string;
}

// Auth related api calls
import apiClient from '..';

const loginUser = (data: { username: string; password: string }) => {
    return apiClient.post('/auth/login', data);
};

const registerUser = (data: RegisterUserInterface) => {
    return apiClient.post('/auth/register', data);
};

// const logoutUser = () => {

// }

export { loginUser, registerUser };
