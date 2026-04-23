import React from 'react';
import { format } from 'date-fns';
import { MapPin, Calendar, Phone, Edit, Trash2 } from 'lucide-react';

const ItemCard = ({ item, onEdit, onDelete, currentUserId }) => {
  const isOwner = item.user === currentUserId;

  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 truncate pr-4">{item.itemName}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
            item.type === 'Lost' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
          }`}>
            {item.type}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2 h-12">{item.description}</p>
        
        <div className="space-y-2 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-indigo-500" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-indigo-500" />
            <span>{format(new Date(item.date), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-indigo-500" />
            <span className="truncate">{item.contactInfo}</span>
          </div>
        </div>
        
        {isOwner && (
          <div className="flex gap-3 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(item)}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors text-sm font-medium"
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              onClick={() => onDelete(item._id)}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
