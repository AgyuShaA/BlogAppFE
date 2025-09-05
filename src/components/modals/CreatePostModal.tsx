import { CreatePostDto } from "@/models/post.model";
import { useAppSelector } from "@/store/hooks";
import { postValidationSchema } from "@/validationSchemas/postValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: CreatePostDto) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatePostDto>({
    resolver: yupResolver(postValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  useEffect(() => {
    console.log("Validation errors:", errors);
  }, [errors]);

  const router = useRouter();
  const userId = useAppSelector((state) => state.user.data?.id);

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<CreatePostDto> = (data) => {
    if (!userId) {
      onClose();
      router.push("/auth");
      return;
    }

    const newPost: CreatePostDto = {
      ...data,
      image: data.image,
    };

    onSave(newPost);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-auto">
          <h2 className="text-xl font-bold">Create Post</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-4 space-y-4"
          >
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-500 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                  />
                )}
              />
              {errors.content && (
                <p className="text-red-500 text-xs">{errors.content.message}</p>
              )}
            </div>

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      field.onChange(e.target.files[0]); // ✅ Register file with react-hook-form
                    }
                  }}
                  className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                />
              )}
            />
            {errors.image && (
              <p className="text-red-500 text-xs">{errors.image.message}</p>
            )}

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePostModal;
