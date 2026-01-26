import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Briefcase, DollarSign, Clock, Building2, CheckCircle, Users } from 'lucide-react';

const JobCard = ({ job, isApplied = false, showApplicantsButton = false }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

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

  return (
    <div
      onClick={() => navigate(`/jobs/${job._id}`)}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-primary group relative"
    >
      {/* Applied Badge */}
      {isApplied && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
          <CheckCircle className="h-3 w-3" />
          <span>Applied</span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition">
            {job.title}
          </h3>
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <Building2 className="h-4 w-4" />
            <span className="font-medium">{job.company?.name || 'Company Name'}</span>
          </div>
        </div>
        {!isApplied && (
          <div className="flex-shrink-0 ml-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              {job.jobType || 'Full-time'}
            </span>
          </div>
        )}
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <MapPin className="h-4 w-4" />
          <span>{job.location || 'Remote'}</span>
        </div>
        <div className="flex items-center space-x-1">
          <DollarSign className="h-4 w-4" />
          <span>{formatSalary(job.salary)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{getTimeAgo(job.createdAt)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Briefcase className="h-4 w-4" />
          <span>{job.applications?.length || 0} applicants</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/jobs/${job._id}`);
            }}
            className="text-primary font-semibold hover:text-primary/80 transition group-hover:translate-x-1 duration-300"
          >
            View Details →
          </button>
          {showApplicantsButton && user?.role === 'recruiter' && job.applications?.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/jobs/${job._id}/applicants`);
              }}
              className="flex items-center space-x-1 bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 transition text-sm"
            >
              <Users className="h-4 w-4" />
              <span>Applicants</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;