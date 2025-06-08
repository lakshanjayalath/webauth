import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Chart from '../components/Chart'; // <-- Add this import
import '../css/Dashboard.css';

const Dashboard = () => {
    return (
        <>
            <Header />

            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div className='dashboard-content' style={{ width: '100%', height: '100vh' }} >
                    <h1 style={{ textAlign: 'center' }}>Welcome to Dashboard</h1>
                    <Chart /> 
                </div>
            </div>
        </>
    );
};

export default Dashboard;
