import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Chart from '../components/Chart';
import '../css/Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://localhost:5080/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(res => {
                    const email = res.data.email || '';
                    const name = email.split('@')[0];
                    setUsername(name);
                })
                .catch(err => setUsername(''));
        }
    }, []);

    return (
        <>
            <Header />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div className='dashboard-content' style={{ width: '100%', height: '100vh' }}>
                    <h1 style={{ textAlign: 'center' }}>
                        Welcome to Dashboard{username ? ` (${username})` : ''}
                    </h1>
                    <Chart />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
