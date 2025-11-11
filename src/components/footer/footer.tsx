import { DM_Sans } from "next/font/google";
import { FacebookIcon } from "@/assets/icons/fb-icon";
import { InstagramIcon } from "@/assets/icons/instagram-icon";
import { PinterestIcon } from "@/assets/icons/pinterest-icon";
import { FooterIcon } from "@/assets/icons/footer-icon";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Footer = async () => {
  // ✅ You must await getTranslations()
  const t = await getTranslations("footer");

  // ✅ Use t.raw() to access arrays or objects directly
  const collections = t.raw("collections.items") as string[];
  const information = t.raw("information.items") as {
    key: string;
    label: string;
    href: string;
  }[];

  return (
    <footer
      className={`${dmSans.className} bg-[#212C35] text-white pt-16 pb-8 px-5 md:px-16`}
    >
      {/* Top Section */}
      <div className="flex flex-col justify-between items-center gap-8 md:gap-16 mb-12">
        {/* Logo & Title */}
        <div className="flex flex-col md:flex-row md:justify-between justify-start w-full items-start sm:justify-center sm:items-start gap-8 sm:gap-4 border-b border-[#AE2526] pb-4">
          <FooterIcon />
          <h2 className="text-2xl hidden lg:block md:text-3xl font-bold uppercase">
            {t("slogan")}
          </h2>

          {/* Social Icons */}
          <div className="flex items-center h-full justify-center gap-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-[#282828]"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-[#282828]"
            >
              <FacebookIcon />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-[#282828]"
            >
              <PinterestIcon />
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="flex flex-wrap justify-between items-center gap-y-8 w-full md:px-[5%] px-[2%]">
          {/* Collections */}
          <div className="w-1/2 sm:w-auto">
            <h3 className="font-thin text-xl mb-4">{t("collections.title")}</h3>
            <ul className="space-y-2 text-sm">
              {collections.map((item, i) => (
                <li key={i}>{item}</li>
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
                    className="hover:text-gray-900 transition-colors duration-150"
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
