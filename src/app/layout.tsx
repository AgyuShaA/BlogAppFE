import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = "en";

  return (
    <html>
      <body>
        {" "}
        <Header locale={locale} />
        {children}
        <ToastContainer position="top-right" theme="black" />
        <Footer />
      </body>
    </html>
  );
}
