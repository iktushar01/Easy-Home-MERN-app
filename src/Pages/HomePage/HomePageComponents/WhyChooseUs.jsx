import { FaShieldAlt, FaUserTie, FaBolt, FaMoneyCheckAlt } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Verified Properties",
      description: "We ensure all properties are verified by our admin team for authenticity and trust.",
      color: "bg-primary text-primary-content",
      hover: "hover:bg-primary-focus hover:text-primary-content",
      animation: "animate-fade-up animate-delay-100"
    },
    {
      icon: <FaUserTie className="text-4xl" />,
      title: "Trusted Agents",
      description: "Work with top-rated agents who are experts in property sales and client satisfaction.",
      color: "bg-secondary text-secondary-content",
      hover: "hover:bg-secondary-focus hover:text-secondary-content",
      animation: "animate-fade-up animate-delay-200"
    },
    {
      icon: <FaBolt className="text-4xl" />,
      title: "Fast Response Time",
      description: "Get quick responses to your queries and property offers from agents.",
      color: "bg-accent text-accent-content",
      hover: "hover:bg-accent-focus hover:text-accent-content",
      animation: "animate-fade-up animate-delay-300"
    },
    {
      icon: <FaMoneyCheckAlt className="text-4xl" />,
      title: "Secure Transactions",
      description: "Your transactions are secure with Stripe integration and fraud prevention.",
      color: "bg-info text-info-content",
      hover: "hover:bg-info-focus hover:text-info-content",
      animation: "animate-fade-up animate-delay-400"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto py-20 px-4 md:px-16 bg-base-100">
      <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-down">
        <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
          Why <span className="text-secondary animate-pulse">Choose Us</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 rounded-full animate-scale-x"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`card ${feature.color} ${feature.hover} ${feature.animation} shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
          >
            <div className="card-body items-center text-center">
              <div className={`p-4 rounded-full ${feature.color.replace('bg-', 'bg-opacity-20 bg-')} mb-4`}>
                {feature.icon}
              </div>
              <h3 className="card-title text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-90">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

     
    </section>
  );
};

export default WhyChooseUs;