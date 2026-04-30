const BASE_URL = 'https://task-manager-project-23019012-1.onrender.com/api';

const getToken = () => localStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// Auth
export const registerUser = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    return { error: '❌ Cannot connect to server' };
  }
};

export const loginUser = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    return { error: '❌ Cannot connect to server' };
  }
};

// Tasks
export const fetchTasks = async () => {
  try {
    const res = await fetch(`${BASE_URL}/tasks`, { headers: headers() });
    return res.json();
  } catch (err) {
    return { error: '❌ Cannot connect to server' };
  }
};

export const createTask = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    return { error: '❌ Cannot connect to server' };
  }
};

export const updateTask = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    return { error: '❌ Cannot connect to server' };
  }
};

export const deleteTaskAPI = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: headers(),
    });
    return res.json();
  } catch (err) {
    return { error: '❌ Cannot connect to server' };
  }
};

export const toggleCompleteAPI = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
      method: 'PATCH',
      headers: headers(),
    });
    return res.json();
  } catch (err) {
    return { error: '❌ Cannot connect to server' };
  }
};