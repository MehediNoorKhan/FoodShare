// RootLayout.jsx
import React from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Main content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default RootLayout;
