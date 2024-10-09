import { Request, Response } from 'express';
import { productsArray, pricingArray } from '../data/sampledata';

export const getProductsWithPricing = (req: Request, res: Response) => {
  const pricingMap: { [sku: string]: number } = pricingArray.reduce((acc: { [sku: string]: number }, { sku, price }) => {
    acc[sku] = price;
    return acc;
  }, {});

  const result = productsArray.map(product => ({
    ...product,
    price: pricingMap[product.sku] 
  }));

  res.json(result); 
};
