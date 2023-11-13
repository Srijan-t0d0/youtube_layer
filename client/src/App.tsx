import { Route, Routes } from 'react-router-dom';

// Pages
import Login from './pages/login';
import Register from './pages/register';

// Components
import RootLayout from './components/root-layout';
import PrivateRoute from './components/private-route.tsx';

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
                                <h1>Home</h1>
                            </PrivateRoute>
                        }
                    />

                    <Route path="/sign-in" element={<Login />} />
                    <Route path="/sign-up" element={<Register />} />
                </Routes>
            </RootLayout>
        </AuthContextProvider>
    );
}

export default App;
