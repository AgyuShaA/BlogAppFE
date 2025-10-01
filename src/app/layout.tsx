import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import "./globals.css";

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
        <Footer />
      </body>
    </html>
  );
}
