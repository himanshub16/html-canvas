var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

ctx.translate(canvas.width/2, canvas.height/2)

// start drawing
var raf = null

// a circle which grows and shrinks in size
function drawCircle(radius) {
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, Math.PI*2, true)
  ctx.closePath()
  ctx.fillStyle = 'black'
  ctx.fill()
}

function clear() {
  ctx.fillStyle = 'white'
  ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)
}

var R = 100
var theta = 0, play = true


function animate() {
  if (!play) {
    window.cancelAnimationFrame(raf)
    raf = null
    return
  }

  theta++
  if (theta == 360) theta = 0

  clear()
  drawCircle(R * Math.pow(Math.sin(theta*Math.PI / 180), 2))
  raf = window.requestAnimationFrame(animate)
}
animate()


document.getElementById('toggle').onclick = () => {
  play = !play
  if (play) animate()
}
