import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const TipsList = ({ milestoneId }) => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchTips();
  }, [milestoneId]);

  const fetchTips = async () => {
    try {
      const response = await api.get(`/milestones/${milestoneId}/tips`);
      setTips(response.data);
    } catch (error) {
      console.error('Error fetching tips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (tipId) => {
    try {
      const response = await api.put(`/tips/${tipId}/like`);
      setTips(tips.map(tip => tip._id === tipId ? response.data : tip));
    } catch (error) {
      console.error('Error liking tip:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading tips...</div>;
  }

  if (tips.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No tips yet. Be the first to share your experience!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tips.map((tip) => {
        const isLiked = tip.likes.includes(user.id);
        
        return (
          <div key={tip._id} className="bg-gray-50 rounded-md p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-gray-800">{tip.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  By {tip.userId.name} • {formatDistanceToNow(new Date(tip.createdAt))} ago
                </p>
              </div>
              
              <button
                onClick={() => handleLike(tip._id)}
                className={`ml-4 flex items-center gap-1 ${
                  isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                } transition-colors`}
              >
                <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm">{tip.likes.length}</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TipsList;