import {LightInvader, MediumInvader, HeavyInvader} from "../gameObjects/Invaders";
import {Vector2, Vector2Normalised} from "../util/Vectors"
import {AbstractInvader} from "../gameObjects/AbstractInvader";
import {triangle, rectangle} from "../util/Formations";


export class WaveManager {
  waves: Array<()=> Array<AbstractInvader>> = []
  currentWave = 0

  constructor() {
    this.generateWaves()
  }

  public getNextWave(): Array<AbstractInvader> {
    let nextWave = this.waves[this.currentWave]
    if (nextWave) {
      this.currentWave++
      return nextWave()
    }
    else return null

  }


  private generateWaves() {

    let horizontalGap = 15;
    let verticalGap = 20;
    let initialXOffset = 20;
    let initialYOffset = 20;


    this.waves.push(function () {

      let units: Array<AbstractInvader> = [
        new LightInvader(), new LightInvader(), new LightInvader(), new LightInvader(),
        new LightInvader(), new LightInvader(), new LightInvader(), new LightInvader(),
      ]
      units.forEach(unit=> {
        unit.updateDirection(new Vector2Normalised(90))
      })
      rectangle(units, 4, horizontalGap, verticalGap)
      return units;
    })
    this.waves.push(function () {

      let units: Array<AbstractInvader> = [
        new LightInvader(), new LightInvader(), new LightInvader(), new MediumInvader(), new MediumInvader(), new LightInvader(), new LightInvader(), new LightInvader(),
        new LightInvader(), new LightInvader(), new LightInvader(), new LightInvader(), new LightInvader(), new LightInvader(), new LightInvader(), new LightInvader(),
      ]
      units.forEach(unit=> {
        unit.updateDirection(new Vector2Normalised(90))
      })
      rectangle(units, 8, horizontalGap, verticalGap)
      return units;
    })

    this.waves.push(function () {
      let units: Array<AbstractInvader> = [
        new LightInvader(), new MediumInvader(), new HeavyInvader(), new MediumInvader(), new LightInvader(),
        new MediumInvader(), new MediumInvader(), new MediumInvader(),
        new LightInvader()
      ]
      units.forEach(unit=> {
        unit.updateDirection(new Vector2Normalised(90))
      })
      triangle(units, horizontalGap, verticalGap)
      return units;
    })
    this.waves.push(function () {
      let units: Array<AbstractInvader> = [
        new LightInvader(), new MediumInvader(), new HeavyInvader(), new HeavyInvader(), new HeavyInvader(), new MediumInvader(), new LightInvader(),
        new LightInvader(), new MediumInvader(), new HeavyInvader(), new MediumInvader(), new LightInvader(),
        new LightInvader(), new MediumInvader(), new LightInvader(),
        new LightInvader()
      ]
      units.forEach(unit=> {
        unit.updateDirection(new Vector2Normalised(90))
      })
      triangle(units, horizontalGap, verticalGap)
      return units;
    })
  }
}


