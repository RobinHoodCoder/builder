export const getTotalQuantity = (products) => {
  if (!products?.length) {
    return 0;
  }
  return products.reduce((total, item) => item.quantity + total, 0);
};
