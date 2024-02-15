import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const AboutUs = () => {
  return (
    <section className="py-10">
      <div className="container  flex-start   md:flex-center gap-5 max-md:bg-fruits bg-light max-md:h-[850px] max-md:w-[800px]  bg-no-repeat">
        <div className="w-1/2 hidden md:block">
          <Image src={"/fruits.svg"} alt={"fruits"} width={500} height={600} />
        </div>

        <div className=" self-start flex gap-4 flex-col  ">
          <p className="text-dark-green italic p-regular-24">About Us</p>
          <h2 className=" h2-bold text-primary">
            We Believe in Working Accredited Farmers
          </h2>
          <p className="text-dark-gray leading-[1.6] max-w-xs  p-regular-24 md:max-w-md">
            Simply dummy text of the printing and typesetting industry. Lorem
            had ceased to be the industry&apos;s standard dummy text ever since
            the 1500s, when an unknown printer took a galley.
          </p>

          <div className="my-5 flex gap-4 flex-col items-start">
            <div className="flex items-start gap-3">
              <Image
                src={"/about-icon-1.svg"}
                alt="about icon 1"
                width={70}
                height={70}
              />
              <div className="flex flex-col gap-3">
                <h5 className="p-bold-24 text-primary">Organic Foods Only</h5>
                <p className="text-dark-gray  p-regular-18  max-w-lg">
                  Simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 mt-5">
              <Image
                src={"/about-icon-2.svg"}
                alt="about icon 2"
                width={50}
                height={50}
              />
              <div className="flex flex-col gap-3">
                <h5 className="p-bold-24 text-primary">Quality Standards</h5>
                <p className="text-dark-gray  p-regular-18  max-w-lg">
                  Simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum
                </p>
              </div>
            </div>
          </div>

          <Link href="/shop">
            <Button className="p-medium-20 h-[55px]  capitalize  rounded-xl">
              Explore more
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
