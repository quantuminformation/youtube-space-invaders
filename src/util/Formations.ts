import { IGameObject } from '../gameObjects/IGameObject'
import { isSquare } from './MathChecks'
import { Vector2 } from './Vectors'

/**
 * modifys an array of objects so their position is in a triangle
 *
 * let row number = n
 * each row contains (n*2)-1
 *
 * total rows = n^2
 * must be a perfect square of units
 * we render each unit from the bottom left
 *
 * looks like:
 *     1
 *    111
 *   11111
 *  1111111
 *
 * @param gameObjects
 */
export function triangle(
  gameObjects: Array<IGameObject>,
  horizontalGap: number,
  verticalGap: number
): void {
  if (!isSquare(gameObjects.length)) {
    throw new Error('needs perfect square number of units')
  }
  let numberOfRows = Math.sqrt(gameObjects.length)

  let nextRowOffset = new Vector2(0, 0)
  let thisRowStartingIndex = 0

  for (let i = numberOfRows; i >= 1; i--) {
    let numberOnThisRow = i * 2 - 1
    let maxHeight: number = 0
    for (let j = 0; j < numberOnThisRow; j++) {
      let go = gameObjects[thisRowStartingIndex + j]
      if (go.dimensions.height > maxHeight) {
        maxHeight = go.dimensions.height
      }
      go.position = new Vector2(
        j * (go.dimensions.width + horizontalGap) + nextRowOffset.x,
        nextRowOffset.y
      )
    }

    nextRowOffset = nextRowOffset.addTwo(
      gameObjects[thisRowStartingIndex].dimensions.width + horizontalGap,
      maxHeight + verticalGap
    )
    thisRowStartingIndex = thisRowStartingIndex + numberOnThisRow
  }
}

export function rectangle(
  gameObjects: Array<IGameObject>,
  itemsPerRow,
  horizontalGap: number,
  verticalGap: number
): void {
  let numberOfRows = gameObjects.length / itemsPerRow

  if (numberOfRows % 1 !== 0) {
    throw new Error('number / itemsPerRow must fit')
  }

  let nextRowOffset = new Vector2(0, 0)
  let thisRowStartingIndex = 0

  for (let i = 0; i < numberOfRows; i++) {
    let maxHeight: number = 0
    for (let j = 0; j < itemsPerRow; j++) {
      let go = gameObjects[thisRowStartingIndex + j]
      if (go.dimensions.height > maxHeight) {
        maxHeight = go.dimensions.height
      }
      go.position = new Vector2(
        j * (go.dimensions.width + horizontalGap) + nextRowOffset.x,
        nextRowOffset.y
      )
    }

    nextRowOffset = nextRowOffset.addTwo(0, maxHeight + verticalGap)
    thisRowStartingIndex = thisRowStartingIndex + itemsPerRow
  }
}
