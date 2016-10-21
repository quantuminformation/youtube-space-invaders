import {LightInvader, Invader} from "./gameObjects/Invaders";
import {Vector2, Vector2Normalised} from "./util/Math"

let waves: Array<()=> Array<Invader>> = []

let arr: Array<Invader> = []
let horizontalGap = 15;
let verticalGap = 20;
let initialXOffset = 20;
let initialYOffset = 20;

waves.push(function () {
  for (var i = 0; i <= 7; i++) {
    for (var j = 0; j <= 2; j++) {
      let position = new Vector2(i * (Invader.DEFAULT_WIDTH + horizontalGap), (j * (Invader.DEFAULT_HEIGHT + verticalGap)))
      position = position.add(new Vector2(initialXOffset, initialYOffset))
      let invader: Invader = new LightInvader(position);
      invader.updateDirection(new Vector2Normalised(90))
      arr.push(invader);
    }
  }
  return arr;
})


//todo I wish I could just export the array without the default
export default waves
