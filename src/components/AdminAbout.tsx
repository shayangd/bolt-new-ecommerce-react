import React from 'react';

export function AdminAbout() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
      <p className="text-gray-600 mb-4">
        Welcome to Simple Shop's admin dashboard. This platform is designed to help you manage your e-commerce store efficiently and effectively.
      </p>
      <p className="text-gray-600 mb-4">
        As an administrator, you have access to powerful tools for managing products, monitoring orders, and maintaining your online store's content.
      </p>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Features:</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Product Management - Add, edit, and remove products</li>
          <li>Category Organization - Keep your products well-organized</li>
          <li>Image Management - Upload and manage product images</li>
          <li>Price Control - Set and update product prices</li>
        </ul>
      </div>
    </div>
  );
}