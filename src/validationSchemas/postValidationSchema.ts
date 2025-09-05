import * as yup from "yup";

export const postValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  content: yup.string().required("Content is required"),
  image: yup
    .mixed<File>()
    .required("Image is required")
    .test("fileSize", "Image must be less than 5MB", (value) => {
      return value ? value.size <= 5 * 1024 * 1024 : false;
    })
    .test("fileType", "Only JPG, PNG, or GIF files are allowed", (value) => {
      return value
        ? ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        : false;
    }),
});
