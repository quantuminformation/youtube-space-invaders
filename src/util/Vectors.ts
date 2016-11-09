export class Dimensions2 {
  constructor(public width: number, public height: number) {
  }
}

export class Vector2 {


  constructor(public x: number, public y: number) {
  }


  public add(otherVector: Vector2): Vector2 {
    return new Vector2(this.x + otherVector.x, this.y + otherVector.y)
  }

  public addTwo(x: number, y: number): Vector2 {
    return new Vector2(this.x + x, this.y + y)
  }

  public reverse(): Vector2 {
    return new Vector2(-this.x, -this.y)
  }

  public magnitude(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }

  public angle(): number {
    return Math.atan2(this.y, this.x) - degreesToRadians(-90)
  }

  /**
   * returns a new vector based on the current one rotated by an angle
   * @param initialVector
   * @param rotatingDegrees
   * @returns {Vector2}
   */
  public rotateBy(radians: number): Vector2 {
    let newAngleRads = Math.atan2(this.x, this.y) + radians
    let mag = this.magnitude()
    return new Vector2(mag * Math.sin(newAngleRads), mag * Math.cos(newAngleRads))
  }
}


export class Vector2Normalised extends Vector2 {
  constructor(radians: number) {
    super(Math.sin(radians), -Math.cos(radians))
  }
}

export function degreesToRadians(degrees: number): number {
  return (degrees / 360 ) * 2 * Math.PI
}
export function radiansToDegress(radians: number): number {
  return (radians * 360) / (2 * Math.PI)
}

/**
 * Returns array of vectors equally spaced measured from both sidesfor the x origin in normal maths xy chart
 * the shooter will then modify based on its rotation of the firing gun
 */
export function getFanSpreadVectors(numberOfBullets: number, spreadAngleRadians: number): Array<Vector2Normalised> {

  let arr: Array<Vector2Normalised> = []
  let angleGap: number = spreadAngleRadians / numberOfBullets
  let startingAngle: number = spreadAngleRadians / 2
  for (let i = 0; i < numberOfBullets; i++) {
    let nextAngle = startingAngle - i * angleGap
    arr.push(new Vector2Normalised(nextAngle))
  }
  return arr
}
