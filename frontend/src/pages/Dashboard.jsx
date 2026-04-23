import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard';
import ItemForm from '../components/ItemForm';
import { toast } from 'react-toastify';
import { Plus, Search, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null); // For confirmation modal

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await api.get('/items');
      setItems(res.data);
    } catch (error) {
      toast.error('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.get(`/items/search?name=${searchTerm}&type=${filterType}`);
      setItems(res.data);
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingItem) {
        await api.put(`/items/${editingItem._id}`, formData);
        toast.success('Item updated successfully');
      } else {
        await api.post('/items', formData);
        toast.success('Item reported successfully');
      }
      setIsFormOpen(false);
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    try {
      await api.delete(`/items/${itemToDelete}`);
      toast.success('Item deleted successfully');
      setItemToDelete(null);
      fetchItems();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
      setItemToDelete(null);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesName = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? item.type === filterType : true;
    return matchesName && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage lost and found items across campus</p>
          </div>
          <button
            onClick={() => { setEditingItem(null); setIsFormOpen(true); }}
            className="btn-primary flex items-center gap-2 shadow-md shrink-0 w-full md:w-auto justify-center"
          >
            <Plus size={20} />
            Report Item
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col sm:flex-row gap-4 border border-gray-100">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search items by name..."
              className="input-field pl-10 bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="input-field sm:w-48 bg-gray-50"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center bg-white rounded-xl shadow-sm p-12 border border-gray-100">
            <div className="mx-auto h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <ItemCard
                key={item._id}
                item={item}
                currentUserId={user?._id}
                onEdit={(item) => { setEditingItem(item); setIsFormOpen(true); }}
                onDelete={(id) => setItemToDelete(id)}
              />
            ))}
          </div>
        )}
      </main>

      {isFormOpen && (
        <ItemForm
          initialData={editingItem}
          onClose={() => { setIsFormOpen(false); setEditingItem(null); }}
          onSubmit={handleCreateOrUpdate}
        />
      )}

      {itemToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Item?</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setItemToDelete(null)}
                className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
