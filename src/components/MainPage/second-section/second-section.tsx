import Image from "next/image";

const SecondSection = () => {
  const collections = [
    { title: "Shine & Glossy", color: "#581010", img: "1.png" },
    { title: "Classic Marbles", color: "#282828", img: "2.png" },
    { title: "Stones & Mixes", color: "#282828", img: "3.png" },
    { title: "Other", color: "#581010", img: "4.png" },
    { title: "Wood Tiles", color: "#282828", img: "5.png" },
    { title: "Modern Patterns", color: "#282828", img: "8.png" },
  ];

  return (
    <section className="mx-auto py-12 px-[2%]">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[32px] leading-[35px] font-normal text-[#282828]">
          Our Collections
        </h2>

        <a
          href="#"
          className="flex items-center text-[16px] leading-[26px] text-[#282828] gap-2"
        >
          <span className="inline-block w-4 h-4 rounded-sm " />
          Our Catalogue
        </a>
      </div>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {collections.map((item, idx) => (
          <div key={idx} className="border-2 border-[#DDDDDD]  overflow-hidden">
            <div className={` h-[180px] md:h-[145px] relative `}>
              {/* PC image */}
              <div className="hidden md:block h-full w-full relative">
                <Image
                  src={`/main-page/collection-photos/pc/${item.img}`}
                  alt={item.title}
                  width={145}
                  height={145}
                  quality={100}
                  className="object-cover h-full w-full"
                />
              </div>
              {/* Mobile image */}
              <div className="block md:hidden h-full w-full relative">
                <Image
                  src={`/main-page/collection-photos/mob/${item.img}`}
                  alt={item.title}
                  width={145}
                  height={145}
                  quality={100}
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
            <p
              className="text-center text-[16px] py-3"
              style={{ color: item.color, lineHeight: "26px" }}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SecondSection;
