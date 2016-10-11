﻿var mongoose = require('mongoose')
var MovieSchema = new mongoose.Schema({
	director:String,
	name:String,
	language:String,
	country:String,
	summary:String,
	flash:String,
	coverImageUrl:String,
	year:Number,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

MovieSchema.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}
	next()
})

MovieSchema.statics = {
	fetch: function(cb){
		return this.find({}).exec(cb)
	},
	
	findById: function(cb){
		return this.findOne({_id:id}).exec(cb)
	}
}

module.exports = MovieSchema