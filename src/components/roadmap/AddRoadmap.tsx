import React, { useState } from 'react';

type AddRoadmapProps = {
  onAdd: (newRoadmap: {
    title: string;
    description: string;
    icon: string;
    steps: {
      title: string;
      description: string;
      resources: {
        title: string;
        url: string;
        type: 'article' | 'video' | 'course' | 'book';
      }[];
    }[];
  }) => void;
  onCancel: () => void;
};

const AddRoadmap: React.FC<AddRoadmapProps> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Layout');
  const [steps, setSteps] = useState([{
    title: '',
    description: '',
    resources: [{
      title: '',
      url: '',
      type: 'article' as 'article' | 'video' | 'course' | 'book'
    }]
  }]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ title, description, icon, steps });
  };

  const addStep = () => {
    setSteps([...steps, {
      title: '',
      description: '',
      resources: [{
        title: '',
        url: '',
        type: 'article'
      }]
    }]);
  };

  const updateStep = (index: number, field: string, value: any) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setSteps(newSteps);
  };

  const addResource = (stepIndex: number) => {
    const newSteps = [...steps];
    newSteps[stepIndex].resources.push({
      title: '',
      url: '',
      type: 'article'
    });
    setSteps(newSteps);
  };

  const updateResource = (stepIndex: number, resourceIndex: number, field: string, value: any) => {
    const newSteps = [...steps];
    newSteps[stepIndex].resources[resourceIndex] = {
      ...newSteps[stepIndex].resources[resourceIndex],
      [field]: value
    };
    setSteps(newSteps);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const removeResource = (stepIndex: number, resourceIndex: number) => {
    const newSteps = [...steps];
    if (newSteps[stepIndex].resources.length > 1) {
      newSteps[stepIndex].resources = newSteps[stepIndex].resources.filter((_, i) => i !== resourceIndex);
      setSteps(newSteps);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Add New Roadmap
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Topic Name *
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g., Data Science, DevOps, Machine Learning"
              required
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description *
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief description of what this roadmap covers"
              rows={3}
              required
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Icon
            </label>
            <select
              value={icon}
              onChange={e => setIcon(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="Layout">Layout (Frontend)</option>
              <option value="Server">Server (Backend)</option>
              <option value="Layers">Layers (Full Stack)</option>
              <option value="Smartphone">Smartphone (Mobile)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">Steps</h4>
              <button
                type="button"
                onClick={addStep}
                className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
              >
                Add Step
              </button>
            </div>

            {steps.map((step, stepIndex) => (
              <div key={stepIndex} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Step {stepIndex + 1}</h5>
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(stepIndex)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={step.title}
                    onChange={e => updateStep(stepIndex, 'title', e.target.value)}
                    placeholder="Step title"
                    required
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />

                  <textarea
                    value={step.description}
                    onChange={e => updateStep(stepIndex, 'description', e.target.value)}
                    placeholder="Step description"
                    rows={2}
                    required
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Recommended Resources</span>
                      <button
                        type="button"
                        onClick={() => addResource(stepIndex)}
                        className="px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      >
                        Add Resource
                      </button>
                    </div>

                    {step.resources.map((resource, resourceIndex) => (
                      <div key={resourceIndex} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={resource.title}
                          onChange={e => updateResource(stepIndex, resourceIndex, 'title', e.target.value)}
                          placeholder="Resource title"
                          required
                          className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <input
                          type="url"
                          value={resource.url}
                          onChange={e => updateResource(stepIndex, resourceIndex, 'url', e.target.value)}
                          placeholder="URL"
                          required
                          className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <select
                          value={resource.type}
                          onChange={e => updateResource(stepIndex, resourceIndex, 'type', e.target.value)}
                          className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="article">Article</option>
                          <option value="video">Video</option>
                          <option value="course">Course</option>
                          <option value="book">Book</option>
                        </select>
                        {step.resources.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeResource(stepIndex, resourceIndex)}
                            className="px-2 py-2 text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
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
              Add Roadmap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoadmap;
