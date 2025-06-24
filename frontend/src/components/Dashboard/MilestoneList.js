import React from 'react';
import MilestoneItem from './MilestoneItem';

const MilestoneList = ({ milestones, onEdit, onDelete }) => {
  if (milestones.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <p className="text-gray-500 text-lg">No milestones yet. Start tracking your journey!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <MilestoneItem
          key={milestone._id}
          milestone={milestone}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default MilestoneList;