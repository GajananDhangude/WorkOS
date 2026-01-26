import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppliedJobs } from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Building2, Clock, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

const AppliedJobs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'student') {
      toast.error('Only job seekers can view applied jobs');
      navigate('/');
      return;
    }
    fetchAppliedJobs();
  }, [user, navigate]);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);
      const response = await getAppliedJobs();
      setApplications(response.data.application || []);
    } catch (error) {
      toast.error('Failed to fetch applied jobs');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const appDate = new Date(date);
    const diffTime = Math.abs(now - appDate);
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">Track all your job applications in one place</p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-600 mb-6">Start applying to jobs to see them here</p>
            <button
              onClick={() => navigate('/jobs')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {application.job?.title || 'Job Title'}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Building2 className="h-4 w-4" />
                        <span>{application.job?.company?.name || 'Company'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{application.job?.location || 'Location'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Applied {getTimeAgo(application.createdAt)}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 line-clamp-2">
                      {application.job?.description || 'No description available'}
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end space-y-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {application.status || 'Pending'}
                    </span>
                    <button
                      onClick={() => navigate(`/jobs/${application.job?._id}`)}
                      className="text-primary font-semibold hover:text-primary/80 transition"
                    >
                      View Details →
                    </button>
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

export default AppliedJobs;