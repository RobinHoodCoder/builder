export const getTotalQuantity = (products) => {
  if (!products) {
    return 0;
  }
  return products.reduce((total, item) => item.quantity + total, 0);
};
