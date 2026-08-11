"use client";

import React, { useState, useEffect } from 'react';

interface Job {
  _id: string;
  title: string;
  type: string;
  branch: string;
  openings: number;
  deadline: string;
  description?: string;
  questions?: any[];
}

interface Application {
  _id: string;
  jobId: string;
  name: string;
  phone: string;
  resumeUrl: string;
  answers: string[];
  createdAt: string;
}

export function CareersManager() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  
  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('On-site');
  const [branch, setBranch] = useState('');
  const [deadline, setDeadline] = useState('');
  const [openings, setOpenings] = useState(1);
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<{question: string, type: 'yes_no' | 'text'}[]>([{question: '', type: 'yes_no'}]);

  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'list' | 'create' | 'edit' | 'applications'>('list');
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  useEffect(() => {
    if (view === 'list') {
      fetchJobs();
    }
  }, [view]);

  const fetchJobs = async () => {
    try {
      const res = await fetch('/api/jobs');
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchApplications = async (job: Job) => {
    try {
      setSelectedJob(job);
      setView('applications');
      const res = await fetch(`/api/jobs/${job._id}/applications`);
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validQuestions = questions.filter(q => q.question && q.question.trim() !== '');
      const url = view === 'edit' && editingJobId ? `/api/jobs/${editingJobId}` : '/api/jobs';
      const method = view === 'edit' ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, type, branch, deadline, openings, description, questions: validQuestions
        })
      });
      
      if (res.ok) {
        alert(`Job ${view === 'edit' ? 'updated' : 'created'} successfully!`);
        setView('list');
        // Reset form
        setTitle('');
        setBranch('');
        setDescription('');
        setQuestions([{question: '', type: 'yes_no'}]);
        setEditingJobId(null);
      } else {
        const data = await res.json();
        alert(data.error || `Failed to ${view === 'edit' ? 'update' : 'create'} job`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (job: Job) => {
    setTitle(job.title);
    setType(job.type);
    setBranch(job.branch);
    setDeadline(new Date(job.deadline).toISOString().split('T')[0]);
    setOpenings(job.openings);
    setDescription(job.description || '');
    
    let formattedQuestions = [{question: '', type: 'yes_no' as const}];
    if (job.questions && job.questions.length > 0) {
      formattedQuestions = job.questions.map(q => {
        if (typeof q === 'string') {
          return { question: q, type: 'yes_no' as const };
        }
        return { question: q.question || '', type: q.type || 'yes_no' };
      });
    }
    setQuestions(formattedQuestions);
    setEditingJobId(job._id);
    setView('edit');
  };

  const handleDeleteClick = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job post?')) return;
    
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('Job deleted successfully!');
        fetchJobs();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete job');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting the job');
    }
  };

  const handleQuestionChange = (index: number, field: 'question' | 'type', value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions as any);
  };

  const addQuestionField = () => {
    setQuestions([...questions, {question: '', type: 'yes_no'}]);
  };

  const removeQuestionField = (index: number) => {
    const newQuestions = questions.filter((_, idx) => idx !== index);
    setQuestions(newQuestions as any);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-end items-center mb-8">
        {view !== 'list' && (
          <button 
            onClick={() => setView('list')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Back to List
          </button>
        )}
        {view === 'list' && (
          <button 
            onClick={() => setView('create')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create New Job
          </button>
        )}
      </div>

      {view === 'list' && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type & Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.type} - {job.branch}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(job.deadline) > new Date() ? 'Open' : 'Closed'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEditClick(job)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(job._id)}
                      className="text-red-600 hover:text-red-900 mr-4"
                    >
                      Delete
                    </button>
                    <button 
                      onClick={() => fetchApplications(job)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Applications
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(view === 'create' || view === 'edit') && (
        <div className="bg-white shadow rounded-lg p-6 max-w-2xl">
          <form onSubmit={handleCreateJob} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select value={type} onChange={e => setType(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option>On-site</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Branch</label>
                <input type="text" required value={branch} onChange={e => setBranch(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                <input type="date" required value={deadline} onChange={e => setDeadline(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Openings</label>
                <input type="number" min="1" required value={openings} onChange={e => setOpenings(Number(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea required rows={5} value={description} onChange={e => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Questions</label>
              {questions.map((q, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    value={q.question} 
                    onChange={e => handleQuestionChange(idx, 'question', e.target.value)} 
                    placeholder="E.g., I have 3+ years experience"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <select
                    value={q.type}
                    onChange={e => handleQuestionChange(idx, 'type', e.target.value)}
                    className="block w-40 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="yes_no">Yes / No</option>
                    <option value="text">Text Answer</option>
                  </select>
                  <button 
                    type="button" 
                    onClick={() => removeQuestionField(idx)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 focus:outline-none border border-red-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={addQuestionField} className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                + Add another question
              </button>
            </div>

            <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              {loading ? (view === 'edit' ? 'Updating...' : 'Creating...') : (view === 'edit' ? 'Update Job Post' : 'Create Job Post')}
            </button>
          </form>
        </div>
      )}

      {view === 'applications' && selectedJob && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 bg-gray-50 border-b">
            <h2 className="text-xl font-bold">Applications for: {selectedJob.title}</h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Answers</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No applications yet.</td>
                </tr>
              ) : applications.map((app) => (
                <tr key={app._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {app.resumeUrl ? (
                      <a 
                        href={app.resumeUrl.includes('cloudinary.com') && app.resumeUrl.includes('/upload/') 
                          ? app.resumeUrl.replace('/upload/', '/upload/fl_attachment/') 
                          : app.resumeUrl.startsWith('http') ? app.resumeUrl : `https://${app.resumeUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      <span className="text-gray-400">No Resume</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc pl-4">
                      {app.answers?.map((ans, idx) => (
                        <li key={idx}>{ans}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
