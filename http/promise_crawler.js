var http = require('http')
var Promise = require('bluebird')
var cheerio = require('cheerio')
var baseUrl = 'http://www.imooc.com/learn/'
var videoIds = [348,259,197,134,75]

function printCourseInfo(coursesData){
	coursesData.forEach(function(courseData){
		console.log(courseData.number+'人学过'+courseData.title+'\n')
	})
	
	coursesData.forEach(function(courseData){
		console.log('###'+courseData.title + '\n')
		courseData.videos.forEach(function(item){
			var chapterTitle = item.chapterTitle
			console.log(chapterTitle + '\n')
			item.videos.forEach(function(video){
				console.log('  【'+video.id+'】'+video.title+'\n')
			})
		})
	})
}

function filterChapters(html){
	var $ = cheerio.load(html)
	var chapters = $('.chapter')
	var title= $('.pr .path span').text().trim()
	var number=$('.static-item .js-learn-num').text()
	console.log('learn num:'+$('.static-item .js-learn-num').length)
	console.log('learn num:'+$('.static-item .js-learn-num'))
	console.log('learn num:'+$('.static-item span.js-learn-num').text())
	var courseData = {
		videos:[],
		number:number,
		title:title
	}
	chapters.each(function(item){
		var chapter = $(this)
		var chapterTitle = chapter.find('strong').text()
		var videos = chapter.find('.video').children('li')
		var chapterData = {
			chapterTitle: chapterTitle,
			videos:[]
		}
		
		videos.each(function(item){
			var video = $(this).find('.J-media-item')
			var videoTitle = video.text().trim()
			var id = video.attr('href').split('video/')[1]
			chapterData.videos.push({
				title:videoTitle,
				id:id
			})
		})
		
		courseData.videos.push(chapterData)
	})
	return courseData
}

function getPageAsync(url){
	return new Promise(function(resolve,reject){
		console.log('正在爬取'+url)
		http.get(url,function(res){
			var html=''
			res.on('data',function(data){
				html += data
			})
			res.on('end',function(){
				resolve(html)
				//var courseData = filterChapters(html)
				//printCourseInfo(courseData)
			})
		}).on('error', function(e){
			reject(e)
			console.log('获取课程数据出错！')
		})
	})
}

var fetchCourseArray = []

videoIds.forEach(function(id){
	fetchCourseArray.push(getPageAsync(baseUrl + id))
})

Promise
	.all(fetchCourseArray)
	.then(function(pages){
		var courseData = []
		pages.forEach(function(html){
			var courses = filterChapters(html)
			courseData.push(courses)
		})
		
		courseData.sort(function(a,b){
			return a.number<b.number
		})
		
		printCourseInfo(courseData)
	})