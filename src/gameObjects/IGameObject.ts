import { Dimensions2, Vector2 } from '../util/Vectors'

export interface IGameObject {
  dimensions: Dimensions2
  position: Vector2
  draw (canvas: CanvasRenderingContext2D)
  update (elapsedUnit: number)
}
