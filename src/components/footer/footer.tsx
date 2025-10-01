import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // choose the weights you need
});

import { FacebookIcon } from "@/assets/icons/fb-icon";
import { InstagramIcon } from "@/assets/icons/instagram-icon";
import { PinterestIcon } from "@/assets/icons/pinterest-icon";

import { FooterIcon } from "@/assets/icons/footer-icon";

const Footer = () => {
  return (
    <footer
      className={`${dmSans.className} bg-[#212C35] text-white pt-16 pb-8 px-5 md:px-16`}
    >
      {/* Top Section */}
      <div className="flex flex-col justify-between items-center gap-8 md:gap-16 mb-12">
        {/* Logo & Title */}
        <div
          className="flex flex-col md:flex-row  justify-start w-full items-start sm:justify-center sm:items-start gap-8 sm:gap-4  border-b border-[#AE2526]
pb-4"
        >
          <FooterIcon />
          <h2 className="text-2xl hidden md:block md:text-3xl font-bold uppercase">
            Your professional building partner
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
        <div className="flex flex-wrap  justify-between items-center gap-y-8 w-full md:px-[5%] px-[2%]">
          {/* Collections */}
          <div className="w-1/2 sm:w-auto">
            <h3 className="font-thin text-xl mb-4">Collections</h3>
            <ul className="space-y-2 text-sm">
              <li>Shine & Glossy</li>
              <li>Classic Marbles</li>
              <li>Stones & Mixes</li>
              <li>Urban Style</li>
              <li>Wood Tiles</li>
            </ul>
          </div>

          {/* Information */}
          <div className="w-1/2 sm:w-auto">
            <h3 className="font-thin text-xl mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>Shine & Glossy</li>
              <li>Classic Marbles</li>
              <li>Stones & Mixes</li>
              <li>Urban Style</li>
              <li>Wood Tiles</li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="w-1/2 sm:w-auto">
            <h3 className="font-thin text-xl mb-4">Contacts</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col mb-10">
                <span>Phone</span>
                <span>0000 - 0000 - 00</span>
              </li>
              <li className="flex flex-col ">
                <span>Email</span>
                <span>office@xyz.com</span>
              </li>
            </ul>
          </div>

          {/* Open Hours */}
          <div className="w-1/2 sm:w-auto">
            <h3 className="font-thin text-xl mb-4">Open Hours</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col mb-10">
                <span>Monday - Friday</span>
                <span>9:00 - 18:00</span>
              </li>
              <li className="flex flex-col ">
                <span>Saturday - Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      {/* <div className="border-t border-[#DDDDDD] pt-4 text-center text-sm">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div> */}
    </footer>
  );
};

export default Footer;
