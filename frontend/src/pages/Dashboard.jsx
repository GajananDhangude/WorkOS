import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Building2, Users, PlusCircle, FileText } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const recruiterActions = [
    {
      icon: <PlusCircle className="h-8 w-8" />,
      title: 'Post a Job',
      description: 'Create a new job listing for your company',
      action: () => navigate('/post-job'),
      color: 'bg-blue-500',
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: 'Manage Companies',
      description: 'View and manage your registered companies',
      action: () => navigate('/companies'),
      color: 'bg-purple-500',
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: 'My Job Listings',
      description: 'View all jobs posted by you',
      action: () => navigate('/jobs'),
      color: 'bg-green-500',
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: 'Register Company',
      description: 'Add a new company to your account',
      action: () => navigate('/register-company'),
      color: 'bg-orange-500',
    },
  ];

  const studentActions = [
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: 'Browse Jobs',
      description: 'Explore thousands of job opportunities',
      action: () => navigate('/jobs'),
      color: 'bg-blue-500',
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'My Applications',
      description: 'Track all your job applications',
      action: () => navigate('/applied-jobs'),
      color: 'bg-green-500',
    },
  ];

  const actions = user?.role === 'recruiter' ? recruiterActions : studentActions;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-lg opacity-90">
            {user?.role === 'recruiter' 
              ? 'Manage your job postings and find the perfect candidates'
              : 'Discover your dream job and take the next step in your career'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {user?.role === 'recruiter' ? '0' : '0'}
              </span>
            </div>
            <p className="text-gray-600">
              {user?.role === 'recruiter' ? 'Active Jobs' : 'Applications'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">0</span>
            </div>
            <p className="text-gray-600">
              {user?.role === 'recruiter' ? 'Total Applicants' : 'Saved Jobs'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">0</span>
            </div>
            <p className="text-gray-600">
              {user?.role === 'recruiter' ? 'Companies' : 'Profile Views'}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-left group border-2 border-transparent hover:border-primary"
              >
                <div className={`${action.color} text-white p-3 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {action.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="text-center py-12 text-gray-500">
            <p>No recent activity to display</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;