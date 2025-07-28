import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiMail, FiMessageSquare, FiHelpCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How do I buy a property?",
    answer: "Our property purchase process is simple and secure. First, browse our listings and add properties to your wishlist. When you find your dream home, you can make an offer directly through our platform. Once the agent accepts your offer, you'll proceed to payment through our secure Stripe integration. Our team will guide you through every step of the transaction.",
    category: "Buying"
  },
  {
    question: "Can I trust the agents on your platform?",
    answer: "Absolutely. All agents undergo a rigorous verification process including license verification, background checks, and client reviews. We also feature top-rated agents with proven track records. Each agent profile displays their transaction history, client ratings, and response times for full transparency.",
    category: "Agents"
  },
  {
    question: "How do I become a verified agent?",
    answer: "To join our network of professional agents, create an account and submit your real estate license and professional references. Our team reviews applications within 2 business days. Once approved, you'll gain access to our agent dashboard, lead management tools, and marketing resources to grow your business.",
    category: "Agents"
  },
  {
    question: "Is my payment information secure?",
    answer: "Security is our top priority. We use bank-level encryption and Stripe's certified payment processing for all transactions. Your payment details are never stored on our servers. Additionally, we offer optional two-factor authentication for added security on your account.",
    category: "Payments"
  },
  {
    question: "What fees can I expect when buying?",
    answer: "Our platform charges a flat 1% transaction fee (capped at $5,000) for buyers. Additional costs may include standard closing costs (typically 2-5% of purchase price), inspection fees, and title insurance. We provide a detailed cost breakdown for each property and connect you with trusted service providers for competitive rates.",
    category: "Buying"
  },
  {
    question: "How do property valuations work?",
    answer: "Our AI-powered valuation tool analyzes hundreds of data points including recent sales, neighborhood trends, and property features. For precise valuations, we recommend our network of certified appraisers who offer discounted rates to our clients. All valuations include detailed reports explaining the methodology.",
    category: "Valuation"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = ["All", ...new Set(faqs.map(faq => faq.category))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 px-4 md:px-16 bg-base-300">
      <div className="max-w-7xl bg-base-300 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
            Find answers to common questions about buying, selling, and working with our platform
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-1/4 space-y-4">
            <div className="bg-base-200 p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <FiHelpCircle className="text-primary" /> Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${activeCategory === category ? 'bg-primary text-primary-content' : 'hover:bg-base-300'}`}
                  >
                    {category} ({category === "All" ? faqs.length : faqs.filter(f => f.category === category).length})
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-base-200 p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <FiMessageSquare className="text-secondary" /> Need Help?
              </h3>
              <p className="text-sm mb-4">
                Can't find what you're looking for? Our support team is available 24/7.
              </p>
              <button className="btn btn-secondary btn-sm w-full">
                <FiMail className="mr-2" /> Contact Support
              </button>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search FAQs..."
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border border-base-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      className="w-full flex justify-between items-center text-left p-6 font-semibold text-lg hover:bg-base-200 transition-colors"
                      onClick={() => toggle(index)}
                    >
                      <span>{faq.question}</span>
                      {openIndex === index ? (
                        <FiChevronUp className="text-xl text-primary" />
                      ) : (
                        <FiChevronDown className="text-xl text-primary" />
                      )}
                    </button>

                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 text-base-content/80">
                            {faq.answer}
                            <div className="mt-4">
                              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                                {faq.category}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-medium mb-2">No results found</h3>
                  <p className="text-base-content/70">
                    Try adjusting your search or filter to find what you're looking for
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-primary/5 p-8 rounded-xl text-center mt-12">
          <h3 className="text-2xl font-semibold mb-4">Still have questions?</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Our customer support team is available 24/7 to help with any questions about our platform or the real estate process.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn btn-primary px-8">
              <FiMail className="mr-2" /> Email Support
            </button>
            <button className="btn btn-outline btn-primary px-8">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;