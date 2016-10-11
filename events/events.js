var EventEmitter = require('events').EventEmitter
var life = new EventEmitter()
life.on('求安慰', function(who){
	console.log('给 '+who+' 倒水')
})

life.on('求溺爱', function(who){
	console.log('给 '+who+' 买衣服')
})

var hasconfortListener = life.emit('求安慰', '汉子')
var hasloveListener = life.emit('求溺爱', '妹子')

console.log(hasconfortListener)
console.log(hasloveListener)