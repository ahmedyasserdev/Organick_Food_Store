import { features } from "@/constants";
import Image from "next/image";
import React from "react";

const WhyChooseUs = () => {
  return (
 <>
       <section className="py-5 md:py-20">
         <div className="container flex items-start  gap-10 ">
           <div className="flex flex-col gap-4 w-full md:w-1/2">
             <div className="flex flex-col gap-2">
               <p className="text-dark-green italic p-regular-24">
                 Why Choose us?
               </p>
               <h1 className=" h1-bold text-primary">
                 We do not buy from the <br /> open market & traders.
               </h1>
             </div>
    
             <div>
               <p className="text-dark-gray leading-[1.6]  p-regular-24 ">
                 Simply dummy text of the printing and typesetting industry. Lorem
                 had ceased to been the industry&apos;s standard the 1500s, when an
                 unknown
               </p>
             </div>
    
             <div className="flex flex-col gap-4 items-start ">
               <div className="bg-light-gray px-6 py-4 rounded-full flex items-center gap-2">
                 <Image src="/point.svg" alt="point" width={20} height={20} />
                 <h5 className="text-primary p-medium-20">100% Natural Product</h5>
               </div>
    
               <p className="p-regular-20 max-w-md text-dark-gray ">
                 Simply dummy text of the printing and typesetting industry Lorem
                 Ipsum
               </p>
             </div>
    
             <div className="flex flex-col gap-4 items-start ">
               <div className="bg-light-gray px-6 py-4 rounded-full flex items-center gap-2">
                 <Image src="/point.svg" alt="point" width={20} height={20} />
                 <h5 className="text-primary p-medium-20">Increases resistance</h5>
               </div>
    
               <p className="p-regular-20 max-w-md text-dark-gray ">
                 Filling, and temptingly healthy, our Biona Organic Granola with
                 Wild Berries is just the thing
               </p>
             </div>
           </div>
    
    
           <div className=" bg-why_choose_use bg-no-repeat bg-contain rounded-2xl w-1/2 hidden md:block md:h-[550px]  h-[700px] " /> 
    
    
         </div>
       </section>

        <section className="py-8 md:py-15" >
            <div className="container flex-center gap-5 max-md:flex-wrap">
                {
                    features.map((feature) => (
                        <div className=" bg-light text-center  p-5  rounded-2xl shadow-md flex-center flex-col gap-4" key={feature.icon} >

                                <Image src = {feature.icon} alt={feature.title} width={80} height={80}  />

                                <h5 className="p-bold-24 text-primary">{feature.title}</h5>

                                <p className="p-meduim-16 text-dark-gray">{feature.description}</p>


                        </div>
                    ) )
                }
            </div>
        </section>

 </>
  );
};

export default WhyChooseUs;
