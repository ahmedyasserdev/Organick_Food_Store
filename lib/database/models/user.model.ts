import { Schema, model  , models} from "mongoose";

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
           
        },
        quantity: { type: Number, required: true, default: 1 },
   
    } ,
],

sellingProducts : [
       { 
            type: Schema.Types.ObjectId,
            ref: 'Product', 
        },

]

});

const User = models.User || model('User', UserSchema);

export default User;
