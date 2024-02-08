'use server'
import User from '../database/models/user.model';
import { handleError } from '../utils';
import { connectToDatabase } from './../database/mongoose';
import { revalidatePath } from 'next/cache';
export const createOrUpdateUser = async (
  id : string ,
  first_name : string ,
  last_name : string ,
  image_url : string ,
  email_addresses : any ,
  username : string | null  ,
) => {
  try {
    await connectToDatabase();

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
        photo: image_url,
          email: email_addresses[0].email_address,
          username: username,
        },
      },
      { upsert: true, new: true } 
    );

    await user.save();
    return user;
  } catch (error : any ) {
    handleError(error)
  }
};

export async function deleteUser(clerkId: string | undefined ) {
    try {
      await connectToDatabase()
  
      // Find user to delete
      const userToDelete = await User.findOne({ clerkId })
  
      if (!userToDelete) {
        throw new Error('User not found')
      }
      const deletedUser = await User.findByIdAndDelete(userToDelete._id)
      revalidatePath('/')
  
      return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
    } catch (error) {
      handleError(error)
    }
  }



  export const getUser = async (id : string | undefined ) => {
    try {
        await connectToDatabase()
        const user = User.findOne({ clerkId :  id})
        return user
    } catch (error : any ) {
        handleError(error)
    }
  }