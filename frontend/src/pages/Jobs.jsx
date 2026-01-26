import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllJobs } from '../api/axios.js';
import JobCard from '../components/jobs/JobCard';
import { Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('keyword') || '');
  const [filters, setFilters] = useState({
    jobType: '',
    location: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async (keyword = '') => {
    try {
      setLoading(true);
      const response = await getAllJobs(keyword);
      setJobs(response.data.jobs || []);
    } catch (error) {
      toast.error('Failed to fetch jobs');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(searchKeyword);
  };

  const filteredJobs = jobs.filter((job) => {
    if (filters.jobType && job.jobType !== filters.jobType) return false;
    if (filters.location && !job.location?.toLowerCase().includes(filters.location.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Next Job</h1>
          <p className="text-gray-600">Discover opportunities from top companies</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative flex items-center bg-white rounded-lg shadow-md overflow-hidden">
            <div className="absolute left-4">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search by job title, company, or keyword..."
              className="flex-1 pl-12 pr-4 py-4 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary text-white px-8 py-4 font-semibold hover:bg-primary/90 transition"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Filters</h2>
              </div>

              <div className="space-y-4">
                {/* Job Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={filters.jobType}
                    onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    placeholder="e.g., New York"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => setFilters({ jobType: '', location: '' })}
                  className="w-full text-sm text-primary hover:text-primary/80 font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Jobs List */}
          <main className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600 text-lg">No jobs found matching your criteria</p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-gray-600">
                  Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
                </div>
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;