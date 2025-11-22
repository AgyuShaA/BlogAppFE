"use client";
import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { useContactModalStore } from "@/store/useContactStore";
import { useCartStore } from "@/store/useCartStore";
import { Tile } from "@/types/types";
import { useTileStore } from "@/store/useTileStore";
import { useTranslations } from "next-intl";

const ContactForm = () => {
  const { isOpen, close } = useContactModalStore();
  const cartTiles = useCartStore((state) => state.items);
  const allTiles = useTileStore((state) => state.tiles);

  const [form, setForm] = useState({ name: "", email: "", subject: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("contact_form");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatTilesList = (
    cartItems: { id: number; quantity: number }[],
    allTiles: Tile[]
  ) => {
    if (cartItems.length === 0) return "No tiles selected.";

    return cartItems
      .map((cartItem, i) => {
        const tile = allTiles.find((t) => t.id === cartItem.id);
        if (!tile) return "";

        return `<li>
        ${i + 1}. ${tile.name} (ID: ${tile.id}) <br/>
        Quantity: ${cartItem.quantity} <br/>
        <img src="${encodeURI(tile.imageUrl!)}" alt="${
          tile.name
        }" style="max-width:150px; max-height:100px;" />
      </li>`;
      })
      .join("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const tilesListHTML = formatTilesList(cartTiles, allTiles);

    // Email to user (buyer)
    const userMessage = `
    <p>Hey there,</p>
    <p>We received your message with the following tiles:</p>
    <ul>${tilesListHTML}</ul>
    <p>We will contact you soon!</p>
  `;

    const supportMessage = `
        <p>Hi there,</p>
        <p>You received an email from https://www.probouwstore.com</p>
        <p><strong>Name:</strong> ${form.name}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Subject:</strong> ${form.subject}</p>
        <p><strong>Tiles:</strong></p>
        <ul>${tilesListHTML}</ul>
      `;

    try {
      await emailjs.send(
        "service_a8wjhli",
        "template_lbmohd4",
        {
          email: form.email,
          message: userMessage,
        },
        "UY_As6_rWY0SzCJHN"
      );

      await emailjs.send(
        "service_a8wjhli",
        "template_lbmohd4",
        {
          email: "officialsupport@probouwstore.com",
          message: supportMessage,
        },
        "UY_As6_rWY0SzCJHN"
      );

      setLoading(false);
      setSuccess(t("successMsg"));
      setForm({ name: "", email: "", subject: "" });
    } catch (err) {
      setLoading(false);
      setError(t("errorMsg"));
      console.error(err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setSuccess("");
      setError("");
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          onClick={close}
          className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white w-[95%] p-4 py-8 md:p-10 rounded max-w-md  relative"
          >
            <button
              onClick={close}
              className="absolute cursor-pointer top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>

            <h2 className="text-3xl py-4 md:text-4xl text-center w-full">
              {t("contactUs")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-medium">
                  {t("name")}
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-medium">
                  {t("email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block font-medium">
                  {t("subject")}
                </label>
                <textarea
                  id="subject"
                  name="subject"
                  rows={5}
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#CB2021] cursor-pointer text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {loading ? t("sending") : t("send")}
              </button>

              {success && <p className="text-green-600">{success}</p>}
              {error && <p className="text-red-600">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;
