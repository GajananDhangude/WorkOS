import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById, applyJob } from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext';
import { MapPin, DollarSign, Clock, Building2, Briefcase, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await getJobById(id);
      setJob(response.data.job);
    } catch (error) {
      toast.error('Failed to fetch job details');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to apply for jobs');
      navigate('/login');
      return;
    }

    if (user?.role !== 'student') {
      toast.error('Only job seekers can apply for jobs');
      return;
    }

    if (hasApplied) {
      toast.info('You have already applied for this job');
      return;
    }

    try {
      setApplying(true);
      await applyJob(id);
      toast.success('Application submitted successfully!');
      setHasApplied(true);
      fetchJobDetails(); // Refresh to update applicant count
    } catch (error) {
      // Handle both 'message' and 'messsage' typo in backend
      const errorMsg = error.response?.data?.message || 
                       error.response?.data?.messsage || 
                       'Failed to apply for job';
      toast.error(errorMsg);
    } finally {
      setApplying(false);
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Not disclosed';
    return `$${salary.toLocaleString()}/year`;
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

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Job not found</p>
          <button
            onClick={() => navigate('/jobs')}
            className="mt-4 text-primary hover:text-primary/80"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Jobs</span>
        </button>

        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <Building2 className="h-5 w-5" />
                <span className="text-lg font-medium">{job.company?.name || 'Company Name'}</span>
              </div>
            </div>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
              {job.jobType || 'Full-time'}
            </span>
          </div>

          <div className="flex flex-wrap gap-6 mb-6 text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>{job.location || 'Remote'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>{formatSalary(job.salary)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Posted {getTimeAgo(job.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5" />
              <span>{job.applications?.length || 0} applicants</span>
            </div>
          </div>

          {user?.role === 'student' ? (
            <button
              onClick={handleApply}
              disabled={applying || hasApplied}
              className={`w-full sm:w-auto px-8 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
                hasApplied
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {applying ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Applying...</span>
                </span>
              ) : hasApplied ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Already Applied</span>
                </span>
              ) : (
                'Apply Now'
              )}
            </button>
          ) : user?.role === 'recruiter' ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-3 text-blue-800">
              You are viewing this as a recruiter
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Login to Apply
            </button>
          )}
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Company Info */}
        {job.company && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Company</h2>
            <div className="flex items-start space-x-4">
              <Building2 className="h-12 w-12 text-primary" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {job.company.name}
                </h3>
                <p className="text-gray-700">
                  {job.company.description || 'No description available'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;