import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import MilestoneForm from './MilestoneForm';
import MilestoneList from './MilestoneList';
import { differenceInWeeks, startOfDay } from 'date-fns';

const Dashboard = () => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState(null);

  useEffect(() => {
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    try {
      const response = await api.get('/milestones');
      setMilestones(response.data);
    } catch (error) {
      console.error('Error fetching milestones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMilestone = async (milestoneData) => {
    try {
      const response = await api.post('/milestones', milestoneData);
      setMilestones([response.data, ...milestones]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding milestone:', error);
    }
  };

  const handleUpdateMilestone = async (id, milestoneData) => {
    try {
      const response = await api.put(`/milestones/${id}`, milestoneData);
      setMilestones(milestones.map(m => m._id === id ? response.data : m));
      setEditingMilestone(null);
    } catch (error) {
      console.error('Error updating milestone:', error);
    }
  };

  const handleDeleteMilestone = async (id) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      try {
        await api.delete(`/milestones/${id}`);
        setMilestones(milestones.filter(m => m._id !== id));
      } catch (error) {
        console.error('Error deleting milestone:', error);
      }
    }
  };

  const getPregnancyWeek = () => {
    if (milestones.length === 0) return null;
    
    const sortedMilestones = [...milestones].sort((a, b) => new Date(a.date) - new Date(b.date));
    const firstMilestone = sortedMilestones[0];
    const weeks = differenceInWeeks(new Date(), new Date(firstMilestone.date));
    
    return weeks;
  };

  const pregnancyWeek = getPregnancyWeek();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Baby Journey 🍼</h1>
        
        {pregnancyWeek !== null && pregnancyWeek >= 0 && (
          <div className="bg-primary-100 border-l-4 border-primary-500 p-4 rounded-md">
            <p className="text-lg text-gray-700">
              {pregnancyWeek <= 40 ? (
                <>You're at <span className="font-bold">{pregnancyWeek} weeks</span> pregnant! 
                {pregnancyWeek === 20 && " Halfway there! Time for anatomy scan!"}
                {pregnancyWeek === 28 && " Third trimester begins!"}
                {pregnancyWeek === 36 && " Baby is almost full-term!"}</>
              ) : (
                <>Your baby is <span className="font-bold">{pregnancyWeek - 40} weeks</span> old! 🎉</>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-500 text-white px-6 py-3 rounded-md hover:bg-primary-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Milestone
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <MilestoneForm
            onSubmit={handleAddMilestone}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {editingMilestone && (
        <div className="mb-8">
          <MilestoneForm
            milestone={editingMilestone}
            onSubmit={(data) => handleUpdateMilestone(editingMilestone._id, data)}
            onCancel={() => setEditingMilestone(null)}
          />
        </div>
      )}

      <MilestoneList
        milestones={milestones}
        onEdit={setEditingMilestone}
        onDelete={handleDeleteMilestone}
      />
    </div>
  );
};

export default Dashboard;