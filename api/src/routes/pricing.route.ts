import express from "express";
import { Request, Response } from "express";

const router = express.Router();

interface CropPriceParams {
  season: string;
  demand: number;
  supply: number;
  minResaleValue: number;
  maxResaleValue: number;
  modalResaleValue: number;
}

export function regulatedCropPrice({
  season,
  demand,
  supply,
  minResaleValue,
  maxResaleValue,
  modalResaleValue,
}: CropPriceParams): number {
  const supplyDemandRatio = supply / demand;

  const seasonMap: { [key: string]: number } = {
    winter: 0,
    spring: 1,
    summer: 2,
    autumn: 3,
  };
  const seasonValue = seasonMap[season.toLowerCase()] || 0;
  const seasonalFactor = 1 + 0.2 * Math.sin(2 * Math.PI * (seasonValue / 4));

  const priceRange = maxResaleValue - minResaleValue;
  const priceElasticity = priceRange / modalResaleValue;

  const basePrice =
    modalResaleValue * (1 + (seasonalFactor - 1) * priceElasticity);

  const supplyDemandFactor =
    Math.atan(Math.PI * (supplyDemandRatio - 1)) / Math.PI;
  const supplyDemandAdjustment = supplyDemandFactor * priceRange * 0.5;

  const adjustedPrice = basePrice - supplyDemandAdjustment;

  const pricePosition = (adjustedPrice - minResaleValue) / priceRange;
  const scaledPosition = Math.pow(pricePosition, 1.5);
  const regulatedPrice = minResaleValue + scaledPosition * priceRange;

  return regulatedPrice;
}

router.get("/regulated-crop-price", (req: Request, res: Response) => {
  try {
    const params: CropPriceParams = {
      season: "summer",
      demand: Number(req.query.demand),
      supply: Number(req.query.supply),
      minResaleValue: Number(req.query.minResaleValue),
      maxResaleValue: Number(req.query.maxResaleValue),
      modalResaleValue:
        Number(req.query.modalResaleValue) + Number(req.query.minResaleValue),
    };

    const price = regulatedCropPrice(params);
    res.json({ regulatedPrice: price.toFixed(2) });
  } catch (error) {
    res.status(400).json({ error: "Invalid input parameters" });
  }
});

export default router;
