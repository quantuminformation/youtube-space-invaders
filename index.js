import {SpaceInvaders} from './src/SpaceInvaders'

  // this is where everything starts
let game = new SpaceInvaders(document.querySelector('#canvas'))

// game.handleCollisions.bind(game)
window.addEventListener('keydown', (game.onKeyDown.bind(game)))
window.addEventListener('keyup', (game.onKeyUp.bind(game)))

function gameLoop () {
  requestAnimationFrame(gameLoop)
  // Drawing code goes here
  game.update()
}

gameLoop()
