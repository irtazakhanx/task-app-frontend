import React, { useState, useEffect } from 'react'

function TaskForm({ open, onClose, onSubmit, initialTask }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '')
      setDescription(initialTask.description || '')
    } else {
      setTitle('')
      setDescription('')
    }
  }, [initialTask, open])

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({
      ...initialTask,
      title: title.trim(),
      description: description.trim(),
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-indigo-700">{initialTask ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 font-semibold">{initialTask ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm 