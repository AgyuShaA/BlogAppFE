import Image from "next/image";

const FirstSection = () => {
  return (
    <section className="relative w-full px-[5%] md:px-[2%] ">
      {/* Heading */}
      <h1 className="text-[20px] text-[#282828] font-normal leading-[29px] mb-4">
        Get a look at our new collections
      </h1>

      {/* Background image with gradient */}
      <div className="relative w-full rounded-[4px]  overflow-hidden">
        <Image
          src="/main-page/1.png"
          alt="Background"
          width={1280}
          height={600}
          className="object-contain hidden md:block"
        />

        <Image
          src="/main-page/1.png"
          alt="Background"
          width={1280}
          height={600}
          className="object-cover md:hidden block w-full h-[400px]"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black rounded-b-[4px]" />

        {/* Content over background */}
        <div className="absolute bottom-4 md:bottom-6 border-l-amber-200 md:left-8 left-4 right-4 flex flex-col md:flex-row items-start md:items-center justify-between md:gap-12 gap-4">
          {/* Text block */}
          <div className="flex flex-col text-white border-l-4  border-[#CB2021] pl-4">
            <h2 className=" text-lg md:text-lg leading-[22px] font-normal md:font-thin mb-2">
              Pro Bouw Store -
            </h2>
            <p className="text-lg font-bold max-w-[14rem] sm:max-w-[100rem] md:font-normal md:text-2xl leading-[46px] ">
              Your professional building partner
            </p>
          </div>

          {/* CTA Button */}

          <button className="flex items-center  justify-center bg-[#CB2021] text-white h-[42px] rounded-[4px]  md:px-6 px-4">
            {/* optional icon */}
            <span className="md:text-md text-sm leading-[26px]">
              Request a Quote
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
