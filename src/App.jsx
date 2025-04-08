import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
// Pages

import RootLayout from "./layout/RootLayout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy, Suspense } from "react";
import PageLoader from "./components/PageLoader";
import Notfound from "./components/Notfound";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const Create = lazy(() => import("./pages/Create/Create"));
const Edit = lazy(() => import("./pages/Edit/Edit"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="edit/:id" element={<Edit />} />
      <Route path="/create" element={<Create />} />
      <Route path="/login" element={<Login />} />
      <Route index path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Notfound />} />
    </Route>
  )
);

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  });
  return (
    <QueryClientProvider client={client}>
      {/* <ReactQueryDevtools client={client} /> */}
      <Toaster position="top-right" />
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
