import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./page/HomePage";
import SigninPage from "./page/SigninPage";
import SignupPage from "./page/SignupPage";
import ProductsDetailsPage from "./page/ProductDetailsPage";
import AdminPage from "./page/AdminPage";
import DashboardPage from "./page/DashboardPage";
import CartPage from "./page/CartPage";
import ProductForm from "./components/products/ProductForm";
import { UserProvider } from "./components/context/UserProvider";
import Protected from "./components/auth/Protected";
import Logout from "./components/auth/Logout";
import UserOrderPage from "./page/UserOrdersPage";
import FilterPage from "./page/FilterPage";
import Cancel from "./components/Cancel";
import Success from "./components/Success";
import StripeCheckout from "./components/StripeCheckout";
import Checkout from "./components/Checkout";

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
    path: "/product-form",
    element: (
      <Protected>
        <ProductForm></ProductForm>
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: (
      // <Protected>
      <Logout></Logout>
      // </Protected>
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
      // <Protected>
      <Success></Success>
      // </Protected>
    ),
  },
  {
    path: "/cancel",
    element: (
      <Protected>
        <Cancel></Cancel>
      </Protected>
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
    path: "/stripe-checkout/",
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    ),
  },
]);

function App() {


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
    
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
    </div>
  );
}

export default App;
