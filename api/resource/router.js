// build your `/api/resources` router here

const router = require('express').Router()
const Model = require('./model.js')
const db = require('../../data/dbConfig')

// middleware is here

const validateBody = (req, res, next) => {
    const { resource_name } = req.body
    if(!resource_name) {
        res.status(400).json({
            message: "resource_name is required"
        })
    } else {
        next()
    }
}

const checkName = async (req, res, next) => {
    try {
      const existing = await db('resources')
        .where('resource_name', req.body.resource_name)
        .first()
  
      if(existing) {
        next({
          status:400,
          message: `resource with resource_name, "${req.body.resource_name}" is already taken`
        })
      } else {
        next()
      }
    } catch(err) {
      next(err)
    }
  }

// requests are here

router.get('/', (req, res, next) => {
    Model.getAll()
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(next)
})

router.post('/', validateBody, checkName, (req, res, next) => {
    const newResource = req.body
    Model.create(newResource)
      .then(newResource => {
        res.status(201).json(newResource)
      })
      .catch(next)
  })

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: 'something went wrong inside the resource router',
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router

