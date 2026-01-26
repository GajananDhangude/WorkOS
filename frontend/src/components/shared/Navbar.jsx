import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, Briefcase, User, LogOut, PlusCircle, Building2 } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gray-800">JobPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition">
              Home
            </Link>
            <Link to="/jobs" className="text-gray-700 hover:text-primary transition">
              Jobs
            </Link>
            
            {isAuthenticated ? (
              <>
                {user?.role === 'recruiter' && (
                  <>
                    <Link to="/post-job" className="text-gray-700 hover:text-primary transition">
                      Post Job
                    </Link>
                    <Link to="/my-jobs" className="text-gray-700 hover:text-primary transition">
                      My Jobs
                    </Link>
                    <Link to="/companies" className="text-gray-700 hover:text-primary transition">
                      Companies
                    </Link>
                  </>
                )}
                
                {user?.role === 'student' && (
                  <Link to="/applied-jobs" className="text-gray-700 hover:text-primary transition">
                    Applied Jobs
                  </Link>
                )}

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <User className="h-5 w-5" />
                    <span>{user?.name}</span>
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                      <div className="px-4 py-2 border-b">
                        <p className="font-semibold text-gray-800">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className="block py-2 text-gray-700 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Jobs
            </Link>
            
            {isAuthenticated ? (
              <>
                {user?.role === 'recruiter' && (
                  <>
                    <Link
                      to="/post-job"
                      className="block py-2 text-gray-700 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Post Job
                    </Link>
                    <Link
                      to="/companies"
                      className="block py-2 text-gray-700 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Companies
                    </Link>
                  </>
                )}
                
                {user?.role === 'student' && (
                  <Link
                    to="/applied-jobs"
                    className="block py-2 text-gray-700 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Applied Jobs
                  </Link>
                )}
                
                <Link
                  to="/dashboard"
                  className="block py-2 text-gray-700 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-gray-700 hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-primary font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;