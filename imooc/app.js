var express = require('express')
var path=require('path')
var mongoose = require('mongoose')
var Movie = require('./models/movie')
var bodyParser = require('body-parser')
var port = process.env.PORT||3000
var app = express()

mongoose.connect('mongodb://192.168.222.132:27017/imooc')

app.set('views','./views/pages')
app.set('view engine','jade')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.locals.moment=require('moment')
app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port)

console.log('imooc started on port ' + port)

app.get('/',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('index',{
			title:'imooc 首页',
			movies:movies
		})
	})
})

app.get('/movie/:id',function(req,res){
	res.render('detail',{title:'imooc 详情页'})
})

app.get('/admin/movie',function(req,res){
	res.render('admin',{title:'imooc 后台录入页'})
})

app.get('/admin/list',function(req,res){
	res.render('list',{title:'imooc 列表页'})
})