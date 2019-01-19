var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

// reposition the coordinate frames
ctx.translate(canvas.width/2, canvas.height*0.1)

class Bob {
  constructor(radius=20) {
    this.radius = radius
    this.R = {x: 0, y: 0}
    this.theta = 0
    this.angV = 0
  }

  updateParams(dt) {
    this.R.x = L * Math.sin(this.theta)
    this.R.y = L * Math.cos(this.theta)

    let A = -g * Math.sin(this.theta)
    this.angV += A * dt
    this.theta += this.angV * dt
  }

  draw(ctx, color='black') {
    ctx.beginPath()
    ctx.arc(this.R.x, this.R.y, this.radius, 0, Math.PI*2, true)
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
  }
}

var raf = null
var T = 0,
    dt = 0.001,
    Tmax = 1000,
    g = 10,
    L = 200,
    Precision = 3,
    radius = 10,
    theta_o = Math.PI / 6


function init() {
  byid = (id) => document.getElementById(id)
  byid('g').onchange = (e) => {
    g = Number(e.target.value)
    byid('gValue').value = g
  }

  byid('g').value = g
  byid('gValue').value = g

  byid('dt').onchange = (e) => {
    dt = Number(e.target.value) / 10000
    byid('dtValue').value = dt
  }
  byid('dt').value = dt * 1000
  byid('dtValue').value = dt

  byid('theta_0').onchange = (e) => {
    theta_o = Number(e.target.value) * Math.PI / 180
    byid('theta_0Value').value = e.target.value
  }
  byid('theta_0').value = theta_o
  byid('theta_0Value').value = theta_o * 180 / Math.PI

  byid('L').onchange = (e) => {
    L = Number(e.target.value)
    byid('LValue').value = e.target.value
  }
  byid('L').value = L
  byid('LValue').value = L

  byid('stop').onclick = () => {
    T = Tmax
  }

  byid('restart').onclick = () => {
    T = 0
    bob.theta = theta_o
    simulate()
  }
}
init()


var bob = new Bob(radius)
bob.theta = theta_o
// bob.angV = Math.sqrt(g*L/200)

function clearCanvas() {
  ctx.fillStyle = 'white'
  ctx.fillRect(-canvas.width/2, -canvas.height*0.1, canvas.width, canvas.height)
  ctx.fill()
}

function drawRod() {
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(bob.R.x, bob.R.y)
  ctx.lineWidth = 2
  ctx.stroke()
}

function drawCeil() {
  ctx.beginPath()
  ctx.moveTo(-10, 0)
  ctx.lineTo(10, 0)
  ctx.lineWidth = 2
  ctx.stroke()
}

function simulate() {
  if (T > Tmax) {
    window.cancelAnimationFrame(raf)
    raf = null
    return
  }

  T += dt
  document.getElementById('T').value = T

  clearCanvas()
  drawCeil()
  drawRod()

  bob.draw(ctx)
  bob.updateParams(dt)

  raf = window.requestAnimationFrame(simulate)
}
simulate()
