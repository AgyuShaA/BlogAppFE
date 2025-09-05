import { PostDto, UpdatePostDto } from "@/models/post.model";
import { updatePostValidationSchema } from "@/validationSchemas/updatePosrValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface UpdatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UpdatePostDto & { image?: File | null }) => void;
  postData: PostDto;
}

interface UpdatePostFormValues {
  title: string;
  description: string;
  content: string;
  image: File;
}

const UpdatePostModal: React.FC<UpdatePostModalProps> = ({
  isOpen,
  onClose,
  onSave,
  postData,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdatePostFormValues>({
    resolver: yupResolver(updatePostValidationSchema),
    defaultValues: {
      title: postData.title,
      description: postData.description,
      content: postData.content,
      image: undefined,
    },
  });

  useEffect(() => {
    if (postData) {
      setValue("title", postData.title ?? "");
      setValue("description", postData.description ?? "");
      setValue("content", postData.content ?? "");
    }
  }, [postData, setValue]);

  const onSubmit = (data: UpdatePostFormValues) => {
    const payload: UpdatePostDto & { image?: File | null } = {
      title: data.title,
      description: data.description,
      content: data.content,
      image: data.image || undefined,
    };
    onSave(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div
        className="fixed inset-0 flex items-center justify-center z-20"
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-white p-6 rounded-md shadow-md w-96 max-h-[90vh] overflow-auto">
          <h2 className="text-xl font-bold mb-4">Update Post</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Post Image
              </label>
              <Controller
                name="image"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    {/* Preview new file */}
                    {value ? (
                      <div className="mb-2">
                        <Image
                          src={URL.createObjectURL(value)}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="w-32 h-32 object-cover rounded-md"
                        />
                      </div>
                    ) : postData.photoUrl ? (
                      <div className="mb-2">
                        <Image
                          src={"http://localhost:3000" + postData.photoUrl}
                          alt="Current"
                          width={200}
                          height={200}
                          className="w-32 h-32 object-cover rounded-md"
                        />
                      </div>
                    ) : null}

                    <label className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm">
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0])
                            onChange(e.target.files[0]);
                        }}
                        className="hidden"
                      />
                    </label>
                  </>
                )}
              />
              <p className="text-red-500 text-xs">{errors.title?.message}</p>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
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

export default UpdatePostModal;
