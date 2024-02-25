import { Document, Schema, model, models } from "mongoose";

export interface IReview extends Document {
  _id: string;
  text: string;
  creator: { _id: string; firstName: string; lastName: string };
  createdAt: Date; // Added createdAt field
}

const ReviewSchema = new Schema({
  text: { type: String, required: true },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now } // Added createdAt field definition
});

const Review = models.Review || model("Review", ReviewSchema);

export default Review;
