// build your `Project` model here
const db = require('../../data/dbConfig')
    
async function getAll() {
    const projects = await db('projects')

    const result = []

    projects.forEach(project => {
        result.push({
            project_id: project.project_id,
            project_name: project.project_name,
            project_description: project.project_description,
            project_completed: !!project.project_completed
        })
    })
    
    return result
}

function create(newProject) {
   return db('projects').insert(newProject)
    .then(([project_id]) => {
      return db('projects').where('project_id', project_id).first()
    })
  }

module.exports = { getAll, create }