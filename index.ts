// Import necessary classes and gamestates
import { SpaceInvaders } from './src/SpaceInvaders'
import { Actions } from './src/SpaceInvaders'
import { Interpreter } from './src/agent/Interpreter'
import { GAME_OVER, YOU_WIN, INITIALISING } from './src/constants/GameStates'

function setupGame() {
  const interpreter = new Interpreter()
  var game = undefined

  // Reset game after player loses or wins
  function reset() {
    // Create a new game instance
    game = new SpaceInvaders(document.querySelector('#game-canvas'))
    // Reset start time of game class
    SpaceInvaders.gameStart = new Date().getTime()
    // Reset score
    SpaceInvaders.score = 0
    // game.handleCollisions.bind(game)
    // Bind keyboard events
    window.addEventListener('keydown', game.onKeyDown.bind(game))
    window.addEventListener('keyup', game.onKeyUp.bind(game))
  }
  // Execute reset function to initialize game
  reset()

  // Set up AI agent and store actor and critic networks and settings
  interpreter.setupAgent()
  // Loop that will be executed continuously while the game is running
  function gameLoop() {
    requestAnimationFrame(gameLoop)
    // Drawing code goes here
    game.update()
    interpreter.readPixels()
    interpreter.agentAction()

    // If game ends, handle agent actions and reset game
    if (SpaceInvaders.gameState == GAME_OVER || SpaceInvaders.gameState == YOU_WIN) {
      SpaceInvaders.gameState = INITIALISING
      // Execute end-of-game actions for AI agent (handle reward)
      interpreter.endGame()
      SpaceInvaders.gameNumber++
      reset()
    }

    // TODO: Handle control input elements on update instead of on each game frame
    Interpreter.agentEnabled = (<HTMLInputElement>document.querySelector('#enableAgent')).checked
    // Game speed slider
    SpaceInvaders.gameSpeed = parseInt(
      (<HTMLInputElement>document.querySelector('#gameSpeed')).value
    )
    interpreter.updateLearningRate()
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
