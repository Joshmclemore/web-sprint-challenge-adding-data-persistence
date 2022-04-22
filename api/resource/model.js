// build your `Resource` model here
// build your `resource` model here
const db = require('../../data/dbConfig')
    
function getAll() {
    return db('resources')
}

function create(newResource) {
   return db('resources').insert(newResource)
    .then(([resource_id]) => {
      return db('resources').where('resource_id', resource_id).first()
    })
  }

module.exports = { getAll, create }