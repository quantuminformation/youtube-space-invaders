import { SpaceInvaders } from './src/SpaceInvaders.ts'
import { Actions } from './src/SpaceInvaders.ts'

// this is where everything starts
let game = new SpaceInvaders(document.querySelector('#game-canvas'), true)

// game.handleCollisions.bind(game)
window.addEventListener('keydown', game.onKeyDown.bind(game))
window.addEventListener('keyup', game.onKeyUp.bind(game))

document.querySelector('#leftBtn').addEventListener('click', function() {
  //const newEvent = new CustomEvent(Actions.MOVE_LEFT)
  const newEvent = new CustomEvent('left')
  document.body.dispatchEvent(newEvent)
})
document.querySelector('#rightBtn').addEventListener('click', function() {
  const newEvent = new CustomEvent(Actions.MOVE_LEFT)
  document.body.dispatchEvent(newEvent)
})

function gameLoop() {
  requestAnimationFrame(gameLoop)
  // Drawing code goes here
  game.update()
}

gameLoop()
