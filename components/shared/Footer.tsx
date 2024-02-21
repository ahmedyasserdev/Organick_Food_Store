import { Button } from "../ui/button"

const Footer = () => {
  return (
    <>
  <section className="py-8" >
    <div className="container bg-news bg-cover bg-center bg-no-repeat rounded-3xl h-[250px] flex-between px-4">
        <h4 className="h3-bold text-light  pl-6">Subscribe to <br/>
  our Newsletter</h4>
  
  
        <div className="flex items-center gap-2">
          <input  type='email' placeholder="Email Adress" className=" shadow-md  hover:shadow-sm h-[54px] focus-visible:ring-offset-0 placeholder:text-dark-gray  p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent  focus:outline-none transition-all  duration-150 rounded-xl" />
          <Button type="submit" size={"lg"} className="h-[50px]" >Send</Button>
        </div>
  

    </div>
  </section>


    </>
  )
}

export default Footer