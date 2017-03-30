import { IGameObject } from '../gameObjects/IGameObject'

export function rectCollides (a: IGameObject, b: IGameObject) {
  return a.position.x < b.position.x + b.dimensions.width &&
    a.position.x + a.dimensions.width > b.position.x &&
    a.position.y < b.position.y + b.dimensions.height &&
    a.position.y + a.dimensions.height > b.position.y
}
