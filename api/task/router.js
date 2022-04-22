// build your `/api/tasks` router here
const router = require('express').Router()
const Model = require('./model.js')
const db = require('../../data/dbConfig')

const checkForId = (req, res, next) => {
    if(!req.body.project_id) {
        res.status(400).json({
            message: "project_id is required"
        })
    } else {
        next()
    }
}

const validateBody = async (req, res, next) => {
    const { task_description } = req.body
    const existing = await db('projects')
        .where('project_id', req.body.project_id)
        .first()
    if(!task_description) {
        res.status(400).json({
            message: "project_description is required"
        })
    } else if (!existing) {
        res.status(404).json({
            message: `project with project_id,"${req.body.project_id}" not found`
        })

    } else {
        next()
    }
}

router.get('/', (req, res, next) => {
    Model.getAll()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(next)
})

router.post('/', checkForId , validateBody, (req, res, next) => {
    const newTask = req.body
    Model.create(newTask)
      .then(newTask => {
        res.status(201).json({
            task_id: newTask.task_id,
            task_description: newTask.task_description,
            task_notes: newTask.task_notes,
            task_completed: (!!newTask.task_completed),
            project_id: newTask.project_id
        })
      })
      .catch(next)
  })

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: 'something went wrong inside the tasks router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router

/**

- [ ] `[POST] /api/tasks`
  - Even though `task_completed` is stored as an integer, the API uses booleans when interacting with the client
  - Example of response body: `{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_id:1}`


[POST] /api/tasks'
[13] can add a new task to the db'
[14] responds with the newly created task with the task_completed as a boolean'
[15] rejects a task lacking a task_description with an error status code'
[16] rejects a task lacking a project_id with an error status code'
[17] rejects a task containing an invalid project_id with an error status code'

 */