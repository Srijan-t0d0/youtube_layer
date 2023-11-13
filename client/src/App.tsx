import { Route, Routes } from 'react-router-dom';

// Pages
import Login from './pages/login';
import Register from './pages/register';

// Components
import RootLayout from './components/root-layout';
import PrivateRoute from './components/private-route.tsx';
import PublicRoute from './components/public-route.tsx';
import Header from './components/headet.tsx';
//context

import AuthContextProvider from './context/AuthContextProvider.tsx';

function App() {
    return (
        <AuthContextProvider>
            <RootLayout>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Header />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/sign-in"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route path="/sign-up" element={<Register />} />
                </Routes>
            </RootLayout>
        </AuthContextProvider>
    );
}

export default App;
