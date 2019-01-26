import { SpaceInvaders } from './src/SpaceInvaders'
import { Actions } from './src/SpaceInvaders'
import { Interpreter } from './src/agent/Interpreter'

function setupGame() {
  const interpreter = new Interpreter()
  let game = new SpaceInvaders(document.querySelector('#game-canvas'))

  // game.handleCollisions.bind(game)
  window.addEventListener('keydown', game.onKeyDown.bind(game))
  window.addEventListener('keyup', game.onKeyUp.bind(game))

  function gameLoop() {
    requestAnimationFrame(gameLoop)
    // Drawing code goes here
    game.update()
    interpreter.readPixels()
  }
  gameLoop()
}
setupGame()

// the agent will communicate like this
document.querySelector('#leftBtn').addEventListener('click', function() {
  //const newEvent = new CustomEvent(Actions.MOVE_LEFT)
  const newEvent = new CustomEvent(Actions.MOVE_LEFT)
  document.body.dispatchEvent(newEvent)
})
document.querySelector('#rightBtn').addEventListener('click', function() {
  const newEvent = new CustomEvent(Actions.MOVE_RIGHT)
  document.body.dispatchEvent(newEvent)
})
document.querySelector('#upBtn').addEventListener('click', function() {
  const newEvent = new CustomEvent(Actions.MOVE_UP)
  document.body.dispatchEvent(newEvent)
})
document.querySelector('#downBtn').addEventListener('click', function() {
  const newEvent = new CustomEvent(Actions.MOVE_DOWN)
  document.body.dispatchEvent(newEvent)
})
