// build your `/api/projects` router here
const router = require('express').Router()
const Model = require('./model.js')

const validateBody = (req, res, next) => {
    const { project_name } = req.body
    if(!project_name) {
        res.status(400).json({
            message: "project_name is required"
        })
    } else {
        next()
    }
}

router.get('/', (req, res, next) => {
    Model.getAll()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

router.post('/', validateBody, (req, res, next) => {
    const newProject = req.body
    Model.create(newProject)
      .then(newProject => {
        res.status(201).json({
            project_id: newProject.project_id,
            project_name: newProject.project_name,
            project_description: newProject.project_description,
            project_completed: (!!newProject.project_completed)
        })
      })
      .catch(next)
  })

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: 'something went wrong inside the project router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router
