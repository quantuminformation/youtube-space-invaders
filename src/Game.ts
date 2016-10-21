import {Player} from "./gameObjects/Player"
import {Vector2, Vector2Normalised} from "./util/Math"
import {KEY_CODES} from "./constants/Keycodes"
import * as GameSettings from "./constants/GameSettings"
import {GAME_OVER, INITIALISING, BATTLE_MODE, YOU_WIN} from "./constants/GameStates"
import {Invader} from "./gameObjects/Invaders"
import {BasicBullet, Bullet} from "./gameObjects/Bullets"
import Waves from "./Waves"
import {rectCollides} from "./util/CollisionDetection";
import {IGameObject} from "./gameObjects/IGameObject";
import {LARGE_FONT_SIZE} from "./constants/GameSettings";
import {MEDIUM_FONT_SIZE} from "./constants/GameSettings";

export class Game {
  static ASPECT_RATIO: number = 1 // keep it square for now
  static CANVAS_WIDTH: number = 600
  static CANVAS_HEIGHT: number = Game.CANVAS_WIDTH / Game.ASPECT_RATIO


  static gameState = INITIALISING
  static score: number = 0

  player: Player
  playerOffsetHeight: number = 20
  playerBullets: Array<Bullet> = [];

  invaders: Array <Invader>
  invaderBullets: Array<Bullet> = [];


  canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas')

  context2D: CanvasRenderingContext2D

  spaceColor: string = "black"

  keyStatus = {}

  lastFrame: number = new Date().getTime()

  /**
   * Basically we figure out the best width for our canvas at start up.
   */
  constructor() {
    new Date().getTime()
    this.context2D = this.canvas.getContext("2d")
    this.canvas.width = Game.CANVAS_WIDTH
    this.canvas.height = this.canvas.width / Game.ASPECT_RATIO

    //all keys are down to start
    for (let code in KEY_CODES) {
      this.keyStatus[KEY_CODES[code]] = false
    }

    this.initGame()
  }


  update() {
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

    //battle mode
    this.updatePlayer(elapsedReduced)
    this.updateEnemies(elapsedReduced);
    this.updateBullets(elapsedReduced);
    this.handleCollisions();

    if (this.invaders.length === 0) {
      Game.gameState = YOU_WIN
    }

    this.drawBattleScene()

    this.lastFrame = start
  }


  drawInit() {
    this.context2D.fillStyle = '#0FF';
    this.context2D.font = LARGE_FONT_SIZE + "px Verdana";
    this.context2D.fillText("Loading..", 5, 25);
    Game.gameState = BATTLE_MODE
  }

  drawGameOver() {
    this.context2D.fillStyle = '#F00';
    this.context2D.font = LARGE_FONT_SIZE + "px Verdana";
    this.context2D.fillText("Game over!", 5, 25);
  }
  drawYouWin() {
    this.context2D.fillStyle = '#FF0';
    this.context2D.font = LARGE_FONT_SIZE + "px Verdana";
    this.context2D.fillText("YOU win!", 5, 25);
  }

  onKeyDown(evt) {
    this.keyStatus[evt.keyCode] = true
  }

  onKeyUp(evt) {
    this.keyStatus[evt.keyCode] = false
  }

  initGame() {
    //bottom middle
    this.player = new Player(new Vector2(Game.CANVAS_WIDTH / 2,
      this.canvas.height - this.playerOffsetHeight - Player.DEFAULT_HEIGHT))
    this.nextWave();
  }

  drawBackground() {
    this.context2D.fillStyle = this.spaceColor
    this.context2D.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT)
  }

  drawScore() {
    this.context2D.fillStyle = '#0FF';
    this.context2D.font = MEDIUM_FONT_SIZE + "px Verdana";
    this.context2D.fillText(`Score: ${Game.score}`, 2, 14);
    this.context2D.fillText(`Health: ${this.player.health}`, 2, Game.CANVAS_HEIGHT - 6);

  }

  drawBattleScene() {
    this.drawScore()
    this.player.draw(this.context2D)

    let self = this;
    this.invaders.forEach(function (thing: Invader) {
      thing.draw(self.context2D);
    });
    this.playerBullets.forEach(function (thing: Bullet) {
      thing.draw(self.context2D);
    });
    this.invaderBullets.forEach(function (thing: Bullet) {
      thing.draw(self.context2D);
    });
  }


  updatePlayer(elapsedTime: number) {
    if (this.keyStatus[KEY_CODES.LEFT]) {
      this.player.updateDirection(new Vector2Normalised(270))
    }
    else if (this.keyStatus[KEY_CODES.RIGHT]) {
      this.player.updateDirection(new Vector2Normalised(90))
    }
    else {
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


  ReverseEnemyDirectionIfOutOfBoundsAndDropDown(): void {
    let outOfBoundsBy = 0
    this.invaders.forEach(item=> {
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

    this.invaders.forEach(function (enemy: Invader) {
      //moving to the right
      enemy.position.x -= outOfBoundsBy
      enemy.reverse()
      enemy.position.y += 10;
    });
  }

  updateEnemies(elapsedUnit: number) {
    let self = this;

    self.invaders = self.invaders.filter(function (enemy) {
      return enemy.active;
    });

    self.invaders.forEach(function (enemy: Invader) {
      enemy.update(elapsedUnit);// this might move things out of bounds so check next
      //  self.clamp(enemy)
    });

    self.ReverseEnemyDirectionIfOutOfBoundsAndDropDown();
    self.invaders.forEach(function (invader: Invader) {

      if (Math.random() < invader.probabilityOfShooting) {
        var fire = invader.shootAhead();
        if (fire.hasOwnProperty("length")) {
          self.invaderBullets = self.invaderBullets.concat(fire);
        } else {
          self.invaderBullets.push(fire);
        }
      }
    });
  }


  updateBullets(elapsedUnit: number) {
    this.playerBullets = this.playerBullets.filter(function (bullet) {
      return bullet.active;
    });
    this.playerBullets.forEach(function (bullet: Bullet) {
      bullet.update(elapsedUnit);
    });

    this.invaderBullets = this.invaderBullets.filter(function (bullet) {
      return bullet.active;
    });
    this.invaderBullets.forEach(function (bullet: Bullet) {
      bullet.update(elapsedUnit);
    });

  }

  nextWave() {
    this.invaders = Waves.shift()();
    if (!this.invaders) {
      Game.gameState = YOU_WIN
    }
  }


  handleCollisions() {
    var self = this;
    self.playerBullets.forEach(function (bullet: Bullet) {
        self.invaders.forEach(function (invader: Invader) {
          if (rectCollides(bullet, invader)) {
            invader.takeHit(bullet);
            bullet.active = false;
          }
        });
      }
    );

    self.invaderBullets.forEach(function (bullet: Bullet) {
      if (rectCollides(bullet, self.player)) {
        self.player.takeDamage(bullet);
        var postionCopy = JSON.parse(JSON.stringify(self.player.position))
        bullet.active = false;
      }
    });
  }

  gameOver() {
    alert("you lose!")
  }


  clamp(item: IGameObject) {
    if (item.position.x < 0) {
      item.position.x = 0
      return
    }
    else if (item.position.x > (Game.CANVAS_WIDTH - item.dimensions.width)) {
      item.position.x = Game.CANVAS_WIDTH - item.dimensions.width
      return
    }
    else if (item.position.y < 0) {
      item.position.y = 0
      return
    }
    else if (item.position.y > (Game.CANVAS_HEIGHT - item.dimensions.height)) {
      item.position.y = Game.CANVAS_HEIGHT - item.dimensions.height
      return
    }
  }
}
