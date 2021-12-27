import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/core/Layout";
import { CartPage } from "./pages/Cart";
import { HomePage } from "./pages/Home";
import { ProductDetailPage } from "./pages/ProductDetail";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
