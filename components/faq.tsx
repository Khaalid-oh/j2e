"use client";

import { useState } from "react";
import { Icon } from "./brand";

const questions = [
  {
    question: "Who is Journey to Excellence for?",
    answer:
      "Educators, staff and learning leaders across Anglophone East School District. It is a place to share practice, build connections and grow together.",
  },
  {
    question: "How do I register?",
    answer:
      "Create an account with your @nbed.nb.ca work email, then sign in to explore the available events and registration options.",
  },
  {
    question: "Where can I find my schedule?",
    answer:
      "Sign in to your event account to view your sessions and personal schedule.",
  },
  {
    question: "When is the next event?",
    answer:
      "Check the event portal for the latest published dates and available sessions.",
  },
];

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      {questions.map((faq, index) => (
        <div key={faq.question} className="border-t border-line py-6">
          <h3>
            <button
              className="flex w-full items-center justify-between gap-6 text-left text-[20px] leading-[27px] tracking-[-0.3px] md:text-[24px] md:leading-[30px] md:tracking-[-0.5px]"
              aria-expanded={open === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
              onClick={() => setOpen(open === index ? null : index)}
            >
              {faq.question}
              <Icon name={open === index ? "minus" : "plus"} tone="paper" />
            </button>
          </h3>
          <div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            hidden={open !== index}
          >
            <p className="body-text mt-4 text-muted">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
