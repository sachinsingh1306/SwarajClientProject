
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Common API request handler
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        data?.message || 'Something went wrong'
      );
    }

    return data;

  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

// GET request
export const get = (endpoint) => {
  return apiRequest(endpoint, {
    method: 'GET'
  });
};

// POST request
export const post = (endpoint, body) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(body)
  });
};

// PUT request
export const put = (endpoint, body) => {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body)
  });
};

// DELETE request
export const remove = (endpoint) => {
  return apiRequest(endpoint, {
    method: 'DELETE'
  });
};

// Lead APIs
export const leadAPI = {
  getAll: () => get('/leads'),

  getById: (id) => get(`/leads/${id}`),

  create: (data) => post('/leads', data),

  update: (id, data) => put(`/leads/${id}`, data),

  delete: (id) => remove(`/leads/${id}`)
};

// Gallery APIs
export const galleryAPI = {
  getAll: () => get('/gallery'),

  create: (data) => post('/gallery', data),

  delete: (id) => remove(`/gallery/${id}`)
};

// Services APIs
export const serviceAPI = {
  getAll: () => get('/services'),

  create: (data) => post('/services', data),

  update: (id, data) => put(`/services/${id}`, data),

  delete: (id) => remove(`/services/${id}`)
};

export default {
  get,
  post,
  put,
  remove,
  leadAPI,
  galleryAPI,
  serviceAPI
};
