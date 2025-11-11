"use client";
import { CallIcon } from "@/assets/icons/call-icon";
import { useContactModalStore } from "@/store/useContactStore";

export function ContactUsButton() {
  const { toggle } = useContactModalStore();

  return (
    <button
      onClick={toggle}
      className="
        fixed bottom-4 left-1/2 transform -translate-x-1/2
        bg-[#CB2021] text-white font-semibold
        px-6 py-2 rounded-sm
        shadow-lg hover:bg-blue-700
        focus:outline-none  focus:ring-red-400 focus:ring-opacity-75
        z-50 flex items-center gap-4 w-[80%] sm:w-fit justify-center
      "
    >
      <CallIcon /> Contact Us
    </button>
  );
}
