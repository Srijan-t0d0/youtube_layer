import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// const PublicRoute: React.FC<{ children: ReactNode }> = ({ children }) => {

//     return children;
// };

const PublicRoute: ({ children }: { children: ReactNode }) => JSX.Element = ({
    children,
}) => {
    // Adding the useAuth here and navigting to homepage
    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

// Export the PublicRoute component for use in other parts of the application
export default PublicRoute;
