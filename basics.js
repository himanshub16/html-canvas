var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

// start drawing

// draw a square at origin
ctx.fillRect(0, 0, 10, 10)
ctx.fillRect(50, 50, 70, 100)

// draw a line
ctx.moveTo(50, 10)
ctx.lineTo(100, 200)
ctx.lineTo(100, 300)
ctx.strokeStyle = 'red'
ctx.lineWidth = 2
ctx.stroke()

// draw a semi-circle
ctx.beginPath()
ctx.arc(200, 200, 10, 0, Math.PI, true)
ctx.closePath()
ctx.fillStyle = 'blue'
ctx.fill()

// draw a circle
ctx.beginPath()
ctx.arc(300, 200, 10, 0, Math.PI*2, true)
ctx.closePath()
ctx.fillStyle = 'blue'
ctx.fill()

