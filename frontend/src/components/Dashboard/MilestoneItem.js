import React, { useState } from 'react';
import { format } from 'date-fns';
import TipsList from '../Tips/TipsList';
import TipForm from '../Tips/TipForm';

const MilestoneItem = ({ milestone, onEdit, onDelete }) => {
  const [showTips, setShowTips] = useState(false);
  const [showTipForm, setShowTipForm] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{milestone.title}</h3>
          <p className="text-gray-600 mt-1">
            {format(new Date(milestone.date), 'MMMM d, yyyy')}
          </p>
          {milestone.note && (
            <p className="text-gray-700 mt-2">{milestone.note}</p>
          )}
        </div>
        
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(milestone)}
            className="text-blue-500 hover:text-blue-700 p-2"
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(milestone._id)}
            className="text-red-500 hover:text-red-700 p-2"
            title="Delete"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="border-t pt-4">
        <button
          onClick={() => setShowTips(!showTips)}
          className="text-primary-500 hover:text-primary-600 font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          Community Tips ({milestone.tipCount || 0})
        </button>
        
        {showTips && (
          <div className="mt-4">
            <div className="mb-4">
              <button
                onClick={() => setShowTipForm(!showTipForm)}
                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm"
              >
                Add Tip
              </button>
            </div>
            
            {showTipForm && (
              <TipForm
                milestoneId={milestone._id}
                onSuccess={() => setShowTipForm(false)}
              />
            )}
            
            <TipsList milestoneId={milestone._id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MilestoneItem;