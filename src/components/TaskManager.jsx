import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import TaskFilter from './TaskFilter'
import { getUser } from '../api/Auth'
import { createTask, getTasks, updateTask, deleteTask } from '../api/Tasks'
import { toast } from 'react-toastify'

function TaskManager() {
  
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchUserAndTasks() {
      setLoading(true)
      try {
        const user = await getUser()
        setUsername(user.name || user.username || 'User')
        setUserId(user._id || user.id)
        const fetchedTasks = await getTasks()
        setTasks(fetchedTasks)
      } catch (err) {
        localStorage.removeItem('token')
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }
    fetchUserAndTasks()
  }, [])

  const fetchAndSetTasks = async () => {
    setLoading(true)
    try {
      const fetchedTasks = await getTasks()
      setTasks(fetchedTasks)
    } catch (err) {
      toast.error('Failed to fetch tasks')
    } finally {
      setLoading(false)
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
    setLoading(true)
    try {
      await deleteTask(task.id || task._id, userId)
      await fetchAndSetTasks()
      toast.success('Task deleted successfully')
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to delete task')
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (task) => {
    setLoading(true)
    try {
      await updateTask(task.id || task._id, { status: task.status === 'completed' ? 'pending' : 'completed', user: userId })
      await fetchAndSetTasks()
      toast.success('Task status updated')
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to update task')
    } finally {
      setLoading(false)
    }
  }
  
  const handleSubmit = async (task) => {
    setLoading(true)
    try {
      if (task.id || task._id) {
        await updateTask(task.id || task._id, { ...task, user: userId })
        toast.success('Task updated successfully')
      } else {
        await createTask({ ...task, user: userId })
        toast.success('Task created successfully')
      }
      await fetchAndSetTasks()
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to save task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-slate-500 flex flex-col items-center justify-center py-8 px-2 relative">
      {/* Loader overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-990">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
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
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8 border border-indigo-100 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight drop-shadow-sm">Task Manager</h1>
        </div>
        <div className="mb-6 flex flex-col sm:flex-row gap-2 items-center">
          <TaskFilter filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />
          <button onClick={handleAdd} className="bg-indigo-600 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-700 transition w-full sm:w-auto">Add Task</button>
        </div>
        <div className="mb-6">
          <TaskList
            tasks={tasks.filter(task => {
              const matchesFilter = filter === 'all' ? true : task.status === filter
              const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                (task.description && task.description.toLowerCase().includes(search.toLowerCase()))
              return matchesFilter && matchesSearch
            })}
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