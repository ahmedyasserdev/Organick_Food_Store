'use server'

import Category from "../database/models/category.model"
import { connectToDatabase } from "../database/mongoose"
import { handleError } from "../utils"


export const createNewCategory= async ({categoryName}  : {categoryName :  string}) => {
    try {
            await connectToDatabase()

            const newCategory = await Category.create({
                name : categoryName
            })


            return JSON.parse(JSON.stringify(newCategory))

    } catch (error : any) {
            handleError(error)
    }
}



export const getAllCategories = async () => {
    try {
      await connectToDatabase();
  
      const categories = await Category.find();
      return JSON.parse(JSON.stringify(categories))
    } catch (error: any) {
      handleError(error);
    }
  };
  