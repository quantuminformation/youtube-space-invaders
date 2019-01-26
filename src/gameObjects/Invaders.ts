import { Vector2, Dimensions2, Vector2Normalised, getFanSpreadVectors } from '../util/Vectors'
import { Bullet, BasicBullet } from './Bullets'
import { AbstractInvader } from './AbstractInvader'
import { degreesToRadians } from '../util/Conversions'

export class LightInvader extends AbstractInvader {
  constructor(position: Vector2 = new Vector2(0, 0)) {
    super(position)
    this.probabilityOfShooting = 0.001
    this.health = 1
    this.pointsValue = 10

    this.image.src = require('../images/lightInvader.svg')
  }
}

export class MediumInvader extends AbstractInvader {
  constructor(position: Vector2 = new Vector2(0, 0)) {
    super(position)
    this.probabilityOfShooting = 0.002
    this.health = 3
    this.pointsValue = 30

    this.image.src = require('../images/MediumInvader.svg')
  }
}
export class HeavyInvader extends AbstractInvader {
  constructor(position: Vector2 = new Vector2(0, 0)) {
    super(position)
    this.probabilityOfShooting = 0.004
    this.pointsValue = 60

    this.health = 5
    this.image.src = require('../images/HeavyInvader.svg')
  }

  public shootAhead(): Array<Bullet> {
    // todo Sound.play('shoot')

    let self = this
    let x = Math.random()

    if (x >= 0 && x <= 0.75) {
      return [new BasicBullet(this.midpoint(), new Vector2Normalised(0))]
    } else {
      let vectors = getFanSpreadVectors(10, degreesToRadians(45))
      let bulletsToFire: Array<Bullet> = []
      vectors.forEach(item => {
        let b = new BasicBullet(
          this.midpoint(),
          new Vector2Normalised(this.facingAngleRad + item.angle())
        )
        bulletsToFire.push(b)
      })
      return bulletsToFire
    }
  }
}
