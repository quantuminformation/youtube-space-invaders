import { SpaceInvaders } from './src/SpaceInvaders'
import { Actions } from './src/SpaceInvaders'
import { Interpreter } from './src/agent/Interpreter'
import { GAME_OVER, INITIALISING } from './src/constants/GameStates';

function setupGame() {
  const interpreter = new Interpreter()
  var game = undefined

  function reset() {
    game = new SpaceInvaders(document.querySelector('#game-canvas'))
    SpaceInvaders.gameStart = new Date().getTime()
    // game.handleCollisions.bind(game)
    window.addEventListener('keydown', game.onKeyDown.bind(game))
    window.addEventListener('keyup', game.onKeyUp.bind(game))
  }
  reset();

  const ai = interpreter.setupAgent();
  function gameLoop() {
    requestAnimationFrame(gameLoop)
    // Drawing code goes here
    game.update()
    interpreter.readPixels()
    interpreter.agentAction(ai)

    if (SpaceInvaders.gameState == GAME_OVER) {
      SpaceInvaders.gameState = INITIALISING
      interpreter.endGame()
      SpaceInvaders.gameNumber ++
      reset()
    }
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
document.querySelector('#shootBtn').addEventListener('click', function() {
  const newEvent = new CustomEvent(Actions.SHOOT)
  document.body.dispatchEvent(newEvent)
})
