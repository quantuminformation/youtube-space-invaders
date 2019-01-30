import * as GameSettings from './constants/GameSettings'
import { BATTLE_MODE, GAME_OVER, INITIALISING, YOU_WIN } from './constants/GameStates'
import { KEY_CODES } from './constants/KeyCodes'
import { AbstractInvader } from './gameObjects/AbstractInvader'
import { Bullet } from './gameObjects/Bullets'
import { IGameObject } from './gameObjects/IGameObject'
import { Player } from './gameObjects/Player'
import { DestructibleScenery, PlayerBase } from './gameObjects/PlayerBase'
import { WaveManager } from './story/WaveManager'
import { Interpreter } from './agent/Interpreter'
import { rectCollides } from './util/CollisionDetection'
import { degreesToRadians } from './util/Conversions'
import { Vector2, Vector2Normalised } from './util/Vectors'

//import sunrise from './images/backgrounds/sunrise.jpg'
//let sunrise = require('./images/backgrounds/sunrise.jpg')

export enum Actions {
  MOVE_UP = 'MOVE_UP',
  MOVE_RIGHT = 'MOVE_RIGHT',
  MOVE_DOWN = 'MOVE_DOWN',
  MOVE_LEFT = 'MOVE_LEFT',
  SHOOT = 'SHOOT'
}

export class SpaceInvaders {
  public static ASPECT_RATIO: number = 1 // keep it square for now
  public static CANVAS_WIDTH: number = 600
  public static CANVAS_HEIGHT: number = SpaceInvaders.CANVAS_WIDTH / SpaceInvaders.ASPECT_RATIO

  static gameState = INITIALISING
  static score: number = 0
  static elapsedTime: number = 0
  static gameNumber: number = 0

  private waveManager = new WaveManager()
  private player: Player
  private playerOffsetHeight: number = 20
  private playerBullets: Bullet[] = []
  private bases: PlayerBase[] = []

  private invaders: AbstractInvader[]
  private invaderBullets: Bullet[] = []

  private canvas: HTMLCanvasElement

  private context2D: CanvasRenderingContext2D
  // private background = new Image() remove for now as ai agent needs as simple as possible

  private spaceColor: string = 'black'

  private keyStatus = {}
  private ActionsOnce = {} //only runs 1 frame

  private lastFrame: number = new Date().getTime()

  /**
   * Basically we figure out the best width for our canvas at start up.
   */
  constructor(hostElement: HTMLCanvasElement) {
    this.canvas = hostElement
    new Date().getTime()
    this.context2D = this.canvas.getContext('2d')
    this.canvas.width = SpaceInvaders.CANVAS_WIDTH
    this.canvas.height = this.canvas.width / SpaceInvaders.ASPECT_RATIO
    //this.background.src = sunrise

    // all keys are down to start
    for (const code in KEY_CODES) {
      if (KEY_CODES.hasOwnProperty(code)) {
        this.keyStatus[KEY_CODES[code]] = false
      }
    }

    this.initGame()
    this.addExternalEvents()
  }


  /**
   * This is for external egents to hook into the game to control it, instead of the default keyboard commands like up down shoot
   */
  private addExternalEvents() {
    document.body.addEventListener(Actions.MOVE_LEFT, () => {
      this.ActionsOnce[Actions.MOVE_LEFT] = true
    })
    document.body.addEventListener(Actions.MOVE_RIGHT, () => {
      this.ActionsOnce[Actions.MOVE_RIGHT] = true
    })
    document.body.addEventListener(Actions.MOVE_UP, () => {
      this.ActionsOnce[Actions.MOVE_UP] = true
    })
    document.body.addEventListener(Actions.MOVE_DOWN, () => {
      this.ActionsOnce[Actions.MOVE_DOWN] = true
    })
	document.body.addEventListener(Actions.SHOOT, () => {
      this.ActionsOnce[Actions.SHOOT] = true
    })
  }

  public update() {
    const startTime = new Date().getTime()
    SpaceInvaders.elapsedTime = startTime - this.lastFrame

    // get the current time as seconds then multiple by the game speed to get a sensible number for multiplying velocities per frame
    const elapsedReduced: number = (SpaceInvaders.elapsedTime / 1000.0) * GameSettings.GAME_SPEED

    this.drawBackground()

    switch (SpaceInvaders.gameState) {
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
        SpaceInvaders.gameState = YOU_WIN
        return
      }
    }

    this.drawBattleScene()
    this.lastFrame = startTime
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
  public createBases(
    noOfBases: number,
    containedWithinDimensions: Vector2,
    edgeSpace: number = 40
  ) {
    const bases: PlayerBase[] = [] // clear old one if there
    for (let i = 0; i < noOfBases; i++) {
      this.bases.push(new PlayerBase(containedWithinDimensions))
    }
    const freeSpace =
      SpaceInvaders.CANVAS_WIDTH - edgeSpace * 2 - noOfBases * this.bases[0].actualDimensions.x
    const spaceBetween = freeSpace / (noOfBases - 1)
    // assume that all bases are same size
    for (let i = 0; i < noOfBases; i++) {
      const nextPos: Vector2 = new Vector2(
        i * (this.bases[0].actualDimensions.x + spaceBetween) + edgeSpace,
        500
      )
      this.bases[i].transform(nextPos)
    }
  }

  public drawInit() {
    this.context2D.fillStyle = '#0FF'
    this.context2D.font = GameSettings.LARGE_FONT_SIZE + 'px Verdana'
    this.context2D.fillText('Loading..', 5, 25)
    SpaceInvaders.gameState = BATTLE_MODE
  }

  public drawGameOver() {
    this.context2D.fillStyle = '#F00'
    this.context2D.font = GameSettings.LARGE_FONT_SIZE + 'px Verdana'
    this.context2D.fillText('SpaceInvaders over!', 5, 25)
  }

  public drawYouWin() {
    this.context2D.fillStyle = '#FF0'
    this.context2D.font = GameSettings.LARGE_FONT_SIZE + 'px Verdana'
    this.context2D.fillText('YOU win!', 5, 25)
  }

  public onKeyDown(evt) {
    this.keyStatus[evt.keyCode] = true
  }

  public onKeyUp(evt) {
    this.keyStatus[evt.keyCode] = false
  }

  public initGame() {
    // bottom middle
    this.player = new Player(
      new Vector2(
        SpaceInvaders.CANVAS_WIDTH / 2,
        this.canvas.height - this.playerOffsetHeight - Player.DEFAULT_HEIGHT
      )
    )
    this.invaders = this.waveManager.getNextWave()
    this.createBases(3, new Vector2(100, 30))
  }

  /**
   * Remove scenery that has been hit
   */
  public updateBases() {
    this.bases.forEach((base: PlayerBase) => {
      base.allDestructibleScenery = base.allDestructibleScenery.filter(particle => {
        return particle.active
      })
    })
  }

  public drawBackground() {
    this.context2D.fillStyle = this.spaceColor
    this.context2D.fillRect(0, 0, SpaceInvaders.CANVAS_WIDTH, SpaceInvaders.CANVAS_HEIGHT)
  }

  public drawScore() {
    this.context2D.fillStyle = '#0FF'
    this.context2D.font = GameSettings.MEDIUM_FONT_SIZE + 'px Verdana'
    this.context2D.fillText(`Score: ${SpaceInvaders.score}`, 2, 14)
    this.context2D.fillText(`Health: ${this.player.health}`, 2, SpaceInvaders.CANVAS_HEIGHT - 6)
  }

  public drawBattleScene() {
    this.drawScore()

    this.invaders.forEach((thing: AbstractInvader) => {
      thing.draw(this.context2D)
    })
    this.playerBullets.forEach((thing: Bullet) => {
      thing.draw(this.context2D)
    })
    this.invaderBullets.forEach((thing: Bullet) => {
      thing.draw(this.context2D)
    })
    this.bases.forEach((thing: PlayerBase) => {
      thing.draw(this.context2D)
    })
    this.player.draw(this.context2D)
  }

  /**
   * listens to both manual mode and agent mode at the same time
   * Manual commands always overwrite the agent
   * In manual mode the app listens to keyboard presses and agent mode to actions via dom events (see index.ts)
   * @param elapsedTime
   */
  public updatePlayer(elapsedTime: number) {
    //  listen to agent events

    if (this.ActionsOnce[Actions.MOVE_LEFT] === true) {
      this.player.updateDirection(new Vector2Normalised(degreesToRadians(270)), true)
    } else if (this.ActionsOnce[Actions.MOVE_RIGHT] === true) {
      this.player.updateDirection(new Vector2Normalised(degreesToRadians(90)), true)
    } else if (this.ActionsOnce[Actions.MOVE_UP] === true) {
      this.player.updateDirection(new Vector2Normalised(degreesToRadians(0)), true)
    } else if (this.ActionsOnce[Actions.MOVE_DOWN] === true) {
      this.player.updateDirection(new Vector2Normalised(degreesToRadians(180)), true)
    } else if (this.ActionsOnce[Actions.SHOOT] === true) {
	  const bullet = this.player.shootAhead()
	  if (bullet) {
	    this.playerBullets.push(bullet)
	  }
	}

    // listen to user keyboard (overrides the agent if it sets somethings)
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
      // this cancels the movement of any manual input if non of the flags are set, we don't do it if agent moved
      if (
        Object.entries(this.ActionsOnce).length === 0 &&
        this.ActionsOnce.constructor === Object
      ) {
        this.player.remainStationary()
      }
    }

    if (this.keyStatus[KEY_CODES.SPACE]) {
      const bullet = this.player.shootAhead()
      if (bullet) {
        this.playerBullets.push(bullet)
      }
    }

    /* if (this.isAgentMode) {
       // reset states
       this.keyStatus[KEY_CODES.LEFT] = false
       this.keyStatus[KEY_CODES.RIGHT] = false
       this.keyStatus[KEY_CODES.UP] = false
       this.keyStatus[KEY_CODES.DOWN] = false
     }*/

    this.player.update(elapsedTime)
    this.clamp(this.player)

    //clear any actions
    this.ActionsOnce = {}
  }

  public ReverseEnemyDirectionIfOutOfBoundsAndDropDown(): void {
    let outOfBoundsBy = 0
    this.invaders.forEach(item => {
      if (item.position.x < 0) {
        outOfBoundsBy = item.position.x
        return
      } else if (item.position.x > SpaceInvaders.CANVAS_WIDTH - item.dimensions.width) {
        outOfBoundsBy = item.position.x - (SpaceInvaders.CANVAS_WIDTH - item.dimensions.width)
        return
      }
    })

    if (outOfBoundsBy === 0) {
      return
    }

    this.invaders.forEach((enemy: AbstractInvader) => {
      // moving to the right
      enemy.position.x -= outOfBoundsBy
      enemy.reverse()
      enemy.position.y += 10
    })
  }

  public updateEnemies(elapsedUnit: number) {
    this.invaders = this.invaders.filter(enemy => {
      return enemy.active
    })

    this.invaders.forEach((enemy: AbstractInvader) => {
      enemy.update(elapsedUnit) // this might move things out of bounds so check next
      //  self.clamp(enemy)
    })

    this.ReverseEnemyDirectionIfOutOfBoundsAndDropDown()
    this.invaders.forEach((invader: AbstractInvader) => {
      if (Math.random() < invader.probabilityOfShooting) {
        this.invaderBullets = this.invaderBullets.concat(invader.shootAhead())
      }
    })
  }

  public updateBullets(elapsedUnit: number) {
    this.playerBullets = this.playerBullets.filter(bullet => {
      return bullet.active
    })
    this.playerBullets.forEach((bullet: Bullet) => {
      bullet.update(elapsedUnit)
    })

    this.invaderBullets = this.invaderBullets.filter(bullet => {
      return bullet.active
    })
    this.invaderBullets.forEach((bullet: Bullet) => {
      bullet.update(elapsedUnit)
    })
  }

  public handleCollisions() {
    this.playerBullets.forEach((bullet: Bullet) => {
      this.invaders.forEach((invader: AbstractInvader) => {
        if (rectCollides(bullet, invader)) {
          invader.takeHit(bullet)
          bullet.active = false
        }
      })
      this.bases.forEach((base: PlayerBase) => {
        base.allDestructibleScenery.forEach((particle: DestructibleScenery) => {
          if (rectCollides(bullet, particle)) {
            particle.explode()
            bullet.active = false
          }
        })
      })
    })

    this.invaderBullets.forEach((bullet: Bullet) => {
      if (rectCollides(bullet, this.player)) {
        this.player.takeDamage(bullet)
        const positionCopy = JSON.parse(JSON.stringify(this.player.position))
        bullet.active = false
      }
      this.bases.forEach((base: PlayerBase) => {
        base.allDestructibleScenery.forEach((particle: DestructibleScenery) => {
          if (rectCollides(bullet, particle)) {
            particle.explode()
            bullet.active = false
          }
        })
      })
    })
  }

  public gameOver() {
    alert('you lose!')
  }

  public clamp(item: IGameObject) {
    if (item.position.x < 0) {
      item.position.x = 0
      return
    } else if (item.position.x > SpaceInvaders.CANVAS_WIDTH - item.dimensions.width) {
      item.position.x = SpaceInvaders.CANVAS_WIDTH - item.dimensions.width
      return
    } else if (item.position.y < 0) {
      item.position.y = 0
      return
    } else if (item.position.y > SpaceInvaders.CANVAS_HEIGHT - item.dimensions.height) {
      item.position.y = SpaceInvaders.CANVAS_HEIGHT - item.dimensions.height
      return
    }
  }

  // public resetGame() {
  //   SpaceInvaders.gameState = INITIALISING
  //   this.waveManager = new WaveManager()
  // }
}
