import React from 'react';

export function AboutPage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
      <p className="text-gray-600 mb-4">
        Welcome to Simple Shop, your one-stop destination for quality products at great prices.
      </p>
      <p className="text-gray-600 mb-4">
        Our mission is to provide an exceptional shopping experience with a carefully curated selection of products that meet our high standards for quality and value.
      </p>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Why Choose Us?</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Quality Products - We carefully select each item in our inventory</li>
          <li>Great Prices - Competitive pricing on all our products</li>
          <li>Fast Shipping - Quick delivery to your doorstep</li>
          <li>Excellent Support - Our customer service team is here to help</li>
        </ul>
      </div>
    </div>
  );
}