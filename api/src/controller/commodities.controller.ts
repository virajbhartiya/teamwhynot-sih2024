import { catchAsync } from "../utils/utils";
import { data } from "../data/commodities";
import { Request, Response } from "express";

export const getCommoditiePrice = catchAsync(
  async (req: Request, res: Response) => {
    const { commodity } = req.params;
    const commodities =
      data.Envelope.Body.showResponse.showResult.diffgram.NewDataSet.Table.filter(
        (item) => item.Commodity === commodity
      );

    const averagePrice =
      commodities.reduce(
        (sum, item) => sum + parseFloat(item.Modal_x0020_Price),
        0
      ) / commodities.length;

    res.json({ commodity, averagePrice });
  }
);
