import {Vector2, Dimensions2, Vector2Normalised} from "../util/Math"
import {IGameObject} from "./IGameObject"
import {Bullet, BasicBullet} from "./Bullets"
import {MEDIUM_MOVEMENT_SPEED, SLOW_MOVEMENT_SPEED, VERY_SLOW_MOVEMENT_SPEED} from "../constants/GameSettings"
import {Game} from "../Game";

export abstract class Invader implements IGameObject {
  health: number

  static DEFAULT_HEIGHT: number = 20
  static DEFAULT_WIDTH: number = 30

  dimensions: Dimensions2 = new Dimensions2(Invader.DEFAULT_WIDTH, Invader.DEFAULT_HEIGHT)
  private directionVector: Vector2 = new Vector2(0, 0)

  active: boolean = true
  probabilityOfShooting: number = 0.0005 // on each game frame

  BasicColor: string
  pointsValue:number

  constructor(public position:Vector2) {
  }

  draw(canvas: CanvasRenderingContext2D) {
    canvas.fillStyle = this.BasicColor
    canvas.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
  }

  midpoint() {
    return new Vector2(this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height / 2)
  }

  explode() {
    this.active = false
    Game.score += this.pointsValue
    // todo boom graphic
  }
  reverse() {
    this.directionVector.x =  -this.directionVector.x
    this.directionVector.y =  -this.directionVector.y
    // todo boom graphic
  }

  updateDirection(directionVector:Vector2Normalised){
    this.directionVector = directionVector
  }

  update(elapsedUnit) {
    this.position.x += this.directionVector.x * elapsedUnit * VERY_SLOW_MOVEMENT_SPEED
  }

  shootAhead() {
    // todo Sound.play("shoot")
    return new BasicBullet(this.midpoint(), new Vector2(0, 1))
  }
  takeHit(bullet:Bullet) {
    this.health -= bullet.damageInflicted
    if (this.health <= 0) {
      this.explode()
    }
  }
}

export class LightInvader extends Invader {

  constructor(position: Vector2) {
    super(position)
    this.BasicColor = "#0F9"
    this.probabilityOfShooting = 0.001
    this.health = 1
    this.pointsValue = 10
  }

}
