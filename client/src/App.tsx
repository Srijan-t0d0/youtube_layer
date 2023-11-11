import { Route, Routes } from 'react-router-dom';

// Pages
import Login from './pages/login';
import Register from './pages/register';

// Components
import RootLayout from './components/root-layout';
import PrivateRoute from './components/private-route';

function App() {
    return (
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
    );
}

export default App;
