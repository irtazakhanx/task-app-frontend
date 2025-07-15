import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import TaskFilter from './TaskFilter'
import { getUser } from '../api/Auth'
import { createTask, getTasks, updateTask, deleteTask } from '../api/Tasks'

// Dummy initial data for demonstration (will be replaced by API)
// const initialTasks = [
//   { id: 1, title: 'Buy groceries', description: 'Milk, Bread, Eggs', status: 'pending' },
//   { id: 2, title: 'Finish project', description: 'Complete the MERN task manager', status: 'completed' },
// ]

function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState('')
  const navigate = useNavigate()

  // Fetch user info and tasks on mount
  useEffect(() => {
    async function fetchUserAndTasks() {
      try {
        const user = await getUser()
        setUsername(user.name || user.username || 'User')
        setUserId(user._id || user.id)
        // Fetch tasks for this user
        const fetchedTasks = await getTasks()
        setTasks(fetchedTasks)
      } catch (err) {
        // If unauthorized, force logout
        localStorage.removeItem('token')
        navigate('/login')
      }
    }
    fetchUserAndTasks()
    // eslint-disable-next-line
  }, [])

  // Filter and search logic
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' ? true : task.status === filter
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(search.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  // Handlers
  const fetchAndSetTasks = async () => {
    try {
      const fetchedTasks = await getTasks()
      setTasks(fetchedTasks)
    } catch (err) {
      // handle error
    }
  }

  const handleAdd = () => {
    setEditingTask(null)
    setModalOpen(true)
  }
  const handleEdit = (task) => {
    setEditingTask(task)
    setModalOpen(true)
  }
  const handleDelete = async (task) => {
    try {
      const res = await deleteTask(task.id || task._id, userId)
      setTasks(res);
    } catch (err) {
      // handle error (show toast, etc)
    }
  }
  const handleToggle = async (task) => {
    try {
      await updateTask(task.id || task._id, { status: task.status === 'completed' ? 'pending' : 'completed', user: userId })
      await fetchAndSetTasks()
    } catch (err) {
      // handle error
    }
  }
  const handleSubmit = async (task) => {
    try {
      if (task.id || task._id) {
        // Edit
        await updateTask(task.id || task._id, { ...task, user: userId })
      } else {
        // Create
        await createTask({ ...task, user: userId })
      }
      await fetchAndSetTasks()
    } catch (err) {
      // handle error
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center py-8 px-2 relative">
      {/* Top right user info and logout */}
      <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
        <span className="font-semibold text-indigo-700 bg-white px-3 py-1 rounded shadow">{username}</span>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
          className="bg-red-100 text-red-600 px-4 py-2 rounded font-semibold hover:bg-red-200 transition"
        >
          Logout
        </button>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 border border-indigo-100 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight drop-shadow-sm">Task Manager</h1>
        </div>
        <div className="mb-6 flex flex-col sm:flex-row gap-2 items-center">
          <TaskFilter filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />
          <button onClick={handleAdd} className="bg-indigo-600 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-700 transition w-full sm:w-auto">Add Task</button>
        </div>
        <div className="mb-6">
          <TaskList
            tasks={filteredTasks}
            filter={filter}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
            
          />
        </div>
        <TaskForm
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          initialTask={editingTask}
        />
      </div>
    </div>
  )
}

export default TaskManager 