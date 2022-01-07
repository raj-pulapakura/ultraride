import { useCartItemProducts } from "../hooks/useCartItemProducts";

export const convertCartItemProductsToLineItems = (
  cartItemProducts: ReturnType<typeof useCartItemProducts>
) => {
  return cartItemProducts.map((cartItem) => ({
    name: cartItem?.product?.name,
    description: cartItem?.product?.description,
    images: [cartItem?.product?.imageUrl],
    amount: (cartItem?.product?.price || 1) * 100, // convert dollars to cents,
    currency: "usd",
    quantity: cartItem?.quantity,
  }));
};
