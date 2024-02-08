import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String, required: true },
    cart: [
        {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product', 
            required: true
        },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
    }
]
});

const User = model('User', UserSchema);

export default User;
