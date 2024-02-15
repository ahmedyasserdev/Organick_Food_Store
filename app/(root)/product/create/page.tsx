import ProductForm from "@/components/shared/ProductForm"
import { getUser } from "@/lib/actions/user.actions"
import {  currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const CreateProduct = async () => {
    const user =  await currentUser()
    if (!user) redirect('/')
    const userInfo = await getUser(user?.id)
    const userId = userInfo?._id
  return (
   <>
     <section className="bg-light bg-dotted-pattern bg-cover bg-center py-5 md:py-10" >
         <h3 className="container  text-primary h3-bold text-center sm:text-left">Create Product</h3>
     </section>

        <div className="container my-8">
        <ProductForm userId={userId ?  userId : undefined} type="Create" />
        </div>


   </>
  )
}

export default CreateProduct