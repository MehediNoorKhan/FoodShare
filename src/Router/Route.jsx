import {
    createBrowserRouter,
} from "react-router";
import RootLayout from "../Components/RootLayout";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import AddFood from "../Components/AddFood";
import PrivateRoute from "../Components/PrivateRoute";
import ManageMyFoods from "../Components/ManageMyFoods";
import AvaialableFoods from "../Components/AvaialableFoods";
import FoodDetails from "../Components/FoodDetails";
import axios from "axios";
import ManageFood from "../Components/ManageFood";
import axiosSecure from "../Hooks/axiosSecure";
import MyFoodRequest from "../Components/MyFoodRequest";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,

        children: [
            {
                index: true,
                path: "/",
                Component: Home,

            },
            {
                path: "/login",
                Component: Login
            },
            {
                path: "/register",
                Component: Register
            },
            {
                path: '/addfood',
                element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
            },
            {
                path: '/availablefoods',
                Component: AvaialableFoods
            },

            {
                path: '/myfoodrequest',
                element: <PrivateRoute><MyFoodRequest></MyFoodRequest></PrivateRoute>
            },

            {
                path: '/myfoodrequest',
                element: (
                    <PrivateRoute>
                        <MyFoodRequest />
                    </PrivateRoute>
                ),
                loader: async () => {
                    const res = await axiosSecure.get('/myfoodrequest');
                    return res.data;
                }
            },

            {
                path: '/fooddetails/:id',
                element: <FoodDetails />,
                loader: async ({ params }) => {
                    try {
                        const res = await axios.get(`http://localhost:3000/food/${params.id}`);
                        return res.data;
                    } catch (error) {
                        console.error('Error fetching food details:', error);
                        throw new Response('Failed to fetch food details', { status: 500 });
                    }
                },
            },
            {
                path: '/manage-food',
                element: (
                    <PrivateRoute>
                        <ManageFood></ManageFood>
                    </PrivateRoute>
                ),
            },
        ],
    },
]);
