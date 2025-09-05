import * as yup from "yup";

export const updatePostValidationSchema = yup.object({
  title: yup.string().nullable().required(),
  description: yup.string().nullable().required(),
  content: yup.string().nullable().required(),
  image: yup
    .mixed<File>()
    .required()
    .test("fileSize", "Image must be less than 5MB", (value) => {
      if (!value) return true; // image is optional
      return value.size <= 5 * 1024 * 1024; // 5MB limit
    })
    .test("fileType", "Only JPG, PNG, or GIF files are allowed", (value) => {
      if (!value) return true;
      return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
    }),
});
