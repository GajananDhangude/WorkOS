import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:8080/api',
    withCredentials:true,
    headers:{
      'Content-Type':'application/json',
    }
})


//Auth Api

export const registerUser = (userData) => api.post("/auth/register" , userData);
export const loginUser = (userData) => api.post("/auth/login" , userData);
export const logoutUser = () => api.get("/auth/logout");

//JOb Api

export const createJob = (jobData) => api.post("/jobs/post" , jobData)
export const getJobById = (id) => api.get(`/jobs/get/${id}`)
export const getAllJobs = (keyword = "") => api.get(`/jobs/get?keyword=${keyword}`);

//conmapny api
export const registerCompany = (companyData) => api.post("/company/new" , companyData);
export const getCompanies = () => api.get("/company/get");
export const getCompanyById = (id) => api.get(`/company/get/${id}`)


//Application Api
export const applyJob = (jobId) => api.post(`/apply/${jobId}`);
export const getAppliedJobs = () => api.get("/appliedjobs");
export const getApplicants = (jobId) => api.get(`/${jobId}/applicants`)



export default api;