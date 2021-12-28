import {
  LocalOffer,
  ShoppingCart,
  Logout,
  AccountCircle,
  Login,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/core/Layout";
import { graphqlClient } from "./graphql/client";
import { useGetMeQuery } from "./graphql/generated";
import { CartPage } from "./pages/Cart";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { LogoutPage } from "./pages/Logout";
import { ProductDetailPage } from "./pages/ProductDetail";
import { RegisterPage } from "./pages/Register";
import { setMenuLinks } from "./store/menu/menuActions";
import { MenuLink } from "./store/menu/menuTypes";

export function AppRouter() {
  const { data: meData } = useGetMeQuery(
    graphqlClient,
    {},
    { refetchInterval: 1000 }
  );

  const dispatch = useDispatch();

  const sharedMenuLinks: Array<MenuLink> = [
    {
      text: "Shop",
      to: "/",
      icon: <LocalOffer color="primary" />,
    },
    {
      text: "Cart",
      to: "/cart",
      icon: <ShoppingCart color="primary" />,
    },
  ];

  useEffect(() => {
    if (meData?.getMe?.account) {
      dispatch(
        setMenuLinks([
          ...sharedMenuLinks,
          {
            text: "Logout",
            to: "/logout",
            icon: <Logout color="primary" />,
          },
        ])
      );
    } else {
      dispatch(
        setMenuLinks([
          ...sharedMenuLinks,
          {
            text: "Sign up",
            to: "/register",
            icon: <AccountCircle color="primary" />,
          },
          {
            text: "Sign in",
            to: "/login",
            icon: <Login color="primary" />,
          },
        ])
      );
    }
  }, [meData?.getMe?.account]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />

          {meData?.getMe?.account ? (
            <>
              <Route path="/logout" element={<LogoutPage />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </>
          )}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
