// src/controllers/rating.controller.ts
import { Request, Response } from 'express';
import Rating from '../models/rating.model';

export const addRating = async (req: Request, res: Response) => {
  try {
    const { rating, quality, quantity } = req.body;
    const image = req.file ? req.file.path : undefined;

    const newRating = new Rating({
      rating,
      quality,
      quantity,
      image,
    });

    await newRating.save();
    res.status(200).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit rating', error });
  }
};