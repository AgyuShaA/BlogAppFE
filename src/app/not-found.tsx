"use client";

import { type FC } from "react";

import { useRouter } from "next/navigation";

interface IProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

const NotFoundComponent: FC<Readonly<IProps>> = (props) => {
  const { title } = props;

  const router = useRouter();

  return (
    <div className="grid h-fit w-fit place-items-center items-center gap-4">
      <h1>{title || "404 - Page Not Found"}</h1>
    </div>
  );
};

export default NotFoundComponent;
