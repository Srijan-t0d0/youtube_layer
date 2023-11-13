import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContextProvider';

const PrivateRoute: ({ children }: { children: ReactNode }) => JSX.Element = ({
    children,
}) => {
    // const { token, user } = useAuth();
    // const isLogin: boolean = state.isLoggedIn;
    const token = localStorage.getItem('token');

    if (!token) return <Navigate to="/sign-in" replace />;

    return <>{children}</>;
};

export default PrivateRoute;
