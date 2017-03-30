import { Vector2, Dimensions2, Vector2Normalised } from '../util/Vectors'
import { IGameObject } from './IGameObject'
import { Bullet, BasicBullet } from './Bullets'
import * as GameSettings from '../constants/GameSettings'
import { Game } from '../Game'
import { rotateAndPaintImage } from '../util/Canvas2D_tools'

export abstract class AbstractInvader implements IGameObject {

  static DEFAULT_HEIGHT: number = 20
  static DEFAULT_WIDTH: number = 30
  health: number = 1

  dimensions: Dimensions2 = new Dimensions2(AbstractInvader.DEFAULT_WIDTH, AbstractInvader.DEFAULT_HEIGHT)

  active: boolean = true
  probabilityOfShooting: number = 0.0005 // on each game frame
  rotationInDegrees: number = 180 // todo this will change

  image: any = new Image()
  BasicColor: string
  pointsValue: number
  protected directionVector: Vector2 = new Vector2(0, 0)
  protected facingAngleRad: number = Math.PI // pointing down for now

  constructor (public position: Vector2) {
  }

  draw (ctx: CanvasRenderingContext2D) {
    rotateAndPaintImage(ctx, this.image, 180, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
  }

  midpoint () {
    return new Vector2(this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height / 2)
  }

  explode () {
    this.active = false
    Game.score += this.pointsValue
    // todo boom graphic
  }

  reverse () {
    this.directionVector.x = -this.directionVector.x
    this.directionVector.y = -this.directionVector.y
    // todo boom graphic
  }

  updateDirection (directionVector: Vector2Normalised) {
    this.directionVector = directionVector
  }

  update (elapsedUnit) {
    this.position.x += this.directionVector.x * elapsedUnit * GameSettings.VERY_SLOW_MOVEMENT_SPEED
  }

  shootAhead (): Array<Bullet> {
    // todo Sound.play('shoot')
    return [new BasicBullet(this.midpoint(), new Vector2(0, 1))]
  }

  takeHit (bullet: Bullet) {
    this.health -= bullet.damageInflicted
    if (this.health <= 0) {
      this.explode()
    }
  }
}
