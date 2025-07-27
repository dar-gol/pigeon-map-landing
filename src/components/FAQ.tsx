"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-grey-20 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left bg-white hover:bg-grey-5 transition-colors duration-200 flex justify-between items-center cursor-pointer"
      >
        <span className="font-semibold text-grey-100">{question}</span>
        <span
          className={`text-primary-80 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-grey-5 border-t border-grey-20">
          <p className="text-grey-70">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const t = useTranslations("FAQ");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqItems = [1, 2, 3, 4, 5, 6]; // Updated to include 6 FAQ items

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-grey-100">{t("title")}</h2>
        <p className="text-grey-70">{t("subtitle")}</p>
      </div>

      <div className="space-y-4">
        {faqItems.map((i) => (
          <FAQItem
            key={i}
            question={t(`items.${i}.question`)}
            answer={t(`items.${i}.answer`)}
            isOpen={openItems.includes(i)}
            onToggle={() => toggleItem(i)}
          />
        ))}
      </div>
    </section>
  );
}
