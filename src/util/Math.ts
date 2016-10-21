export class Dimensions2 {
  constructor(public width: number, public height: number) {
  }
}

export class Vector2 {
  constructor(public x: number, public y: number) {
  }

  public add(otherVector: Vector2): Vector2 {
    return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
  }

  public reverse(): Vector2 {
    return new Vector2(-this.x, -this.y);
  }
}


export class Vector2Normalised extends Vector2 {
  constructor(degrees: number) {
    super(Math.sin(degreesToRadians(degrees)), -Math.cos(degreesToRadians(degrees)));
  }
}

function degreesToRadians(degrees: number): number {
  return (degrees / 360 ) * 2 * Math.PI
}
