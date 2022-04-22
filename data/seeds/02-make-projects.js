const projects = [
    { project_id: 1, project_name: 'My First Project', project_description: 'a test project', project_completed: 0 },
]

const resources = [
    { resource_id: 1, resource_name: 'my brain', resource_description: 'it is in my head' }
]

const project_resources = [
    { project_resources_id: 1, project_id: 1, resource_id: 1 }
]

const tasks = [
    { task_id: 1, task_description: 'think', project_id: 1 },
    { task_id: 2, task_description: 'think again', project_id: 1 },
    { task_id: 3, task_description: 'watch a video', project_id: 1 }
]

exports.seed = async function (knex) {
    await knex('projects').insert(projects)
    await knex('resources').insert(resources)
    await knex('tasks').insert(tasks)
    await knex('project_resources').insert(project_resources)
}