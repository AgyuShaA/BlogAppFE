import { Breadcrumbs } from "@/components/bread-scrums/bread-scrums";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Dimora Shop",
};

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-[5%] w-full md:px-[2%] py-10 space-y-10">
      <Breadcrumbs />

      <h1 className="text-3xl md:text-5xl font-semibold">Contact Us</h1>

      <p className="text-lg leading-relaxed">
        Have questions about our tiles, delivery, or returns? Feel free to reach
        out — we are always happy to help.
      </p>

      <section className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Details</h2>

          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:info@dimora.shop"
              className="text-blue-600 hover:underline"
            >
              info@dimora.shop
            </a>
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+123456789" className="text-blue-600 hover:underline">
              +1 234 567 89
            </a>
          </p>

          <p>
            <strong>Address:</strong>
            Example Street 12, Amsterdam, Netherlands
          </p>

          <p>
            <strong>Working Hours:</strong>
            Mon–Fri: 9:00 – 18:00
            <br />
            Sat: 10:00 – 16:00
          </p>
        </div>
      </section>
      {/* Contact Form */}

      <section>
        <iframe
          className="w-full h-72 rounded-lg border"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.801467943813!2d4.8951683!3d52.3702157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c016de9e3f%3A0xe3d7cba9b09d5d8!2sAmsterdam!5e0!3m2!1sen!2snl!4v1234567890"
          loading="lazy"
        />
      </section>
    </main>
  );
}
