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
      iconPrimary: <LocalOffer color="primary" />,
      iconWhite: <LocalOffer sx={{ color: "white" }} />,
    },
    {
      text: "Cart",
      to: "/cart",
      iconPrimary: <ShoppingCart color="primary" />,
      iconWhite: <ShoppingCart sx={{ color: "white" }} />,
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
            iconPrimary: <Logout color="primary" />,
            iconWhite: <Logout sx={{ color: "white" }} />,
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
            iconPrimary: <AccountCircle color="primary" />,
            iconWhite: <AccountCircle sx={{ color: "white" }} />,
          },
          {
            text: "Sign in",
            to: "/login",
            iconPrimary: <Login color="primary" />,
            iconWhite: <Login sx={{ color: "white" }} />,
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
