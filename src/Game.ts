import { Player } from './gameObjects/Player'
import { Vector2, Vector2Normalised } from './util/Vectors'
import { KEY_CODES } from './constants/Keycodes'
import * as GameSettings from './constants/GameSettings'
import { GAME_OVER, INITIALISING, BATTLE_MODE, YOU_WIN } from './constants/GameStates'
import { Bullet } from './gameObjects/Bullets'
import { WaveManager } from './story/WaveManager'
import { rectCollides } from './util/CollisionDetection'
import { IGameObject } from './gameObjects/IGameObject'
import { LARGE_FONT_SIZE } from './constants/GameSettings'
import { MEDIUM_FONT_SIZE } from './constants/GameSettings'
import { AbstractInvader } from './gameObjects/AbstractInvader'
import { degreesToRadians } from './util/Conversions'
import { PlayerBase, DestructibleScenery } from './gameObjects/PlayerBase'

export class Game {
  static ASPECT_RATIO: number = 1 // keep it square for now
  static CANVAS_WIDTH: number = 600
  static CANVAS_HEIGHT: number = Game.CANVAS_WIDTH / Game.ASPECT_RATIO

  static gameState = INITIALISING
  static score: number = 0

  waveManager = new WaveManager()
  player: Player
  playerOffsetHeight: number = 20
  playerBullets: Bullet[] = []
  bases: PlayerBase[] = []

  invaders: AbstractInvader[]
  invaderBullets: Bullet[] = []

  canvas: HTMLCanvasElement

  context2D: CanvasRenderingContext2D
  background = new Image()

  spaceColor: string = 'black'

  keyStatus = {}

  lastFrame: number = new Date().getTime()

  /**
   * Basically we figure out the best width for our canvas at start up.
   */
  constructor (hostElement: HTMLCanvasElement) {
    this.canvas = hostElement
    new Date().getTime()
    this.context2D = this.canvas.getContext('2d')
    this.canvas.width = Game.CANVAS_WIDTH
    this.canvas.height = this.canvas.width / Game.ASPECT_RATIO
    this.background.src = require('url-loader?limit=10000!./images/backgrounds/sunrise.jpg')

    // all keys are down to start
    for (let code in KEY_CODES) {
      this.keyStatus[KEY_CODES[code]] = false
    }

    this.initGame()
  }

  update () {
    let start = new Date().getTime()
    let elapsedTime: number = start - this.lastFrame

    // get the current time as seconds then multiple by the game speed to get a sensible number for multiplying velocities per frame
    let elapsedReduced: number = (elapsedTime / 1000.0) * GameSettings.GAME_SPEED

    this.drawBackground()

    switch (Game.gameState) {
      case INITIALISING:
        this.drawInit()
        return
      case YOU_WIN:
        this.drawYouWin()
        return
      case GAME_OVER:
        this.drawGameOver()
        return
    }

    // battle mode
    this.updatePlayer(elapsedReduced)
    this.updateEnemies(elapsedReduced)
    this.updateBullets(elapsedReduced)
    this.updateBases()
    this.handleCollisions()

    if (this.invaders.length === 0) {
      this.invaders = this.waveManager.getNextWave()
      if (!this.invaders) {
        Game.gameState = YOU_WIN
        return
      }
    }

    this.drawBattleScene()
    this.lastFrame = start
  }

  /**
   * We want equally spaced bases  like this:
   *
   *
   * |                                        |
   * |                                        |
   * |                                        |
   * |                                        |
   * |     ###           ###          ###     |
   * |                                        |
   * |                                        |
   * |                                        |
   *
   */
  createBases (noOfBases: number, containedWithinDimensions: Vector2, edgeSpace: number = 40) {
    let bases: PlayerBase[] = []// clear old one if there
    for (let i = 0; i < noOfBases; i++) {
      this.bases.push(new PlayerBase(containedWithinDimensions))
    }
    let freeSpace = Game.CANVAS_WIDTH - edgeSpace * 2 - noOfBases * this.bases[0].actualDimensions.x
    let spaceBetween = freeSpace / (noOfBases - 1)
    // assume that all bases are same size
    for (let i = 0; i < noOfBases; i++) {
      let nextPos: Vector2 = new Vector2(i * (this.bases[0].actualDimensions.x + spaceBetween) + edgeSpace, 500)
      this.bases[i].transform(nextPos)
    }
  }

  drawInit () {
    this.context2D.fillStyle = '#0FF'
    this.context2D.font = LARGE_FONT_SIZE + 'px Verdana'
    this.context2D.fillText('Loading..', 5, 25)
    Game.gameState = BATTLE_MODE
  }

  drawGameOver () {
    this.context2D.fillStyle = '#F00'
    this.context2D.font = LARGE_FONT_SIZE + 'px Verdana'
    this.context2D.fillText('Game over!', 5, 25)
  }

  drawYouWin () {
    this.context2D.fillStyle = '#FF0'
    this.context2D.font = LARGE_FONT_SIZE + 'px Verdana'
    this.context2D.fillText('YOU win!', 5, 25)
  }

  onKeyDown (evt) {
    this.keyStatus[evt.keyCode] = true
  }

  onKeyUp (evt) {
    this.keyStatus[evt.keyCode] = false
  }

  initGame () {
    // bottom middle
    this.player = new Player(new Vector2(Game.CANVAS_WIDTH / 2,
      this.canvas.height - this.playerOffsetHeight - Player.DEFAULT_HEIGHT))
    this.invaders = this.waveManager.getNextWave()
    this.createBases(3, new Vector2(100, 30))
  }

  /**
   * Remove scenery that has been hit
   */
  updateBases () {
    let self = this
    self.bases.forEach(function (base: PlayerBase) {
      base.allDestructibleScenery = base.allDestructibleScenery.filter(function (particle) {
        return particle.active
      })
    })
  }

  drawBackground () {
    this.context2D.fillStyle = this.spaceColor
    this.context2D.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT)
    this.context2D.drawImage(this.background, -200, 0)
  }

  drawScore () {
    this.context2D.fillStyle = '#0FF'
    this.context2D.font = MEDIUM_FONT_SIZE + 'px Verdana'
    this.context2D.fillText(`Score: ${Game.score}`, 2, 14)
    this.context2D.fillText(`Health: ${this.player.health}`, 2, Game.CANVAS_HEIGHT - 6)

  }

  drawBattleScene () {
    this.drawScore()

    let self = this
    this.invaders.forEach(function (thing: AbstractInvader) {
      thing.draw(self.context2D)
    })
    this.playerBullets.forEach(function (thing: Bullet) {
      thing.draw(self.context2D)
    })
    this.invaderBullets.forEach(function (thing: Bullet) {
      thing.draw(self.context2D)
    })
    this.bases.forEach(function (thing: PlayerBase) {
      thing.draw(self.context2D)
    })
    this.player.draw(this.context2D)
  }

  updatePlayer (elapsedTime: number) {
    if (this.keyStatus[KEY_CODES.LEFT]) {
      if (this.keyStatus[KEY_CODES.UP]) {
        this.player.updateDirection(new Vector2Normalised(degreesToRadians(305)))
      } else if (this.keyStatus[KEY_CODES.DOWN]) {
        this.player.updateDirection(new Vector2Normalised(degreesToRadians(225)))
      } else {
        this.player.updateDirection(new Vector2Normalised(degreesToRadians(270)))
      }
    } else if (this.keyStatus[KEY_CODES.RIGHT]) {
      if (this.keyStatus[KEY_CODES.UP]) {
        this.player.updateDirection(new Vector2Normalised(degreesToRadians(45)))
      } else if (this.keyStatus[KEY_CODES.DOWN]) {
        this.player.updateDirection(new Vector2Normalised(degreesToRadians(135)))
      } else {
        this.player.updateDirection(new Vector2Normalised(degreesToRadians(90)))
      }

    } else if (this.keyStatus[KEY_CODES.UP]) {
      this.player.updateDirection(new Vector2Normalised(degreesToRadians(0)))
    } else if (this.keyStatus[KEY_CODES.DOWN]) {
      this.player.updateDirection(new Vector2Normalised(degreesToRadians(180)))
    } else {
      this.player.remainStationary()
    }

    if (this.keyStatus[KEY_CODES.SPACE]) {
      let bullet = this.player.shootAhead()
      if (bullet) {
        this.playerBullets.push(bullet)
      }
    }

    this.player.update(elapsedTime)
    this.clamp(this.player)
  }

  ReverseEnemyDirectionIfOutOfBoundsAndDropDown (): void {
    let outOfBoundsBy = 0
    this.invaders.forEach(item => {
      if (item.position.x < 0) {
        outOfBoundsBy = item.position.x
        return
      } else if (item.position.x > (Game.CANVAS_WIDTH - item.dimensions.width)) {
        outOfBoundsBy = item.position.x - (Game.CANVAS_WIDTH - item.dimensions.width)
        return
      }
    })

    if (outOfBoundsBy === 0) {
      return
    }

    this.invaders.forEach(function (enemy: AbstractInvader) {
      // moving to the right
      enemy.position.x -= outOfBoundsBy
      enemy.reverse()
      enemy.position.y += 10
    })
  }

  updateEnemies (elapsedUnit: number) {
    let self = this

    self.invaders = self.invaders.filter(function (enemy) {
      return enemy.active
    })

    self.invaders.forEach(function (enemy: AbstractInvader) {
      enemy.update(elapsedUnit)// this might move things out of bounds so check next
      //  self.clamp(enemy)
    })

    self.ReverseEnemyDirectionIfOutOfBoundsAndDropDown()
    self.invaders.forEach(function (invader: AbstractInvader) {

      if (Math.random() < invader.probabilityOfShooting) {
        self.invaderBullets = self.invaderBullets.concat(invader.shootAhead())
      }
    })
  }

  updateBullets (elapsedUnit: number) {
    this.playerBullets = this.playerBullets.filter(function (bullet) {
      return bullet.active
    })
    this.playerBullets.forEach(function (bullet: Bullet) {
      bullet.update(elapsedUnit)
    })

    this.invaderBullets = this.invaderBullets.filter(function (bullet) {
      return bullet.active
    })
    this.invaderBullets.forEach(function (bullet: Bullet) {
      bullet.update(elapsedUnit)
    })

  }

  handleCollisions () {
    let self = this
    self.playerBullets.forEach(function (bullet: Bullet) {
        self.invaders.forEach(function (invader: AbstractInvader) {
          if (rectCollides(bullet, invader)) {
            invader.takeHit(bullet)
            bullet.active = false
          }
        })
        self.bases.forEach(function (base: PlayerBase) {

          base.allDestructibleScenery.forEach(function (particle: DestructibleScenery) {
            if (rectCollides(bullet, particle)) {
              particle.explode()
              bullet.active = false
            }
          })
        })

      }
    )

    self.invaderBullets.forEach(function (bullet: Bullet) {
      if (rectCollides(bullet, self.player)) {
        self.player.takeDamage(bullet)
        let postionCopy = JSON.parse(JSON.stringify(self.player.position))
        bullet.active = false
      }
      self.bases.forEach(function (base: PlayerBase) {
        base.allDestructibleScenery.forEach(function (particle: DestructibleScenery) {
          if (rectCollides(bullet, particle)) {
            particle.explode()
            bullet.active = false
          }
        })
      })
    })
  }

  gameOver () {
    alert('you lose!')
  }

  clamp (item: IGameObject) {
    if (item.position.x < 0) {
      item.position.x = 0
      return
    } else if (item.position.x > (Game.CANVAS_WIDTH - item.dimensions.width)) {
      item.position.x = Game.CANVAS_WIDTH - item.dimensions.width
      return
    } else if (item.position.y < 0) {
      item.position.y = 0
      return
    } else if (item.position.y > (Game.CANVAS_HEIGHT - item.dimensions.height)) {
      item.position.y = Game.CANVAS_HEIGHT - item.dimensions.height
      return
    }
  }
}
