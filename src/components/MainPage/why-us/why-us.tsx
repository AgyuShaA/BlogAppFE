import { Car } from "@/assets/icons/car";
import { ClockIcon } from "@/assets/icons/clock";
import { DirectIcon } from "@/assets/icons/direct";
import { SafeIcon } from "@/assets/icons/safe";

const WhyUs = () => {
  const cards = [
    {
      icon: <SafeIcon />,
      title: "Quality",
      description:
        "European‑standard tiles, strict QC, and trusted manufacturers.",
    },
    {
      icon: <Car />,
      title: "Logistics",
      description:
        "Nationwide delivery, pallet‑wise shipping, flexible pickup options.",
    },
    {
      icon: <DirectIcon />,
      title: "Prices",
      description:
        "Direct‑from‑supplier terms, volume discounts, transparent quotes.",
    },
    {
      icon: <ClockIcon />,
      title: "Fast deliveries",
      description: "Many items in stock. Same‑week dispatch on most orders.",
    },
  ];

  return (
    <section className="w-full px-5 md:px-10 py-16">
      <h2 className="text-3xl font-normal text-[#282828] mb-12">
        Why work with us
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:min-h-[340px] ">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white border-2 rounded-sm justify-center border-[#DDDDDD]  p-6 flex flex-col items-center text-center"
          >
            <span className="mb-4">{card.icon}</span>
            <h3 className="font-bold text-lg mb-2">{card.title}</h3>
            <p className="text-sm text-[#000] max-w-[11rem] text-center leading-7">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
