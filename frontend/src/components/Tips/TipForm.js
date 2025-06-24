import React, { useState } from 'react';
import api from '../../services/api';

const TipForm = ({ milestoneId, onSuccess }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post(`/milestones/${milestoneId}/tips`, { content });
      setContent('');
      onSuccess();
      // Trigger parent to refresh tips
      window.location.reload();
    } catch (error) {
      setError('Failed to add tip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-2 text-sm">
          {error}
        </div>
      )}
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your tip or experience..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        rows="3"
        required
      />
      
      <div className="mt-2 flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary-500 text-white px-3 py-1 rounded-md hover:bg-primary-600 text-sm disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Tip'}
        </button>
        <button
          type="button"
          onClick={onSuccess}
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TipForm;