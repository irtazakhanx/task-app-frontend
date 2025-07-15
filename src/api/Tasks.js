import client from "../axios/Client";


export async function createTask(task) {
  const res = await client.post('/tasks', task);
  return res.data;
}

export async function getTasks() {
  const res = await client.get('/tasks');
  return res.data;
}

export async function getTask(id) {
  const res = await client.get(`/tasks/${id}`);
  return res.data;
}

export async function updateTask(id, updates) {
  const res = await client.put(`/tasks/${id}`, updates);
  return res.data;
}

export async function deleteTask(id) {
  const res = await client.delete(`/tasks/${id}`);
  return res.data.tasks;
}