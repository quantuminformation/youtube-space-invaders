import {Player} from "./gameObjects/Player"
import {Vector2} from "./util/Math"
import {GAME_DEFAULTS, KEYS} from "./Common"
import {Invader} from "./gameObjects/Invaders";
import Waves from "./Waves"

export class Game {
  static ASPECT_RATIO: number = 1 // keep it square for now
  static CANVAS_WIDTH: number = 600
  static CANVAS_HEIGHT: number = Game.CANVAS_WIDTH / Game.ASPECT_RATIO


  player: Player
  playerOffsetHeight: number = 20

  invaders: Array <Invader>

  canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas')

  context2D: CanvasRenderingContext2D

  spaceColor: string = "black"

  //for the key events
  rightDown: boolean = false
  leftDown: boolean = false
  upDown: boolean = false
  downDown: boolean = false
  space: boolean = false

  lastFrame: number = this.timestamp() //init to current time

  update() {
    let start = this.timestamp()
    let elapsedTime: number = start - this.lastFrame

    // get the current time as seconds then multiple by the game speed to get a sensible number for multiplying velocities per frame
    let elapsedReduced: number = (elapsedTime / 1000.0) * GAME_DEFAULTS.GAME_SPEED

    this.updatePlayer(elapsedReduced)
    this.updateEnemies(elapsedReduced);
    this.draw()

    this.lastFrame = start
  }

  timestamp(): number {
    return new Date().getTime()
  }

  /**
   * Basically we figure out the best width for our canvas at start up.
   */
  constructor() {
    this.context2D = this.canvas.getContext("2d")
    this.canvas.width = Game.CANVAS_WIDTH
    this.canvas.height = this.canvas.width / Game.ASPECT_RATIO

    this.initGame()
  }

  onKeyDown(evt) {
    if (evt.keyCode == KEYS.RIGHT) this.rightDown = true
    else if (evt.keyCode == KEYS.LEFT) this.leftDown = true
    else if (evt.keyCode == KEYS.UP) this.upDown = true
    else if (evt.keyCode == KEYS.DOWN) this.downDown = true
  }

  onKeyUp(evt) {
    if (evt.keyCode == KEYS.RIGHT) this.rightDown = false
    if (evt.keyCode == KEYS.LEFT) this.leftDown = false
    if (evt.keyCode == KEYS.UP) this.upDown = false
    if (evt.keyCode == KEYS.DOWN) this.downDown = false
    if (evt.keyCode == KEYS.SPACE) this.space = false
  }

  initGame() {
    //bottom middle
    this.player = new Player(new Vector2(Game.CANVAS_WIDTH / 2,
      this.canvas.height - this.playerOffsetHeight - Player.DEFAULT_HEIGHT))
    this.nextWave();
  }

  drawBackground() {
    let self = this
    self.context2D.fillStyle = self.spaceColor
    self.context2D.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT)
  }

  draw() {
    this.drawBackground()
    this.player.draw(this.context2D)

    let self = this;
    this.invaders.forEach(function (item:Invader) {
      item.draw(self.context2D);
    });
  }


  updatePlayer(elapsedTime: number) {
    if (this.leftDown) {
      this.player.movmentVector.x = -this.player.DefaultMovementSpeed
    }
    else if (this.rightDown) {
      this.player.movmentVector.x = this.player.DefaultMovementSpeed
    }
    else {
      this.player.movmentVector.x = 0
    }
    this.player.update(elapsedTime)
    this.player.clamp(Game.CANVAS_WIDTH, this.canvas.height)
  }


  ReverseEnemyDirectionIfOutOfBoundsAndDropDown(): boolean {
    let offset = 0;
    for (var i = 0; i < this.invaders.length; i++) {
      if (this.invaders[i].position.x < 0) {
        offset = this.invaders[i].position.x;
        break;
      }
      else if (this.invaders[i].position.x > (Game.CANVAS_WIDTH - this.invaders[i].dimensions.width)) {
        offset = this.invaders[i].position.x - (Game.CANVAS_WIDTH - this.invaders[i].dimensions.width);
        break;
      }
    }
    if (offset === 0) {
      return;
    }

    this.invaders.forEach(function (enemy: Invader) {
      //moving to the right
      enemy.movmentVector.x = enemy.movmentVector.x * -1;
      enemy.position.x += offset * -1;
      //   enemy.position.y += enemy.dimensions.height;
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
    });

    self.ReverseEnemyDirectionIfOutOfBoundsAndDropDown();
  }

  nextWave() {
    this.invaders = Waves.shift()();
    if (!this.invaders) {
      alert("You win!! Well done.");
    }
  }
}
