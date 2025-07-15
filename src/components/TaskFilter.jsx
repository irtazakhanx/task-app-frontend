import React from 'react'

function TaskFilter({ filter, setFilter, search, setSearch }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center">
      <select
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="border rounded px-3 py-2 w-full sm:w-40"
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <input
        type="text"
        placeholder="Search tasks..."
        className="border rounded px-3 py-2 w-full"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  )
}

export default TaskFilter 