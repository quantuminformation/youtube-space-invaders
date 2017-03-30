import { Game } from '../Game'
import { Vector2, Dimensions2, Vector2Normalised } from '../util/Vectors'
import { IGameObject } from './IGameObject'
import * as GameSettings from '../constants/GameSettings'

export abstract class Bullet implements IGameObject {

  static SMALL_SIZE: number = 3
  static LARGE_SIZE: number = 9

  color: any

  dimensions: Dimensions2
  damageInflicted: number
  active: boolean = true
  protected directionVector: Vector2Normalised

  constructor (public position: Vector2, directionVector: Vector2Normalised) {
    this.directionVector = directionVector
  }

  inBounds () {
    return this.position.x >= 0 && (this.position.x - this.dimensions.width <= Game.CANVAS_WIDTH ) &&
      this.position.y >= 0 && (this.position.y - this.dimensions.height <= Game.CANVAS_HEIGHT)
  }

  // tslint:disable-next-line
  draw (canvas: CanvasRenderingContext2D) {
  }

// tslint:disable-next-line
  update (elapsedUnit) {
  }
}

export class BasicBullet extends Bullet {
  constructor (public position: Vector2, directionVector: Vector2Normalised) {
    super(position, directionVector)
    this.dimensions = new Dimensions2(Bullet.SMALL_SIZE, Bullet.SMALL_SIZE)
    this.color = 'white'
    this.damageInflicted = 1
  }

  draw (canvas: CanvasRenderingContext2D) {
    canvas.fillStyle = this.color
    canvas.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
  }

  update (elapsedUnit) {
    this.position.x += this.directionVector.x * elapsedUnit * GameSettings.MEDIUM_MOVEMENT_SPEED
    this.position.y += this.directionVector.y * elapsedUnit * GameSettings.MEDIUM_MOVEMENT_SPEED
    this.active = this.active && this.inBounds()
  }

}
