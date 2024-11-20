import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    comment: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

const review = mongoose.model('Review', reviewSchema);

export default review;