import { FaShieldAlt, FaUserTie, FaBolt, FaMoneyCheckAlt } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-4xl text-blue-600" />,
      title: "Verified Properties",
      description: "We ensure all properties are verified by our admin team for authenticity and trust.",
    },
    {
      icon: <FaUserTie className="text-4xl text-green-600" />,
      title: "Trusted Agents",
      description: "Work with top-rated agents who are experts in property sales and client satisfaction.",
    },
    {
      icon: <FaBolt className="text-4xl text-yellow-500" />,
      title: "Fast Response Time",
      description: "Get quick responses to your queries and property offers from agents.",
    },
    {
      icon: <FaMoneyCheckAlt className="text-4xl text-purple-600" />,
      title: "Secure Transactions",
      description: "Your transactions are secure with Stripe integration and fraud prevention.",
    },
  ];

  return (
    <section className=" max-w-7xl mx-auto py-12 px-4 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl text-gray-600 font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
