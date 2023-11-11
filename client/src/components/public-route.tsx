import { ReactNode } from 'react';

// const PublicRoute: React.FC<{ children: ReactNode }> = ({ children }) => {

//     return children;
// };

const PublicRoute: ({ children }: { children: ReactNode }) => ReactNode = ({
    children,
}) => {
    // Adding the useAuth here and navigting to homepage

    return children;
};

// Export the PublicRoute component for use in other parts of the application
export default PublicRoute;
