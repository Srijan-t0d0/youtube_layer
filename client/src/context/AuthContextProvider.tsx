import { ReactNode, useReducer } from 'react';
import { createContext } from 'react';
import { RegisterUserInterface, loginUser, registerUser } from '../api/auth';

interface AuthState {
    isLoading: boolean;
    token: string;
    error: string;
    isLoggedIn: boolean;
}

type AuthAction =
    | { type: 'LOGIN' }
    | {
          type: 'REGISTER';
          payload: { token: string; isLoggedIn: boolean; isLoading: boolean };
      }
    | { type: 'LOGOUT' }
    | { type: 'DEFAULT' };

interface AuthContextType {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
    register: (data: RegisterUserInterface) => void;
    login: (data: { username: string; password: string }) => void;
    logout: () => void;
}
const reducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            console.log('hi from reducer login');
            return state;
        case 'REGISTER':
            console.log('hi from reducer register');
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                token: action.payload.token,
                isLoading: action.payload.isLoading,
            };
        case 'LOGOUT':
            console.log('hi from reducer logout');
            return state;
        default:
            console.log('hi from reducer default');
            return state;
    }
};
const authState: AuthState = {
    isLoading: false,
    token: '',
    error: '',
    isLoggedIn: false,
};

const AuthContext = createContext({} as AuthContextType);

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, authState);

    const register = async (data: RegisterUserInterface) => {
        dispatch({
            type: 'REGISTER',
            payload: { isLoggedIn: false, token: '', isLoading: true },
        });
        const res = await registerUser(data);
        const token = res.data.token;
        console.log(token);
        localStorage.setItem('token', token);
        dispatch({
            type: 'REGISTER',
            payload: { isLoggedIn: true, token, isLoading: false },
        });
    };

    const login = async (data: { username: string; password: string }) => {
        const res = await loginUser(data);
        console.log(res);
    };

    const logout = async () => {
        localStorage.clear();
        // await logoutUser()
    };

    return (
        <AuthContext.Provider
            value={{ state, dispatch, register, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContextProvider;
export type { AuthState, AuthAction };
export { AuthContext };
