import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import ProtectedRoute from './components/shared/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './components/jobs/JobDetails';
import Login from './components/auth/Login';
import Register from './components/auth/SignUp';
import Dashboard from './pages/Dashboard';
import PostJob from './components/jobs/PostJob';
import RegisterCompany from './components/company/RegisterCompany';
import AppliedJobs from './components/profile/AppliedJobs';
import CompanyList from './components/company/CompanyList';
import Applicant from './pages/Applicant';
import ApplicantProfile from './pages/ApplicantProfile';
import MyJobs from './pages/MyJobs';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/post-job" element={
                <ProtectedRoute>
                  <PostJob />
                </ProtectedRoute>
              } />
              <Route path="/register-company" element={
                <ProtectedRoute>
                  <RegisterCompany />
                </ProtectedRoute>
              } />
              <Route path="/applied-jobs" element={
                <ProtectedRoute>
                  <AppliedJobs />
                </ProtectedRoute>
              } />
              <Route path="/jobs/:id/applicants" element={
                <ProtectedRoute>
                  <Applicant />
                </ProtectedRoute>
              } />

              <Route path="/applicant/:id" element={
                <ProtectedRoute>
                  <ApplicantProfile />
                </ProtectedRoute>
              } />

              <Route path="/companies" element={
                <ProtectedRoute>
                  <CompanyList />
                </ProtectedRoute>
              } />
              <Route path="/my-jobs" element={
                <ProtectedRoute>
                  <MyJobs />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;