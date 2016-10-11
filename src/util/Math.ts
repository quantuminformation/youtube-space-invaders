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
}

