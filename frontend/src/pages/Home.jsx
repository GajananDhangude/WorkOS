import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Briefcase, Users, TrendingUp, ArrowRight } from 'lucide-react';

const Home = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?keyword=${searchKeyword}`);
  };

  const features = [
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: 'Thousands of Jobs',
      description: 'Browse through thousands of job listings from top companies',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Top Companies',
      description: 'Connect with leading employers across various industries',
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Career Growth',
      description: 'Find opportunities that match your skills and ambitions',
    },
  ];

  const categories = [
    'Technology', 'Marketing', 'Design', 'Sales', 'Customer Service',
    'Engineering', 'Healthcare', 'Finance', 'Education', 'Legal'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Find Your Dream Job
            <span className="block text-primary mt-2">Start Your Career Today</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Connect with top employers and discover opportunities that match your skills and passion
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="relative flex items-center bg-white rounded-full shadow-xl overflow-hidden">
              <div className="absolute left-6">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search jobs by title, company, or keyword..."
                className="flex-1 pl-16 pr-4 py-5 text-lg focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary text-white px-8 py-5 font-semibold hover:bg-primary/90 transition"
              >
                Search Jobs
              </button>
            </div>
          </form>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose JobPortal?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to find your next opportunity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600">
              Explore jobs by category
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => navigate(`/jobs?keyword=${category}`)}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl hover:bg-primary hover:text-white transition-all duration-300 font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of job seekers and employers on JobPortal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/jobs')}
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center space-x-2"
            >
              <span>Browse Jobs</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;