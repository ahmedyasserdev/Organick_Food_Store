import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { quality } from "@/constants";

const Testimonials = () => {
  return (
    <section className=" py-8 md:py-12  bg-testimonials   bg-no-repeat  bg-contain md:bg-cover min-h-[100px] md:min-h-[600px] w-full bg-center">
      <div className="container flex-between flex-col gap-10">
        <div className="flex-center flex-col gap-5 md:gap-8 py-5">
          <div className="flex-center flex-col gap-1">
            <p className="text-dark-green italic p-regular-24">Testimonial</p>
            <h1 className="  h2-bold md:h1-bold text-primary">
              What Our Customer Saying?
            </h1>
          </div>

          <div className="flex-center flex-col gap-4">
            <Avatar className="w-[100px] h-[100px]">
              <AvatarImage src="/person-1.svg" />
              <AvatarFallback>Sara Taylor</AvatarFallback>
            </Avatar>

            <p className="p-regular-18 text-dark-gray max-w-xl text-center mx-auto">
              Simply dummy text of the printing and typesetting industry. Lorem
              Ipsum simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been.
            </p>

            <div className="flex-center gap-2 flex-col ">
              <h6 className="p-bold-20 text-primary">Sara Taylor</h6>

              <p className="p-regular-14 text-dark-gray">Consumer</p>
            </div>
          </div>
        </div>

        <div className="flex-center md:flex-between max-md:flex-wrap gap-5">
          {quality.map(({ title, value }) => (
            <article
              key={value}
              className="w-fit h-fit p-3 md:p-5 flex flex-col gap-1 text-center rounded-full border-[3px] border-dark-green"
            >
              <h5 className="p-bold-24 md:h2-bold text-primary">{value}</h5>
              <p className="p-medium-16 md:p-medium-20 text-primary">{title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
