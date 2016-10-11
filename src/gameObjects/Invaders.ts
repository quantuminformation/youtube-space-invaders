import {Vector2, Dimensions2} from "../util/Math"
import {IGameObject} from "./IGameObject"
import {Game} from "../Game"

export abstract class Invader implements IGameObject {
  health: number;

  static DEFAULT_HEIGHT: number = 20;
  static DEFAULT_WIDTH: number = 30;
  static DEFAULT_HORIZONTAL_SPEED: number = 1;

  dimensions: Dimensions2 = new Dimensions2(Invader.DEFAULT_WIDTH, Invader.DEFAULT_HEIGHT)
  movmentVector: Vector2 = new Vector2(0, 0)

  active: boolean = true;
  probabilityOfShooting: number = 0.0005; // on each game frame

  BasicColor: string;

  constructor(public position:Vector2) {
  }

  draw(canvas: CanvasRenderingContext2D) {
    canvas.fillStyle = this.BasicColor;
    canvas.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
  }

  midpoint() {
    return new Vector2(this.position.x + this.dimensions.width / 2, this.position.y + this.dimensions.height / 2);
  }

  explode() {
    this.active = false;
    // todo boom graphic
  }


  update(elapsedUnit) {
    this.position.x += this.movmentVector.x * elapsedUnit;
  }

  shoot() {
  }
}

export class LightInvader extends Invader {

  constructor(position: Vector2) {
    super(position);
    this.BasicColor = "#0F9";
    this.probabilityOfShooting = 0.001;
    this.health = 1;
  }

  shoot() {
    // todo Sound.play("shoot");
  }

}
