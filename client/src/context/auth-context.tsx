// import React, { useEffect, createContext, useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext<{
//     token: string | null;
//     login: (data: { username: string; password: string }) => Promise<void>;
//     register: (data: {
//         email: string;
//         role: string;
//         username: string;
//         password: string;
//     }) => Promise<void>;
//     logout: () => Promise<void>;
// }>({
//     token: '',
//     login: async () => {},
//     register: async () => {},
//     logout: async () => {},
// });

// const useAuth = () => useContext(AuthContext);

// const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//     children,
// }) => {
//     const [loading, setLoading] = useState<boolean>(false);
//     const [token, setToken] = useState<string | null>(null);

//     const navigate = useNavigate();

//     return <div>AuthContext</div>;
// };

// export default AuthProvider;

// MAYBE WE NEED THIS IN FUTURE!!
