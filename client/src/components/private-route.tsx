import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute: ({ children }: { children: ReactNode }) => JSX.Element = ({
    children,
}) => {
    // const { token, user } = useAuth();
    const isLogin: boolean = false;

    if (!isLogin) return <Navigate to="/sign-in" replace />;

    return <>{children}</>;
};

export default PrivateRoute;
