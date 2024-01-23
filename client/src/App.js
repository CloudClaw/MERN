import Container from '@mui/material/Container';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchLogin } from './redux/slices/auth';
import React from 'react';

function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchLogin());
    }, []);

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts/:id" element={<FullPost />} />
                    <Route path="/add-post" element={<AddPost />} />
                    <Route path="/posts/:id/edit" element={<AddPost />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
