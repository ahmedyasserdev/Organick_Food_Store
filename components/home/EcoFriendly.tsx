import { ecoFriendly } from "@/constants";

const EcoFriendly = () => {
  return (
    <section className="  flex-center relative  mt-24 md:mt-32  bg-green_land bg-cover bg-no-repeat bg-left  w-full h-[700px]">
      <div className="container">
          <div className="flex flex-col text-start gap-4    bg-light/70 md:bg-light/60 shadow-xl p-5 rounded-2xl">
        
        
            <div className="flex text-start flex-col gap-1">
              <p className="text-dark-green italic  p-regular-18 md:p-regular-24">
                Eco Friendly
              </p>
              <h1 className="  p-bold-24 md:h1-bold text-primary">
                Econis is a Friendly <br/> Organic Store
              </h1>
            </div>

                {
                    ecoFriendly.map(({title , description}) => (
                        <div key={title} className="flex flex-col gap-2 text-start">
                            <h5 className=" p-bold-20  text-primary">{title}</h5>
                            <p className=" p-meduim-14 md:p-meduim-18 text-dark-gray max-w-xl">{description}</p>
                        </div>
                    ) )
                }



          </div>
        </div>
    </section>
  );
};

export default EcoFriendly;
