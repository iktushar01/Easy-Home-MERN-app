import React from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiUser, FiShield, FiStar, FiFilter, FiHeart, FiShoppingCart, FiBarChart2 } from 'react-icons/fi';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    variants={fadeIn}
    className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-base-200"
  >
    <div className="text-3xl text-primary mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-base-content/90">{description}</p>
  </motion.div>
);

const RoleBadge = ({ role, description, icon }) => (
  <motion.div 
    variants={fadeIn}
    className="flex items-start gap-4 p-4 bg-base-100 rounded-lg border border-base-200"
  >
    <div className="text-2xl text-secondary mt-1">{icon}</div>
    <div>
      <h4 className="font-bold text-lg">{role}</h4>
      <p className="text-base-content/80">{description}</p>
    </div>
  </motion.div>
);

const About = () => {
  return (
    <div className="max-w-7xl min-h-screen mx-auto px-4 py-16">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="text-center mb-16"
      >
        <motion.h1 
          variants={fadeIn}
          className="text-4xl md:text-5xl font-bold text-primary mb-6"
        >
          About Our <span className="text-secondary">Real Estate</span> Platform
        </motion.h1>
        
        <motion.p 
          variants={fadeIn}
          className="text-lg md:text-xl text-base-content/90 max-w-3xl mx-auto"
        >
          Welcome to our MERN-powered real estate platform — a modern online marketplace designed to simplify buying, selling, and managing properties with cutting-edge technology.
        </motion.p>
      </motion.div>

      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Platform Highlights</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<FiHome />}
            title="Comprehensive Listings"
            description="Detailed property listings with high-quality images, virtual tours, and neighborhood insights."
          />
          <FeatureCard
            icon={<FiFilter />}
            title="Advanced Filtering"
            description="Smart search with filters for price, location, amenities, and more to find your perfect property."
          />
          <FeatureCard
            icon={<FiHeart />}
            title="Personalized Wishlists"
            description="Save your favorite properties and get notifications for price drops or similar listings."
          />
          <FeatureCard
            icon={<FiShoppingCart />}
            title="Secure Transactions"
            description="End-to-end encrypted payment processing for safe and reliable property purchases."
          />
          <FeatureCard
            icon={<FiStar />}
            title="Rating System"
            description="Community-driven reviews and ratings for properties and agents."
          />
          <FeatureCard
            icon={<FiBarChart2 />}
            title="Market Analytics"
            description="Real-time market trends and price history to make informed decisions."
          />
        </div>
      </motion.section>

      <motion.section 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-center mb-12">User Roles & Permissions</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          <RoleBadge
            icon={<FiUser />}
            role="Regular User"
            description="Can browse properties, save favorites, make purchases, and leave reviews on properties they've interacted with."
          />
          <RoleBadge
            icon={<FiUser className="text-accent" />}
            role="Verified Agent"
            description="Can create and manage property listings, track view statistics, and communicate directly with potential buyers."
          />
          <RoleBadge
            icon={<FiShield />}
            role="Administrator"
            description="Has full system access to manage users, verify agents, moderate content, and analyze platform metrics."
          />
        </div>
      </motion.section>

      <motion.section 
        variants={fadeIn}
        className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-base-100"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Frontend</h3>
              <ul className="space-y-2">
                <li>React.js with Vite for ultra-fast performance</li>
                <li>Tailwind CSS for responsive, utility-first styling</li>
                <li>Framer Motion for smooth animations</li>
                <li>React Query for server state management</li>
                <li>Formik & Yup for form handling</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Backend</h3>
              <ul className="space-y-2">
                <li>Node.js with Express.js server</li>
                <li>MongoDB with Mongoose ODM</li>
                <li>JWT authentication with refresh tokens</li>
                <li>Cloudinary for image storage</li>
                <li>Redis for caching and rate limiting</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;