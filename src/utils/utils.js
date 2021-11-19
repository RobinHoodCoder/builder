export const getTotalQuantity = (products) => {
  return products.reduce((total, item) => item.quantity + total, 0);
};
