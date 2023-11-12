import { ReactNode, useReducer } from 'react';
import { createContext } from 'react';

interface AuthState {
    isLoading: boolean;
    username: string;
    email: string;
    error: string;
}

type AuthAction =
    | { type: 'LOGIN' }
    | { type: 'REGISTER' }
    | { type: 'LOGOUT' }
    | { type: 'DEFAULT' };

interface AuthContextType {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}
const reducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            console.log('hi from reducer login');
            return state;
        case 'REGISTER':
            console.log('hi from reducer register');
            return state;
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
    username: '',
    email: '',
    error: '',
};

const AuthContext = createContext({} as AuthContextType);

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, authState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContextProvider;
export type { AuthState, AuthAction };
export { AuthContext };
