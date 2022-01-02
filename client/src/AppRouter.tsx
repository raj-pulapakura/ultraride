import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/core/Layout";
import { LogicBoard } from "./components/core/LogicBoard";
import { Route404 } from "./components/core/Route404";
import { graphqlClient } from "./graphql/client";
import { useMeQuery } from "./graphql/generated";
import { AccountPage } from "./pages/Account";
import { AllProductsPage } from "./pages/AllProducts";
import { CartPage } from "./pages/Cart";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { ProductDetailPage } from "./pages/ProductDetail";
import { RegisterPage } from "./pages/Register";

export function AppRouter() {
  const { data: meData } = useMeQuery(
    graphqlClient,
    {},
    { refetchInterval: 1000 }
  );

  return (
    <BrowserRouter>
      <LogicBoard>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountPage />} />

            {meData?.me?.account ? (
              <></>
            ) : (
              <>
                <Route path="/account/register" element={<RegisterPage />} />
                <Route path="/account/sign-in" element={<LoginPage />} />
              </>
            )}

            <Route path="*" element={<Route404 />} />
          </Routes>
        </Layout>
      </LogicBoard>
    </BrowserRouter>
  );
}
