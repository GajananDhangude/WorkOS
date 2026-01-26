import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User, Mail, Phone, MapPin, Briefcase, Calendar, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ApplicantProfile = () => {
  const { id } = useParams(); // application ID
  const navigate = useNavigate();
  const { user } = useAuth();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user?.role !== 'recruiter') {
      toast.error('Only recruiters can view applicant profiles');
      navigate('/');
      return;
    }
    fetchApplicationDetails();
  }, [user, navigate, id]);

  const fetchApplicationDetails = async () => {
    try {
      setLoading(true);
      // We'll need to get the application by ID
      // For now, using a workaround - in production, create a separate endpoint
      const response = await axios.get(`http://localhost:8080/api/application/${id}`, {
        withCredentials: true
      });
      setApplication(response.data.application);
    } catch (error) {
      console.error('Error fetching application:', error);
      toast.error('Failed to fetch applicant details');
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      setUpdating(true);
      await axios.patch(
        `http://localhost:8080/api/application/${id}/status`,
        { status },
        { withCredentials: true }
      );
      setApplication({ ...application, status });
      toast.success(`Application ${status.toLowerCase()} successfully`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update application status');
    } finally {
      setUpdating(false);
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

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Application not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-primary hover:text-primary/80"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const applicant = application.applicant;
  const job = application.job;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        {/* Applicant Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  {applicant?.name || 'Unknown Applicant'}
                </h1>
                <p className="text-gray-600">{applicant?.email}</p>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              application.status === 'accepted' ? 'bg-green-100 text-green-800' :
              application.status === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {application.status || 'Pending'}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-900">{applicant?.email || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Gender</p>
                <p className="text-sm font-medium text-gray-900 capitalize">{applicant?.gender || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Briefcase className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Role</p>
                <p className="text-sm font-medium text-gray-900 capitalize">{applicant?.role || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Applied</p>
                <p className="text-sm font-medium text-gray-900">{getTimeAgo(application.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {application.status !== 'accepted' && application.status !== 'rejected' && (
            <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
              <button
                onClick={() => handleStatusUpdate('accepted')}
                disabled={updating}
                className="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="h-5 w-5" />
                <span>{updating ? 'Updating...' : 'Accept Application'}</span>
              </button>
              <button
                onClick={() => handleStatusUpdate('rejected')}
                disabled={updating}
                className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <XCircle className="h-5 w-5" />
                <span>{updating ? 'Updating...' : 'Reject Application'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Job Details */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Applied For</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Position</p>
              <p className="text-lg font-semibold text-gray-900">{job?.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Company</p>
              <p className="text-lg font-semibold text-gray-900">{job?.company?.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-900">{job?.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Job Type</p>
                <p className="text-gray-900">{job?.jobType}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Salary</p>
              <p className="text-gray-900">
                {job?.salary ? `$${job.salary.toLocaleString()}/year` : 'Not disclosed'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfile;