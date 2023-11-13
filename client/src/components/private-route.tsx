import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';

const PrivateRoute: ({ children }: { children: ReactNode }) => JSX.Element = ({
    children,
}) => {
    // const { token, user } = useAuth();
    const { state } = useContext(AuthContext);
    const isLogin: boolean = state.isLoggedIn;
    console.log(state);

    if (!isLogin) return <Navigate to="/sign-in" replace />;

    return <>{children}</>;
};

export default PrivateRoute;
