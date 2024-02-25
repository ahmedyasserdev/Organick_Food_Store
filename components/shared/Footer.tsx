import Image from "next/image";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { footer_socials } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const Footer = () => {
  return (
    <>
      <section className="py-8 hidden lg:block">
        <div className="w-[95%] mx-auto bg-news bg-cover bg-center bg-no-repeat rounded-3xl h-[250px]   flex-between flex-col md:flex-row px-3 md:px-4">
          <h4 className=" p-bold-20 md:h3-bold text-light  pl-6">
            Subscribe to <br />
            our Newsletter
          </h4>

          <div className="flex items-center gap-2 flex-wrap ">
            <input
              type="email"
              placeholder="Email Adress"
              className=" shadow-md  hover:shadow-sm h-[54px] focus-visible:ring-offset-0 placeholder:text-dark-gray  p-regular-16 px-4 py-3 border-none focus-visible:ring-transparent  focus:outline-none transition-all  duration-150 rounded-xl"
            />
            <Button type="submit" size={"lg"} className="h-[50px]">
              Send
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="flex flex-col gap-4">
            <Logo isFooter={true} />

            <p className=" max-w-lg p-medium-18 text-dark-gray">
              Simply dummy text of the printing and typesetting industry. Lorem
              Ipsum simply dummy text of the printing
            </p>

            <div className="flex items-center gap-2">
              {footer_socials.map((social) => (
                <img
                  key={social.icon}
                  className="object-contain"
                  src={social.icon}
                  alt={social.title}
                  width={75}
                  height={75}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-dark-gray w-full ">
        <div className="flex-center pt-3 pb-2">
          <p className=" text-dark-green p-medium-24">
            Developed By {"  "}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://github.com/ahmedyasserdev"
                    className="  text-primary font-bold underline  "
                  >
                    {" "}
                    Ahmed Yasser{" "}
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Github Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>
        </div>
      </section>
    </>
  );
};

export default Footer;
