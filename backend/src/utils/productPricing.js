const toMoney = (value) => Number(Number(value || 0).toFixed(2));

const clampDiscount = (value) => {
  const numeric = Number.isFinite(Number(value)) ? Number(value) : 0;
  return Math.max(0, Math.min(100, Math.round(numeric)));
};

const calculateDiscountedPrice = (basePrice, discountPercentage) => {
  const price = Number(basePrice || 0);
  const discount = clampDiscount(discountPercentage);
  const discounted = price - (price * discount) / 100;
  return toMoney(discounted);
};

const inferDiscountFromPrices = (currentPrice, originalPrice) => {
  if (!originalPrice || Number(originalPrice) <= Number(currentPrice)) {
    return 0;
  }

  return clampDiscount(((originalPrice - currentPrice) / originalPrice) * 100);
};

const buildPricingFields = (
  { price, basePrice, compareAtPrice, discountPercentage },
  existingProduct = null
) => {
  const originalPriceCandidate =
    basePrice ??
    (compareAtPrice && Number(compareAtPrice) > Number(price || 0) ? compareAtPrice : undefined) ??
    existingProduct?.basePrice ??
    price ??
    existingProduct?.price ??
    0;

  const safeBasePrice = toMoney(originalPriceCandidate);

  const safeDiscount = clampDiscount(
    discountPercentage ??
      (compareAtPrice ? inferDiscountFromPrices(price, compareAtPrice) : undefined) ??
      existingProduct?.discountPercentage ??
      0
  );

  const discountedPrice = calculateDiscountedPrice(safeBasePrice, safeDiscount);

  return {
    basePrice: safeBasePrice,
    discountPercentage: safeDiscount,
    price: discountedPrice,
    compareAtPrice: safeDiscount > 0 ? safeBasePrice : null
  };
};

module.exports = {
  clampDiscount,
  calculateDiscountedPrice,
  buildPricingFields
};
