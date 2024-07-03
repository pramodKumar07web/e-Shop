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
import ProfileUpdate from "./components/user/ProfileUpdate";
import AddAddress from "./components/user/AddAddress";
import SuccessPage from "./page/SuccessPage";
import AdminProductList from "./components/admin/Components/AdminProductList";
import AdminProductFormPage from "./page/AdminProductFormPage";
import ViewOrders from "./components/admin/Components/ViewOrders";
import AddCategoryBrand from "./components/admin/Components/AddCategoryBrand";
import ProtectedAdmin from "./components/auth/ProtectedAdmin";
import ForgotPasswordPage from "./page/ForgotPasswordPage";
import ResetPasswordPage from "./page/ResetPasswordPage";
import SearchProductPage from "./page/SearchProductPage";

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
      <ProtectedAdmin>
        <AdminProductList></AdminProductList>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/category_brand",
    element: (
      <ProtectedAdmin>
        <AddCategoryBrand></AddCategoryBrand>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path:"/view-orders",
    element: (
      <ProtectedAdmin>
        <ViewOrders></ViewOrders>
      </ProtectedAdmin>
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
    path: "/search-page",
    element: (
      <Protected>
        {" "}
        <SearchProductPage></SearchProductPage>
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
    path: "/admin/product-details/:id",
    element: (
      <ProtectedAdmin>
        <ProductsDetailsPage></ProductsDetailsPage>
      </ProtectedAdmin>
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
      <ProtectedAdmin>
    
        <AdminPage></AdminPage>
      </ProtectedAdmin>
    ),
  },

  {
    path: "/logout",
    element: (
      <Logout></Logout>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <ForgotPasswordPage></ForgotPasswordPage>
    ),
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordPage></ResetPasswordPage>,
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
    path: "/order-success/:id",
    element: (
      <SuccessPage></SuccessPage>
    ),
  },
  {
    path: "/checkout",
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
