import * as z from 'zod'
export const prodcutFormSchema = z.object({
    title: z.string().min(2, {
      message: "title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "title must be at least 2 characters.",
    }).max(400 , {message : "description must be less than 400 characters."}),
    price: z.string(),
    categoryId : z.string(),
    image : z.string(),
    discount  : z.string()
  })


  export const reviewFormSchema = z.object({
    reviewText: z.string().min(2, {
    message: "Review must be at least 2 characters.",
  }),
})
 