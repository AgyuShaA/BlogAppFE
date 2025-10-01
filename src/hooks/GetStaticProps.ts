import fs from "fs";
import path from "path";

export async function getStaticProps() {
  const galleryRoot = path.join(
    process.cwd(),
    "src/assets/mainpage/gallerysection"
  );

  const categories = fs.readdirSync(galleryRoot); // ['interiors', 'exteriors', ...]

  const galleryImagesData: Record<string, { src: string; title: string }[]> =
    {};

  categories.forEach((category) => {
    const categoryPath = path.join(galleryRoot, category);
    const files = fs
      .readdirSync(categoryPath)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
    galleryImagesData[category] = files.map((file, index) => ({
      src: `/gallery/${category}/${file}`,
      title: `${category} ${index + 1}`,
    }));
  });

  return { props: { galleryImagesData } };
}
