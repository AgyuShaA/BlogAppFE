import { getTranslations } from "next-intl/server";

const AboutSection = async () => {
  const t = await getTranslations("About");

  const sections = [
    t("section1"),
    t("section2"),
    t("section3"),
    t("section4"),
    t("section5"),
    t("section6"),
  ];

  return (
    <main className=" mx-auto px-6 py-12 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
      <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 leading-relaxed">
        {sections.map((text, i) => (
          <li key={i}>{text}</li>
        ))}
      </ul>
    </main>
  );
};

export default AboutSection;
