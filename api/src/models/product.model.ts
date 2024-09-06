import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IProduct } from "../Interfaces/product.interface";

const ProductSchema: Schema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    ratings: {
      type: [Number],
      default: [],
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    expiryDate: {
      type: Date,
      required: true,
    },
    dateProduced: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
