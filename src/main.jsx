import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router";
import { router } from "./Router/Route";
import AuthProvider from "./Provider/AuthProvider";
import "aos/dist/aos.css";

// ✅ TanStack Query imports
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

// ✅ Create a Query Client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
