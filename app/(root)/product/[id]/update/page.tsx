import ProductForm from "@/components/shared/ProductForm"
import { getUser } from "@/lib/actions/user.actions"
import { getProductById } from "@/lib/actions/product.actions"
import {  currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const CreateProduct = async ({params : {id} } : {params : {id : string}}) => {
    const user =  await currentUser()
    if (!user) redirect('/')
    const userInfo = await getUser(user?.id)
    const userId = userInfo?._id
    const product = await getProductById(id)
  return (
   <>
     <section className="bg-light bg-dotted-pattern bg-cover bg-center py-5 md:py-10" >
         <h3 className="container h3-bold text-center sm:text-left">Update Product</h3>
     </section>

        <div className="container my-8">
        <ProductForm product = {product}   userId={userId ?  userId : undefined} type="Update" />
        </div>


   </>
  )
}

export default CreateProduct