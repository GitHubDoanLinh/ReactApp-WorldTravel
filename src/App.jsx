import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";
// import HomePage from "./pages/HomePage";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

// dist/assets/index-59fcab9b.css   30.56 kB │ gzip:   5.14 kB :(
// dist/assets/index-f7c12d89.js   572.44 kB │ gzip: 151.29 kB :(

const HomePage = lazy(()=>import("./pages/HomePage"))
const Product = lazy(()=>import("./pages/Product"))
const Pricing = lazy(()=>import("./pages/Pricing"))
const Login = lazy(()=>import("./pages/Login"))
const AppLayout = lazy(()=>import("./pages/AppLayout"))
const PageNotFound = lazy(()=>import("./pages/PageNotFound"))




export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage/>}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
