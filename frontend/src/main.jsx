import ReactDom from "react-dom/client";
import App from "./App";
import "./index.css";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/Store";

//Private route
import PrivateRoute from "./components/PrivateRoute";

//Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./pages/User/Profile";

import AdminRoute from "./pages/Admin/AdminRoute";
import UserList from "./pages/Admin/UserList";
import CategoryList from "./pages/Admin/CategoryList";
import ProductList from "./pages/Admin/ProductList";
import ProductUpdate from "./pages/Admin/ProductUpdate";
import AllProducts from "./pages/Admin/AllProducts";
import Home from "./pages/Home";
import Favorites from "./pages/products/Favorites";
import ProductDetails from "./pages/products/ProductDetails";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Shipping from "./pages/Orders/Shipping";
import PlaceOrder from "./pages/Orders/PlaceOrder";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Order from "./pages/Orders/Order";
import UserOrder from "./pages/User/UserOrder";
import OrderList from "./pages/Admin/OrderList";
import AdminDashboard from "./pages/Admin/AdminDashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/user-orders" element={<UserOrder />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
);

ReactDom.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
