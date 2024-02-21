import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const AboutHero = () => {
  return (
    <section>
      <div className="container  overflow-visible flex-start md:flex-center gap-5 max-md:bg-vegetables bg-cover  max-md:h-[850px] max-md:w-[800px] bg-no-repeat">
        <div className="w-1/2 hidden md:block">
          <Image
            src={"/vegetables.svg"}
            alt={"vegetables"}
            width={1000}
            height={1000}
          />
        </div>

        <div className="   self-start flex gap-4 flex-col  h-full layout">
          <div className="flex flex-col gap-2">
            <p className="text-dark-green italic p-regular-24">About Us</p>
            <h2 className=" h2-bold text-primary">
            We do Creative <br />
Things for Success
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-dark-gray leading-[1.6] max-w-xs  p-regular-24 md:max-w-md">
              Simply dummy text of the printing and typesetting industry. Lorem
              had ceased to be the industry&apos;s standard dummy text ever
              since the 1500s, when an unknown printer took a galley.
            </p>
            <p className="text-dark-gray leading-[1.6] max-w-xs  p-regular-24 md:max-w-md">
              Simply dummy text of the printing and typesetting industry. Lorem
              had ceased to be the industry&apos;s standard dummy text ever
              since the 1500s, when an unknown printer took a galley.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 items-start">
            <div className="flex gap-3 items-center">
              <Image
                src={"/tractor.svg"}
                width={50}
                height={50}
                alt={"tractor"}
              />
              <p className="p-medium-20 text-primary">
                Modern Agriculture Equipment
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <Image
                src={"/chemical-plant.svg"}
                width={50}
                height={50}
                alt={"chemical-plant"}
              />
              <p className="p-medium-20 text-primary">
                No growth hormones are used
              </p>
            </div>
          </div>


        <Link href='/shop' >
            <Button size={'lg'} className="flex gap-2 items-center   md:h-[70px] rounded-2xl"  >
              <p className="p-bold-20 text-white" >Explore More</p>
                <div  className="rounded-full text-primary p-1  bg-white">
                <MoveRight className="w-8" /> 
                </div>
               </Button>
        </Link>




        </div>
      </div>
    </section>
  );
};

export default AboutHero;
