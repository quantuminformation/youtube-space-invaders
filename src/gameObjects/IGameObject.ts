import {Dimensions2,Vector2} from '../util/Vectors'

export interface IGameObject {
  draw(canvas: CanvasRenderingContext2D)
  update(elapsedUnit: number)
  position: Vector2
  dimensions: Dimensions2
}
