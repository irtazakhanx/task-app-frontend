import React from 'react'
import TaskItem from './TaskItem'

function TaskList({ tasks, filter, onEdit, onDelete, onToggle }) {
  // Filter tasks by status if filter is not 'all'
  const filteredTasks = tasks.filter(task =>
    filter === 'all' ? true : task.status === filter
  )

  if (filteredTasks.length === 0) {
    return <div className="text-gray-500 text-center">No tasks to display.</div>
  }

  return (
    <div className="space-y-2">
      {filteredTasks.map(task => (
        <TaskItem
          key={task._id || task.id}
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task)}
          onToggle={() => onToggle(task)}
          disabled={task.status === 'completed'}
        />
      ))}
    </div>
  )
}

export default TaskList 