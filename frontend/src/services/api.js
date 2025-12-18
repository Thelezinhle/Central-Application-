import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    register: (data) => apiClient.post('/auth/register', data),
    login: (data) => apiClient.post('/auth/login', data),
    logout: () => apiClient.post('/auth/logout'),
    updateProfile: (data) => apiClient.put('/auth/profile', data)
};

export const universityService = {
    getAll: (page = 1, limit = 10) => apiClient.get(`/universities?page=${page}&limit=${limit}`),
    getById: (id) => apiClient.get(`/universities/${id}`),
    create: (data) => apiClient.post('/universities', data),
    update: (id, data) => apiClient.put(`/universities/${id}`, data),
    delete: (id) => apiClient.delete(`/universities/${id}`)
};

export const courseService = {
    getAll: (page = 1, limit = 10) => apiClient.get(`/courses?page=${page}&limit=${limit}`),
    getById: (id) => apiClient.get(`/courses/${id}`),
    search: (filters) => apiClient.get('/courses/search', { params: filters }),
    getByUniversity: (universityId) => apiClient.get(`/courses/university/${universityId}`),
    getRecommendations: () => apiClient.get('/courses/recommendations'),
    create: (data) => apiClient.post('/courses', data),
    update: (id, data) => apiClient.put(`/courses/${id}`, data),
    delete: (id) => apiClient.delete(`/courses/${id}`)
};

export const applicationService = {
    create: () => apiClient.post('/applications', {}),
    getAll: () => apiClient.get('/applications'),
    getById: (id) => apiClient.get(`/applications/${id}`),
    update: (id, data) => apiClient.put(`/applications/${id}`, data),
    submit: (id) => apiClient.post(`/applications/${id}/submit`, {}),
    changeOfMind: (id, selections) => apiClient.post(`/applications/${id}/change-of-mind`, { selections }),
    getStatus: (id) => apiClient.get(`/applications/${id}/status`),
    withdraw: (id) => apiClient.post(`/applications/${id}/withdraw`, {})
};

export const paymentService = {
    initialize: (data) => apiClient.post('/payments/initialize', data),
    verify: (data) => apiClient.post('/payments/verify', data),
    getHistory: () => apiClient.get('/payments/history'),
    downloadReceipt: (transactionId) => apiClient.get(`/payments/receipt/${transactionId}`)
};

export const documentService = {
    upload: (applicationId, file, docType) => {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('documentType', docType);
        formData.append('applicationId', applicationId);
        return apiClient.post('/documents/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    getDocuments: (applicationId) => apiClient.get(`/documents/${applicationId}`),
    delete: (documentId) => apiClient.delete(`/documents/${documentId}`),
    download: (documentId) => apiClient.get(`/documents/download/${documentId}`)
};

export default apiClient;
