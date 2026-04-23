import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const ItemForm = ({ onSubmit, onClose, initialData = null }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    type: 'Lost',
    location: '',
    date: '',
    contactInfo: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Item' : 'Report New Item'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="overflow-y-auto p-6">
          <form id="item-form" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="itemName">Item Name</label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                required
                className="input-field"
                placeholder="e.g. Blue Hydroflask"
                value={formData.itemName}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="type">Type</label>
                <select
                  id="type"
                  name="type"
                  className="input-field bg-white"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  className="input-field"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                required
                className="input-field"
                placeholder="e.g. Library 2nd Floor"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contactInfo">Contact Info</label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                required
                className="input-field"
                placeholder="Phone number or email"
                value={formData.contactInfo}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                required
                rows={3}
                className="input-field resize-none"
                placeholder="Provide details like color, brand, distinct marks..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="item-form"
            className="btn-primary flex items-center gap-2"
          >
            <Save size={18} />
            {initialData ? 'Update Item' : 'Save Item'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
