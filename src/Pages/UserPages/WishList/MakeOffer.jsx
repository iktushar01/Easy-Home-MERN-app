import React from 'react';
import { useParams } from 'react-router-dom';

const MakeOffer = () => {
  const { id } = useParams(); // This will be the propertyId
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Make an Offer</h2>
      <p>Property ID: {id}</p>
      {/* You can now fetch property details with this ID */}
    </div>
  );
};

export default MakeOffer;
