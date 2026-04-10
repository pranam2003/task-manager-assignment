import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

export const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createTask = async (title) => {
    const response = await axios.post(API_URL, { title });
    return response.data;
};

export const updateTask = async (id, updates) => {
    const response = await axios.patch(`${API_URL}/${id}`, updates);
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data; // usually empty or a structured response depending on backend, backend sends 204
};
