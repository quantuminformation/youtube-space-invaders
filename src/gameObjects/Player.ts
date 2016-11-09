import {IGameObject} from "./IGameObject"
import {Vector2, Dimensions2, Vector2Normalised} from "../util/Vectors"
import {Bullet, BasicBullet} from "./Bullets";
import {MEDIUM_MOVEMENT_SPEED} from "../constants/GameSettings";
import {GAME_OVER} from "../constants/GameStates";
import {Game} from "../Game";
//import foo from 'file!../images/player.svg! ';


//import fileContent from 'raw!./file.txt'

export class Player implements IGameObject {

  color: string = "#0FF"

  position: Vector2
  dimensions: Dimensions2 = new Dimensions2(Player.DEFAULT_WIDTH, Player.DEFAULT_HEIGHT)
  private directionVector: Vector2 = new Vector2(0, 0)

  static DEFAULT_HEIGHT: number = 30
  static DEFAULT_WIDTH: number = 60
  health: number = 3
  lastShotTime: number = 0

  fireRatePerSec = 4

  constructor(position) {
    this.position = position
  }

  draw(context2D: CanvasRenderingContext2D) {
    context2D.drawImage(img, this.position.x, this.position.y);
  }

  update(elapsedUnit) {
    this.position.x += this.directionVector.x * elapsedUnit * MEDIUM_MOVEMENT_SPEED
    this.position.y += this.directionVector.y * elapsedUnit * MEDIUM_MOVEMENT_SPEED
  }

  midpoint() {
    return new Vector2(this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height / 2)
  }

  explode() {
    Game.gameState = GAME_OVER
    var myAudio = document.createElement("audio");

    //myAudio.src = require('file?name=playerExplosion.mp3!../audio/playerExplosion.mp3')

    //todo
    //myAudio.play();
  }

  shootAhead(): Bullet {
    // todo Sound.play("shoot");
    let timeDifference = new Date().getTime() - this.lastShotTime
    if (timeDifference > (1000 / this.fireRatePerSec)) {
      this.lastShotTime = new Date().getTime()
      return new BasicBullet(this.midpoint(), new Vector2Normalised(0))
    } else {
      return null
    }
  }

  updateDirection(directionVector: Vector2Normalised) {
    this.directionVector = directionVector
  }

  remainStationary() {
    this.directionVector.x = 0
    this.directionVector.y = 0
  }

  takeDamage(bullet: Bullet) {
    this.health -= bullet.damageInflicted;
    if (this.health <= 0) {
      this.explode();
    }
  }
}

var img = new Image();
img.src = require('file?name=player.svg!../images/player.svg')





