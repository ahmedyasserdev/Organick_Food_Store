import { Document, Schema, model, models } from "mongoose";

export interface IReview extends Document {
  _id: string;
  text: string;
  creator : { _id: string, firstName: string, lastName: string };
}

const ReviewSchema = new Schema({
  text: { type: String, required: true  },
  creator : {
    type: Schema.Types.ObjectId,
    ref  :"User",
  }
})

const Review = models.Review || model('Review', ReviewSchema);

export default Review;