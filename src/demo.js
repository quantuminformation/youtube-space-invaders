// this is where everything starts
let game = new SpaceInvaders.Game()

// game.handleCollisions.bind(game)
window.addEventListener('keydown', (game.onKeyDown.bind(game)))
window.addEventListener('keyup', (game.onKeyUp.bind(game)))

function gameLoop () {
  requestAnimationFrame(gameLoop)
  // Drawing code goes here
  game.update()
}

gameLoop()
