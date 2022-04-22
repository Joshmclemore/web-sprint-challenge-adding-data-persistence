// build your `Task` model here
const db = require('../../data/dbConfig')
    
async function getAll() {
    const tasks = await db('tasks')
        .join('projects', "tasks.project_id", "projects.project_id" )
        .select('task_description', "task_notes", "task_completed", "tasks.project_id", "projects.project_name", "projects.project_description")

    const result = []

    tasks.forEach(task => {
        result.push({
            task_id: task.task_id,
            task_description: task.task_description,
            task_completed: !!task.task_completed,
            task_notes: task.task_notes,
            project_id: task.project_id,
            project_name: task.project_name,
            project_description: task.project_description
        })
    })
    return result
}

function create(newTask) {
   return db('tasks').insert(newTask)
    .then(([task_id]) => {
      return db('tasks').where('task_id', task_id).first()
    })
  }

module.exports = { getAll, create }