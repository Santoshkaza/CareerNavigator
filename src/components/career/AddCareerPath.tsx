import React, { useState } from 'react';

type AddCareerPathProps = {
  onAdd: (newCareerPath: {
    name: string;
    skills: string;
    education: string;
    jobOutlook: string;
    relatedJobs: string;
  }) => void;
  onCancel: () => void;
};

const AddCareerPath: React.FC<AddCareerPathProps> = ({ onAdd, onCancel }) => {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [jobOutlook, setJobOutlook] = useState('');
  const [relatedJobs, setRelatedJobs] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, skills, education, jobOutlook, relatedJobs });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Add New Career Path
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Skills
            </label>
            <textarea
              value={skills}
              onChange={e => setSkills(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Education
            </label>
            <textarea
              value={education}
              onChange={e => setEducation(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Job Outlook
            </label>
            <textarea
              value={jobOutlook}
              onChange={e => setJobOutlook(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Related Jobs
            </label>
            <textarea
              value={relatedJobs}
              onChange={e => setRelatedJobs(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Career Path
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCareerPath;
