const API_BASE = 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};

// Example API function
export const registerUser = async ({ name, email, password }) => {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    // Handle error response
    const errorData = await response.json();
    return { success: false, message: errorData.message || 'Registration failed' };
  }

  const data = await response.json();
  return { success: true, ...data }; // Ensure to return success flag along with data
};


export const loginUser = async (userData) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const getProducts = async (category = '') => {
  const response = await fetch(`${API_BASE}/products?categories=${category}`, {
    headers: { ...getAuthHeaders() },
  });
  return handleResponse(response);
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    headers: { ...getAuthHeaders() },
  });
  return handleResponse(response);
};

export const addToCart = async (productId, quantity) => {
  const response = await fetch(`${API_BASE}/cart/add`, {
    method: 'POST',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity }), // Include productId and quantity
  });
  return handleResponse(response);
};

export const removeFromCart = async (productId) => {
  const response = await fetch(`${API_BASE}/cart/remove`, {
    method: 'POST',
    headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });
  return handleResponse(response);
};
// Update the API function to send the user ID
export const getCartItems = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(`${API_BASE}/cart`, {
    method: 'POST', // Use POST to send the user ID
    headers: { 
      ...getAuthHeaders(), 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ userId: JSON.parse(atob(token.split('.')[1])).id }), // Extract user ID from token
  });

  return handleResponse(response);
};

export const checkout = async () => {
  const response = await fetch(`${API_BASE}/checkout`, {
    method: 'POST',
    headers: { ...getAuthHeaders() },
  });
  return handleResponse(response);
};
