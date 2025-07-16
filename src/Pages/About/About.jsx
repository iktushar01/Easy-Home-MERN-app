import React from 'react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-primary text-center mb-6">About Our Real Estate Platform</h1>
      <p className="text-lg text-base-content text-center mb-10">
        Welcome to our MERN-powered real estate platform — a modern online marketplace designed to simplify buying, selling, and managing properties.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-secondary mb-2">🌐 Platform Overview</h2>
          <p className="text-base-content">
            Our platform enables seamless interactions between users, agents, and admins. Whether you're searching for your dream home or listing a new property, our system ensures a smooth and secure experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-secondary mb-2">👤 User Roles</h2>
          <ul className="list-disc pl-6 text-base-content space-y-2">
            <li><strong>User:</strong> Can browse properties, add to wishlist, purchase, and leave reviews.</li>
            <li><strong>Agent:</strong> Can add new properties, and manage their own listed/sold properties.</li>
            <li><strong>Admin:</strong> Has full control to manage all users, properties, and reviews.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-secondary mb-2">⚙️ Key Features</h2>
          <ul className="list-disc pl-6 text-base-content space-y-2">
            <li>Browse and filter available properties</li>
            <li>Secure authentication and role-based access</li>
            <li>Wishlist functionality and purchase tracking</li>
            <li>Review system for feedback and ratings</li>
            <li>Agent dashboard for managing listings</li>
            <li>Admin dashboard for platform management</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
