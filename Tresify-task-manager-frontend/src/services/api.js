const BASE_URL = "https://task-manager-project-23019012-1.onrender.com"

const getToken = () => localStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// Auth
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Tasks
export const fetchTasks = async () => {
  const res = await fetch(`${BASE_URL}/tasks`, { headers: headers() });
  return res.json();
};

export const createTask = async (data) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateTask = async (id, data) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteTaskAPI = async (id) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: headers(),
  });
  return res.json();
};

export const toggleCompleteAPI = async (id) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
    method: 'PATCH',
    headers: headers(),
  });
  return res.json();
};
