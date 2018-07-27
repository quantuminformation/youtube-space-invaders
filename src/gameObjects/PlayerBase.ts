import { IGameObject } from './IGameObject'
import { Vector2, Dimensions2 } from '../util/Vectors'

export class DestructibleScenery implements IGameObject {

  static DEFAULT_SIZE: number = 5
  position: Vector2
  dimensions: Dimensions2 = new Dimensions2(DestructibleScenery.DEFAULT_SIZE, DestructibleScenery.DEFAULT_SIZE)
  color: string = '#0F9'
  active: boolean = true

  constructor (position) {
    this.position = position
  }

  draw (canvas: CanvasRenderingContext2D) {
    canvas.fillStyle = this.color
    if (this.active) {
      canvas.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
    }
  }

// tslint:disable-next-line
  update (elapsedUnit) {
  }

  explode () {
    this.active = false
    // todo boom graphic
  }
}

/**
 * The classic Green protective bases the player can hide behind
 */
export class PlayerBase {

  allDestructibleScenery: DestructibleScenery[] = []
  actualDimensions: Vector2

  constructor (public requestedDimensions: Vector2) {

    let numberPerRow = Math.floor(requestedDimensions.x / DestructibleScenery.DEFAULT_SIZE)
    let numberPerColumn = Math.floor(requestedDimensions.y / DestructibleScenery.DEFAULT_SIZE)

    this.actualDimensions = new Vector2(numberPerRow * DestructibleScenery.DEFAULT_SIZE,
      numberPerColumn * DestructibleScenery.DEFAULT_SIZE)

    let nextPosition
    // just rectangular bases to start with
    // todo mask values to give shapes like the original space invaders bases
    for (let i = 0; i < numberPerRow; i++) {
      nextPosition = new Vector2(DestructibleScenery.DEFAULT_SIZE * i, 0)
      for (let j = 0; j < numberPerColumn; j++) {
        nextPosition = nextPosition.addTwo(
          0,
          DestructibleScenery.DEFAULT_SIZE)
        this.allDestructibleScenery.push(new DestructibleScenery(nextPosition))
      }
    }
  }

  draw (canvas: CanvasRenderingContext2D) {
    this.allDestructibleScenery.forEach((item: DestructibleScenery) => {
      item.draw(canvas)
    })
  }

  transform (position: Vector2) {
    this.allDestructibleScenery.forEach(function (item: DestructibleScenery) {
      item.position = item.position.add(position)
    })
  }

}
