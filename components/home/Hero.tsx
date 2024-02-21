import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className=" py-5   lg:h-[950px]">
      <div className=" lg:bg-hero_image bg-cover  bg-center  w-full h-full  ">
        <div className="flex-center lg:items-start w-full lg:bg-hero_bg h-full bg-cover bg-no-repeat bg-center text-center md:text-start flex-col gap-3 lg:pl-5 lg:max-w-xl bg-white">
          <p className="p-bold-20 text-dark-green italic">100% Natural Food</p>
          <h1 className="h1-bold text-primary max-w-xl">
            Choose the best healthier way of life
          </h1>

       <Link href="/shop"  className="mt-2" >
         <Button className="p-medium-18  h-[55px] rounded-2xl capitalize " variant="secondary" >
           Explore more
           <ArrowRight className="text-primary ml-2" />
         </Button>
       </Link>

        </div>
      </div>
    </section>
  );
};

export default Hero;
