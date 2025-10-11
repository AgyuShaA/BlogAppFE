"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let el = document.getElementById("portal-root");

    if (!el) {
      el = document.createElement("div");
      el.id = "portal-root";
      document.body.appendChild(el);
    }

    setContainer(el);
  }, []);

  if (!container) return null;
  return createPortal(children, container);
};
