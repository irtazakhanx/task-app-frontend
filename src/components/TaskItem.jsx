import React from 'react'

function TaskItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <div className={`border rounded p-4 flex flex-col sm:flex-row items-center justify-between gap-2 ${task.status === 'completed' ? 'bg-green-50' : 'bg-white'}`}>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={onToggle}
          className="accent-indigo-600 w-5 h-5"
          disabled={task.status === 'completed'}
        />
        <div>
          <div className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>{task.title}</div>
          <div className="text-sm text-gray-500">{task.description}</div>
        </div>
      </div>
      <div className="flex gap-2 mt-2 sm:mt-0">
        <button
          onClick={onEdit}
          className="px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition disabled:opacity-50"
          disabled={task.status === 'completed'}
        >
          Edit
        </button>
        <button onClick={onDelete} className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition">Delete</button>
      </div>
    </div>
  )
}

export default TaskItem 