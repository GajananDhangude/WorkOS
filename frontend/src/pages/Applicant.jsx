import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplicants } from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';
import { ArrowLeft, User, Mail, Phone, Calendar, Briefcase, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const Applicant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, accepted, rejected

  useEffect(() => {
    if (user?.role !== 'recruiter') {
      toast.error('Only recruiters can view applicants');
      navigate('/');
      return;
    }
    fetchApplicants();
  }, [user, navigate, id]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const response = await getApplicants(id);
      setJob(response.data.job);
      setApplicants(response.data.job.applications || []);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      toast.error('Failed to fetch applicants');
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

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const filteredApplicants = applicants.filter(app => {
    if (filter === 'all') return true;
    return (app.status || 'pending').toLowerCase() === filter;
  });

  const stats = {
    total: applicants.length,
    pending: applicants.filter(a => !a.status || a.status.toLowerCase() === 'pending').length,
    accepted: applicants.filter(a => a.status?.toLowerCase() === 'accepted').length,
    rejected: applicants.filter(a => a.status?.toLowerCase() === 'rejected').length,
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
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>

        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job?.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{job?.company?.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job?.location}</span>
                </div>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              {job?.jobType}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Applicants</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
              <div className="text-sm text-blue-600">Pending</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
              <div className="text-sm text-green-600">Accepted</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-red-600">Rejected</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          <div className="flex space-x-2">
            {['all', 'pending', 'accepted', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filter === status
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Applicants List */}
        {filteredApplicants.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No applicants found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'No one has applied for this job yet'
                : `No ${filter} applications`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplicants.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Avatar */}
                    <div className="bg-primary/10 p-3 rounded-full">
                      <User className="h-8 w-8 text-primary" />
                    </div>

                    {/* Applicant Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {application.applicant?.name || 'Unknown Applicant'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status || 'pending')}`}>
                          {application.status || 'Pending'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Mail className="h-4 w-4" />
                          <span className="text-sm">{application.applicant?.email || 'N/A'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <User className="h-4 w-4" />
                          <span className="text-sm capitalize">{application.applicant?.gender || 'N/A'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">Applied {getTimeAgo(application.createdAt)}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/applicant/${application._id}`)}
                          className="text-primary hover:text-primary/80 text-sm font-medium"
                        >
                          View Full Profile →
                        </button>
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

export default Applicant;