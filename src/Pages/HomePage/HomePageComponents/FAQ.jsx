import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  {
    question: "How do I buy a property?",
    answer: "First, add a property to your wishlist, make an offer, and once the agent accepts it, you can proceed to payment.",
  },
  {
    question: "Can I trust the agents?",
    answer: "All agents are verified by the admin. We also show top-rated agents on our homepage for your convenience.",
  },
  {
    question: "How do I become an agent?",
    answer: "Create an account and ask the admin to assign you the 'agent' role from the admin dashboard.",
  },
  {
    question: "Is payment secure?",
    answer: "Yes, we use Stripe to handle all payments securely and ensure fraud prevention.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" py-12 px-4 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="max-w-5xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 shadow-sm transition-all duration-300"
          >
            <button
              className="w-full flex justify-between items-center text-left font-semibold text-lg"
              onClick={() => toggle(index)}
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <FiChevronUp className="text-xl" />
              ) : (
                <FiChevronDown className="text-xl" />
              )}
            </button>
            {openIndex === index && (
              <div className="mt-2 text-gray-600 text-sm">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
