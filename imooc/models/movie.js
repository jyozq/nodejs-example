var mongoose = require('mongoose')
var MovieSchema = require('../schemas/movie')
var Movie = mongoose.model('Movie', MovieSchema, 'cl_doubanmovie')

module.exports = Movie