import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./page/HomePage";
import SigninPage from "./page/SigninPage";
import SignupPage from "./page/SignupPage";
import ProductsDetailsPage from "./page/ProductDetailsPage";
import AdminPage from "./page/AdminPage";
import DashboardPage from "./page/DashboardPage";
import CartPage from "./page/CartPage";
import { UserProvider } from "./components/context/UserProvider";
import Protected from "./components/auth/Protected";
import Logout from "./components/auth/Logout";
import UserOrderPage from "./page/UserOrdersPage";
import FilterPage from "./page/FilterMainPage";
import StripeCheckout from "./components/checkout/StripeCheckout";
import Checkout from "./components/checkout/Checkout";
import OrderSuccessPage from "./page/OrderSuccessPage";
import AlertTemplate from "react-alert-template-basic";
import { positions, transitions, Provider  } from "react-alert";
import FilterToggle from "./components/filter/FilterToggle";
import ProfileUpdate from "./components/user/ProfileUpdate";
import AddAddress from "./components/user/AddAddress";
import SuccessPage from "./page/SuccessPage";
import AdminProductList from "./components/admin/Components/AdminProductList";
import AdminProductFormPage from "./page/AdminProductFormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <HomePage></HomePage>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <Protected>
        <AdminProductList></AdminProductList>
      </Protected>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <Protected>
        <AdminProductFormPage></AdminProductFormPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <Protected>
        <AdminProductFormPage></AdminProductFormPage>
      </Protected>
    ),
  },
  {
    path: "/filter",
    element: (
      <Protected>
        <FilterToggle></FilterToggle>
      </Protected>
    ),
  },
  {
    path: "/filter-page",
    element: (
      <Protected>
        {" "}
        <FilterPage></FilterPage>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <SigninPage></SigninPage>,
  },
  {
    path: "/SignUp",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/product-details/:id",
    element: (
      <Protected>
        <ProductsDetailsPage></ProductsDetailsPage>
      </Protected>
    ),
  },
  {
    path: "/cart-page",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/dashboard-page",
    element: (
      <Protected>
        <DashboardPage></DashboardPage>
      </Protected>
    ),
  },
  {
    path: "/admin-page",
    element: (
      <Protected>
        {" "}
        <AdminPage></AdminPage>{" "}
      </Protected>
    ),
  },

  {
    path: "/logout",
    element: (
      <Logout></Logout>
    ),
  },
  {
    path: "/order-page",
    element: (
      <Protected>
        <UserOrderPage></UserOrderPage>
      </Protected>
    ),
  },
  {
    path: "/success",
    element: (
      <SuccessPage></SuccessPage>
    ),
  },
  {
    path: "/checkout/",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: "/stripe-checkout",
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    ),
  },
  {
    path: "/profileUpdate",
    element: (
      <Protected>
        <ProfileUpdate></ProfileUpdate>
      </Protected>
    ),
  },
  {
    path: "/addAddress",
    element: (
      <Protected>
        <AddAddress></AddAddress>
      </Protected>
    ),
  },
 
]);

function App() {

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_LEFT,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
return (
    <div className="App">
      {" "}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />{" "}
    <Provider template={AlertTemplate} {...options}>
        <UserProvider  >
          <RouterProvider router={router} />
        </UserProvider></Provider>
    </div>
  );
}

export default App;
