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
          <p className="text-grey-70 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FullFAQ() {
  const t = useTranslations("FAQ");
  const [openItems, setOpenItems] = useState<number[]>([1]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const allFaqItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-grey-100">{t("title")}</h1>
        <p className="text-lg text-grey-70 max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <div className="space-y-4">
        {allFaqItems.map((i) => (
          <FAQItem
            key={i}
            question={t(`items.${i}.question`)}
            answer={t(`items.${i}.answer`)}
            isOpen={openItems.includes(i)}
            onToggle={() => toggleItem(i)}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-grey-5 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4 text-grey-100">
            {t("needMoreHelp")}
          </h3>
          <p className="text-grey-70 mb-6">{t("needMoreHelpDescription")}</p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-primary-80 text-white rounded-lg hover:bg-primary-90 transition-colors duration-200"
          >
            {t("contactTeam")}
          </a>
        </div>
      </div>
    </section>
  );
}
