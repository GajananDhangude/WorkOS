import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, MapPin, DollarSign, Users, Eye, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const MyJobs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'recruiter') {
      toast.error('Only recruiters can access this page');
      navigate('/');
      return;
    }
    fetchMyJobs();
  }, [user, navigate]);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/jobs/admin', {
        withCredentials: true
      });
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch your jobs');
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const jobDate = new Date(date);
    const diffTime = Math.abs(now - jobDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Posted Jobs</h1>
            <p className="text-gray-600">Manage your job listings and view applicants</p>
          </div>
          <button
            onClick={() => navigate('/post-job')}
            className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Post New Job</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold text-gray-900">{jobs.length}</span>
            </div>
            <p className="text-gray-600">Total Jobs</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-green-500" />
              <span className="text-3xl font-bold text-gray-900">
                {jobs.reduce((acc, job) => acc + (job.applications?.length || 0), 0)}
              </span>
            </div>
            <p className="text-gray-600">Total Applicants</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <Eye className="h-8 w-8 text-blue-500" />
              <span className="text-3xl font-bold text-gray-900">
                {jobs.filter(job => (job.applications?.length || 0) > 0).length}
              </span>
            </div>
            <p className="text-gray-600">Jobs with Applicants</p>
          </div>
        </div>

        {/* Jobs List */}
        {jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs posted yet</h3>
            <p className="text-gray-600 mb-6">Create your first job listing to start receiving applications</p>
            <button
              onClick={() => navigate('/post-job')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                        {job.jobType}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.company?.name || 'Company'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4" />
                        <span>${job.salary?.toLocaleString()}/year</span>
                      </div>
                    </div>

                    <p className="text-gray-600 line-clamp-2 mb-4">{job.description}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-700">
                            {job.applications?.length || 0} applicants
                          </span>
                        </div>
                        <span className="text-gray-500">Posted {getTimeAgo(job.createdAt)}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/jobs/${job._id}`)}
                          className="text-gray-600 hover:text-primary transition text-sm font-medium"
                        >
                          View Job
                        </button>
                        {job.applications?.length > 0 && (
                          <button
                            onClick={() => navigate(`/jobs/${job._id}/applicants`)}
                            className="flex items-center space-x-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition text-sm font-medium"
                          >
                            <Users className="h-4 w-4" />
                            <span>View Applicants</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;