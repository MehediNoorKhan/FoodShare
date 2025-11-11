import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import AuthContext from "../Provider/AuthContext";
import AddFoodSkeleton from "../Skeletons/AddFoodSkeleton";
import ManageFoodSkeleton from "../Skeletons/ManageFoodSkeleton";
import MembershipSkeleton from "../Skeletons/MembershipSkeleton";
import MyFoodRequestSkeleton from "../Skeletons/MyFoodRequestSkeleton";
import FoodDetailsSkeleton from "../Skeletons/FoodDetailsSkeelton";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        if (user && user.email) {
            localStorage.setItem(`lastVisited-${user.email}`, location.pathname);
        }
    }, [location.pathname, user]);

    // ✅ Show route-specific skeleton while loading
    if (loading) {
        const path = location.pathname.toLowerCase();

        if (path.includes("addfood")) return <AddFoodSkeleton></AddFoodSkeleton>;
        if (path.includes("managefood")) return <ManageFoodSkeleton></ManageFoodSkeleton>;
        if (path.includes("membership")) return <MembershipSkeleton></MembershipSkeleton>;
        if (path.includes("myfoodrequest")) return <MyFoodRequestSkeleton></MyFoodRequestSkeleton>;
        if (path.includes("fooddetails")) return <FoodDetailsSkeleton></FoodDetailsSkeleton>;


    }

    // Not logged in → redirect to login
    if (!user) {
        return <Navigate to="/login" state={location.pathname} />;
    }

    return children;
};

export default PrivateRoute;
