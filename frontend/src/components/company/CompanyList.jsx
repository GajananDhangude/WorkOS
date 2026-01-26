import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompanies } from '../../api/axios.js';
import { Building2, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const CompanyList = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await getCompanies();
      setCompanies(response.data.companies || []);
    } catch (error) {
      toast.error('Failed to fetch companies');
      console.log(error)
    } finally {
      setLoading(false);
    }
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Companies</h1>
            <p className="text-gray-600">Manage your registered companies</p>
          </div>
          <button
            onClick={() => navigate('/register-company')}
            className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add Company</span>
          </button>
        </div>

        {companies.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No companies registered</h3>
            <p className="text-gray-600 mb-6">Get started by registering your first company</p>
            <button
              onClick={() => navigate('/register-company')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
            >
              Register Company
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div
                key={company._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {company.description || 'No description provided'}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    Registered {new Date(company.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;