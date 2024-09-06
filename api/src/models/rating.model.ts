// src/models/rating.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IRating } from '../Interfaces/rating.interface';

export interface IRatingModel extends IRating, Document {}

const RatingSchema: Schema = new Schema({
  rating: { type: Number, required: true },
  quality: { type: String, required: true },
  quantity: { type: String, required: true },
  image: { type: String },
}, {
  timestamps: true,
});

export default mongoose.model<IRatingModel>('Rating', RatingSchema);