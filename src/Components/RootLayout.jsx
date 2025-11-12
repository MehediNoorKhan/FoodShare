// // RootLayout.jsx
// import React from 'react';
// import { Outlet } from 'react-router';
// import Header from './Header';
// import Footer from './Footer';

// const RootLayout = () => {
//     return (
//         <div className="flex flex-col min-h-screen">
//             {/* Header */}
//             <Header />

//             {/* Main content */}
//             <main className="flex-1">
//                 <Outlet />
//             </main>

//             {/* Footer */}
//             <Footer />
//         </div>
//     );
// };

// export default RootLayout;

// RootLayout.jsx
import React, { Suspense } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import PageSkeleton from "../Skeletons/PageSkeleton";

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Main content with loading fallback */}
            <main className="flex-1">
                <Suspense fallback={<PageSkeleton></PageSkeleton>}>
                    <Outlet />
                </Suspense>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default RootLayout;
