import { DM_Sans } from "next/font/google";
import { FacebookIcon } from "@/assets/icons/fb-icon";
import { InstagramIcon } from "@/assets/icons/instagram-icon";
import { PinterestIcon } from "@/assets/icons/pinterest-icon";
import { FooterIcon } from "@/assets/icons/footer-icon";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Footer = async () => {
  const t = await getTranslations("footer");

  const collections = t.raw("collections.items") as {
    key: string;
    label: string;
    href: string;
  }[];

  const information = t.raw("information.items") as {
    key: string;
    label: string;
    href: string;
  }[];

  return (
    <footer
      className={`${dmSans.className} relative bg-[#212C35] text-white  pt-16 pb-8 px-5 md:px-16`}
    >
      <div className="absolute inset-0 -left-1/2 -z-10 w-[200vw] bg-gradient-to-b! from-[#212C35]! via-[#212C35]! to-[#212C35]!" />

      {/* Top Section */}
      <div className="flex flex-col justify-between items-center gap-8 md:gap-16 mb-12">
        {/* Logo & Title */}
        <div className="flex flex-col md:flex-row md:justify-between justify-start w-full items-start sm:justify-center sm:items-start gap-8 sm:gap-4 border-b border-[#AE2526] pb-4">
          <FooterIcon />
          <h2 className="text-2xl text-white hidden lg:block md:text-3xl font-bold uppercase">
            {t("slogan")}
          </h2>

          {/* Social Icons */}
          <div className="flex items-center h-full justify-center gap-4">
            <Link
              href="/"
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-[#282828]"
            >
              <InstagramIcon />
            </Link>
            <Link
              href="/"
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-[#282828]"
            >
              <FacebookIcon />
            </Link>
            <Link
              href="/"
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-[#282828]"
            >
              <PinterestIcon />
            </Link>
          </div>
        </div>

        {/* Columns */}
        <div className="flex flex-wrap justify-between items-center gap-y-8 w-full md:px-[5%] px-[2%]">
          {/* Collections */}
          <div className="w-1/2 sm:w-auto">
            <h3 className="font-thin text-xl mb-4">{t("collections.title")}</h3>
            <ul className="space-y-2 text-sm">
              {collections.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className=" transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div className="w-1/2 sm:w-auto">
            <h3 className="font-thin text-xl mb-4">{t("information.title")}</h3>
            <ul className="space-y-2 text-sm ">
              {information.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className=" transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="w-1/2 sm:w-auto">
            <h3 className="font-thin text-xl mb-4">{t("contacts.title")}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col mb-10">
                <span>{t("contacts.phone")}</span>
                <span>{t("contacts.number")}</span>
              </li>
              <li className="flex flex-col">
                <span>{t("contacts.email")}</span>
                <span>{t("contacts.emailAddress")}</span>
              </li>
            </ul>
          </div>

          {/* Open Hours */}
          <div className="w-1/2 sm:w-auto">
            <h3 className="font-thin text-xl mb-4">{t("hours.title")}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col mb-10">
                <span>{t("hours.weekdays")}</span>
                <span>{t("hours.hours")}</span>
              </li>
              <li className="flex flex-col">
                <span>{t("hours.weekend")}</span>
                <span>{t("hours.closed")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
